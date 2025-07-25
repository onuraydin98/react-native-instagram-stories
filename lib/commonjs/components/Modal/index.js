"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const constants_1 = require("../../core/constants");
const gesture_1 = __importDefault(require("./gesture"));
const List_1 = __importDefault(require("../List"));
const Modal_styles_1 = __importDefault(require("./Modal.styles"));
const StoryModal = (0, react_1.forwardRef)(({ stories, seenStories, duration, videoDuration, storyAvatarSize, textStyle, containerStyle, backgroundColor, videoProps, closeIconColor, modalAnimationDuration = constants_1.STORY_ANIMATION_DURATION, storyAnimationDuration = constants_1.STORY_ANIMATION_DURATION, hideElementsOnLongPress, loopingStories = 'none', statusBarTranslucent, onLoad, onShow, onHide, onSeenStoriesChange, onSwipeUp, onStoryStart, onStoryEnd, footerComponent, ...props }, ref) => {
    const [visible, setVisible] = (0, react_1.useState)(false);
    const x = (0, react_native_reanimated_1.useSharedValue)(0);
    const y = (0, react_native_reanimated_1.useSharedValue)(constants_1.HEIGHT);
    const animation = (0, react_native_reanimated_1.useSharedValue)(0);
    const currentStory = (0, react_native_reanimated_1.useSharedValue)(stories[0]?.stories[0]?.id);
    const paused = (0, react_native_reanimated_1.useSharedValue)(false);
    const durationValue = (0, react_native_reanimated_1.useSharedValue)(duration);
    const isLongPress = (0, react_native_reanimated_1.useSharedValue)(false);
    const hideElements = (0, react_native_reanimated_1.useSharedValue)(false);
    const lastViewed = (0, react_native_reanimated_1.useSharedValue)({});
    const firstRender = (0, react_native_reanimated_1.useSharedValue)(true);
    const userIndex = (0, react_native_reanimated_1.useDerivedValue)(() => Math.round(x.value / constants_1.WIDTH));
    const storyIndex = (0, react_native_reanimated_1.useDerivedValue)(() => stories[userIndex.value]?.stories.findIndex((story) => story.id === currentStory.value));
    const userId = (0, react_native_reanimated_1.useDerivedValue)(() => stories[userIndex.value]?.id);
    const previousUserId = (0, react_native_reanimated_1.useDerivedValue)(() => stories[userIndex.value - 1]?.id);
    const nextUserId = (0, react_native_reanimated_1.useDerivedValue)(() => stories[userIndex.value + 1]?.id);
    const previousStory = (0, react_native_reanimated_1.useDerivedValue)(() => (storyIndex.value !== undefined
        ? stories[userIndex.value]?.stories[storyIndex.value - 1]?.id
        : undefined));
    const nextStory = (0, react_native_reanimated_1.useDerivedValue)(() => (storyIndex.value !== undefined
        ? stories[userIndex.value]?.stories[storyIndex.value + 1]?.id
        : undefined));
    const animatedStyles = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({ top: y.value }));
    const backgroundAnimatedStyles = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        opacity: (0, react_native_reanimated_1.interpolate)(y.value, [0, constants_1.HEIGHT], [1, 0]),
        backgroundColor,
    }));
    const onClose = () => {
        'worklet';
        y.value = (0, react_native_reanimated_1.withTiming)(constants_1.HEIGHT, { duration: modalAnimationDuration }, () => (0, react_native_reanimated_1.runOnJS)(setVisible)(false));
        lastViewed.value = {};
        (0, react_native_reanimated_1.cancelAnimation)(animation);
    };
    const stopAnimation = () => {
        'worklet';
        (0, react_native_reanimated_1.cancelAnimation)(animation);
    };
    const startAnimation = (resume = false, newDuration) => {
        'worklet';
        if (newDuration) {
            durationValue.value = newDuration;
        }
        else {
            newDuration = durationValue.value;
        }
        if (resume) {
            newDuration -= animation.value * newDuration;
        }
        else {
            animation.value = 0;
            if (userId.value !== undefined && currentStory.value !== undefined) {
                (0, react_native_reanimated_1.runOnJS)(onSeenStoriesChange)(userId.value, currentStory.value);
            }
            if (userId.value !== undefined && storyIndex.value >= 0) {
                lastViewed.value = { ...lastViewed.value, [userId.value]: storyIndex.value ?? 0 };
            }
        }
        animation.value = (0, react_native_reanimated_1.withTiming)(1, { duration: newDuration });
    };
    const scrollTo = (id, animated = true, sameUser = false, previousUser, index) => {
        'worklet';
        const newUserIndex = stories.findIndex((story) => story.id === id);
        const newX = newUserIndex * constants_1.WIDTH;
        x.value = animated ? (0, react_native_reanimated_1.withTiming)(newX, { duration: storyAnimationDuration }) : newX;
        if (sameUser) {
            startAnimation(true);
            return;
        }
        if (onStoryEnd && animated) {
            (0, react_native_reanimated_1.runOnJS)(onStoryEnd)(previousUser ?? userId.value, currentStory.value);
        }
        const newStoryIndex = lastViewed.value[id] !== undefined
            ? lastViewed.value[id]
            : ((stories[newUserIndex]?.stories.findIndex((story) => story.id === seenStories.value[id]) ?? 0) + 1);
        const userStories = stories[newUserIndex]?.stories;
        const newStory = userStories?.[index ?? newStoryIndex]?.id ?? userStories?.[0]?.id;
        currentStory.value = newStory;
        if (onStoryStart) {
            (0, react_native_reanimated_1.runOnJS)(onStoryStart)(id, newStory);
        }
    };
    const toNextStory = (value = true) => {
        'worklet';
        if (!value) {
            return;
        }
        if (!nextStory.value) {
            if (nextUserId.value) {
                scrollTo(nextUserId.value);
            }
            else if (stories[0]?.id && loopingStories === 'all') {
                scrollTo(stories[0].id, false);
            }
            else if (userId.value && loopingStories === 'onlyLast') {
                scrollTo(userId.value, false, undefined, undefined, 0);
            }
            else {
                onClose();
            }
        }
        else {
            if (onStoryEnd) {
                (0, react_native_reanimated_1.runOnJS)(onStoryEnd)(userId.value, currentStory.value);
            }
            if (onStoryStart) {
                (0, react_native_reanimated_1.runOnJS)(onStoryStart)(userId.value, nextStory.value);
            }
            animation.value = 0;
            currentStory.value = nextStory.value;
        }
    };
    const toPreviousStory = () => {
        'worklet';
        if (!previousStory.value) {
            if (previousUserId.value) {
                scrollTo(previousUserId.value);
            }
            else {
                return false;
            }
        }
        else {
            if (onStoryEnd) {
                (0, react_native_reanimated_1.runOnJS)(onStoryEnd)(userId.value, currentStory.value);
            }
            if (onStoryStart) {
                (0, react_native_reanimated_1.runOnJS)(onStoryStart)(userId.value, previousStory.value);
            }
            animation.value = 0;
            currentStory.value = previousStory.value;
        }
        return true;
    };
    const show = (id) => {
        setVisible(true);
        scrollTo(id, false);
    };
    const onGestureEvent = (0, react_native_reanimated_1.useAnimatedGestureHandler)({
        onStart: (e, ctx) => {
            ctx.x = x.value;
            ctx.userId = userId.value;
            paused.value = true;
        },
        onActive: (e, ctx) => {
            if (ctx.x === x.value
                && (ctx.vertical || (Math.abs(e.velocityX) < Math.abs(e.velocityY)))) {
                ctx.vertical = true;
                y.value = e.translationY / 2;
            }
            else {
                ctx.moving = true;
                x.value = Math.max(0, Math.min(ctx.x + -e.translationX, constants_1.WIDTH * (stories.length - 1)));
            }
        },
        onFinish: (e, ctx) => {
            if (ctx.vertical) {
                if (e.translationY > 100) {
                    onClose();
                }
                else {
                    if (e.translationY < -100 && onSwipeUp) {
                        (0, react_native_reanimated_1.runOnJS)(onSwipeUp)(stories[userIndex.value]?.id, stories[userIndex.value]?.stories[storyIndex.value ?? 0]?.id);
                    }
                    y.value = (0, react_native_reanimated_1.withTiming)(0);
                    startAnimation(true);
                }
            }
            else if (ctx.moving) {
                const diff = x.value - ctx.x;
                let newX;
                if (Math.abs(diff) < constants_1.WIDTH / 4) {
                    newX = ctx.x;
                }
                else {
                    newX = diff > 0
                        ? Math.ceil(x.value / constants_1.WIDTH) * constants_1.WIDTH
                        : Math.floor(x.value / constants_1.WIDTH) * constants_1.WIDTH;
                }
                const newUserId = stories[Math.round(newX / constants_1.WIDTH)]?.id;
                if (newUserId !== undefined) {
                    scrollTo(newUserId, true, newUserId === ctx.userId, ctx.userId);
                }
            }
            ctx.moving = false;
            ctx.vertical = false;
            ctx.userId = undefined;
            hideElements.value = false;
            paused.value = false;
        },
    });
    const onPressIn = () => {
        stopAnimation();
        paused.value = true;
    };
    const onLongPress = () => {
        isLongPress.value = true;
        hideElements.value = hideElementsOnLongPress ?? false;
    };
    const onPressOut = () => {
        if (!isLongPress.value) {
            return;
        }
        hideElements.value = false;
        isLongPress.value = false;
        paused.value = false;
        startAnimation(true);
    };
    const onPress = ({ nativeEvent: { locationX } }) => {
        hideElements.value = false;
        if (isLongPress.value) {
            onPressOut();
            return;
        }
        if (locationX < constants_1.WIDTH / 2) {
            const success = toPreviousStory();
            if (!success) {
                startAnimation(true);
            }
        }
        else {
            toNextStory();
        }
        paused.value = false;
    };
    (0, react_1.useImperativeHandle)(ref, () => ({
        show,
        hide: onClose,
        pause: () => {
            stopAnimation();
            paused.value = true;
        },
        resume: () => {
            startAnimation(true);
            paused.value = false;
        },
        getCurrentStory: () => ({ userId: userId.value, storyId: currentStory.value }),
        goToPreviousStory: toPreviousStory,
        goToNextStory: toNextStory,
        goToSpecificStory: (newUserId, index) => scrollTo(newUserId, true, false, undefined, index),
    }), [userId.value, currentStory.value]);
    (0, react_1.useEffect)(() => {
        if (visible) {
            if (currentStory.value !== undefined) {
                onShow?.(currentStory.value);
            }
            onLoad?.();
            y.value = (0, react_native_reanimated_1.withTiming)(0, { duration: modalAnimationDuration });
        }
        else if (currentStory.value !== undefined && !firstRender.value) {
            onHide?.(currentStory.value);
        }
        firstRender.value = false;
    }, [visible]);
    (0, react_native_reanimated_1.useAnimatedReaction)(() => animation.value, (res, prev) => res !== prev && toNextStory(res === 1), [animation.value]);
    return (<react_native_1.Modal statusBarTranslucent={statusBarTranslucent} visible={visible} transparent animationType="none" testID="storyRNModal" onRequestClose={onClose}>
      <gesture_1.default onGestureEvent={onGestureEvent}>
        <react_native_reanimated_1.default.View style={Modal_styles_1.default.container} testID="storyModal">
          <react_native_1.Pressable onPressIn={onPressIn} onPress={onPress} onLongPress={onLongPress} onPressOut={onPressOut} delayLongPress={constants_1.LONG_PRESS_DURATION} style={Modal_styles_1.default.container}>
            <react_native_reanimated_1.default.View style={[Modal_styles_1.default.bgAnimation, backgroundAnimatedStyles]}/>
            <react_native_reanimated_1.default.View style={[Modal_styles_1.default.absolute, animatedStyles, containerStyle]}>
              {stories?.map((story, index) => (<List_1.default {...story} index={index} x={x} activeUser={userId} activeStory={currentStory} progress={animation} seenStories={seenStories} onClose={onClose} onLoad={(value) => {
                onLoad?.();
                startAnimation(undefined, value !== undefined ? value : duration);
            }} avatarSize={storyAvatarSize} textStyle={textStyle} paused={paused} videoProps={videoProps} closeColor={closeIconColor} hideElements={hideElements} videoDuration={videoDuration} key={story.id} {...props}/>))}
            </react_native_reanimated_1.default.View>
          </react_native_1.Pressable>
          {footerComponent && footerComponent}
        </react_native_reanimated_1.default.View>
      </gesture_1.default>
    </react_native_1.Modal>);
});
exports.default = (0, react_1.memo)(StoryModal);
//# sourceMappingURL=index.js.map