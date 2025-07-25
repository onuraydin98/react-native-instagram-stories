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
const react_native_reanimated_1 = require("react-native-reanimated");
const react_native_1 = require("react-native");
const storage_1 = require("../../core/helpers/storage");
const constants_1 = require("../../core/constants");
const Modal_1 = __importDefault(require("../Modal"));
const AvatarList_1 = __importDefault(require("../AvatarList"));
const InstagramStories = (0, react_1.forwardRef)(({ stories, saveProgress = false, avatarBorderColors = constants_1.DEFAULT_COLORS, avatarSeenBorderColors = constants_1.SEEN_LOADER_COLORS, avatarSize = constants_1.AVATAR_SIZE, storyAvatarSize = constants_1.STORY_AVATAR_SIZE, avatarListContainerStyle, avatarListContainerProps, animationDuration = constants_1.ANIMATION_DURATION, backgroundColor = constants_1.BACKGROUND_COLOR, showName = false, nameTextStyle, nameTextProps, videoAnimationMaxDuration, videoProps, closeIconColor = constants_1.CLOSE_COLOR, isVisible = false, hideAvatarList = false, avatarBorderRadius, ...props }, ref) => {
    const [data, setData] = (0, react_1.useState)(stories);
    const seenStories = (0, react_native_reanimated_1.useSharedValue)({});
    const loadedStories = (0, react_native_reanimated_1.useSharedValue)(false);
    const loadingStory = (0, react_native_reanimated_1.useSharedValue)(undefined);
    const modalRef = (0, react_1.useRef)(null);
    const onPress = (id) => {
        loadingStory.value = id;
        if (loadedStories.value) {
            modalRef.current?.show(id);
        }
    };
    const onLoad = () => {
        loadingStory.value = undefined;
    };
    const onStoriesChange = async () => {
        seenStories.value = await (saveProgress ? (0, storage_1.getProgressStorage)() : {});
        const promises = stories.map((story) => {
            const seenStoryIndex = story.stories.findIndex((item) => item.id === seenStories.value[story.id]);
            const seenStory = story.stories[seenStoryIndex + 1] || story.stories[0];
            if (!seenStory) {
                return true;
            }
            return seenStory.mediaType !== "video"
                ? react_native_1.Image.prefetch(seenStory.source?.uri)
                : true;
        });
        await Promise.all(promises);
        loadedStories.value = true;
        if (loadingStory.value) {
            onPress(loadingStory.value);
        }
    };
    const onSeenStoriesChange = async (user, value) => {
        if (!saveProgress) {
            return;
        }
        if (seenStories.value[user]) {
            const userData = data.find((story) => story.id === user);
            const oldIndex = userData?.stories.findIndex((story) => story.id === seenStories.value[user]);
            const newIndex = userData?.stories.findIndex((story) => story.id === value);
            if (oldIndex > newIndex) {
                return;
            }
        }
        seenStories.value = await (0, storage_1.setProgressStorage)(user, value);
    };
    (0, react_1.useImperativeHandle)(ref, () => ({
        spliceStories: (newStories, index) => {
            if (index === undefined) {
                setData([...data, ...newStories]);
            }
            else {
                const newData = [...data];
                newData.splice(index, 0, ...newStories);
                setData(newData);
            }
        },
        spliceUserStories: (newStories, user, index) => {
            const userData = data.find((story) => story.id === user);
            if (!userData) {
                return;
            }
            const newData = index === undefined
                ? [...userData.stories, ...newStories]
                : [...userData.stories];
            if (index !== undefined) {
                newData.splice(index, 0, ...newStories);
            }
            setData(data.map((value) => value.id === user
                ? {
                    ...value,
                    stories: newData,
                }
                : value));
        },
        setStories: (newStories) => {
            setData(newStories);
        },
        clearProgressStorage: storage_1.clearProgressStorage,
        goToSpecificStory: (userId, index) => modalRef.current?.goToSpecificStory(userId, index),
        hide: () => modalRef.current?.hide(),
        show: (id) => {
            if (id) {
                onPress(id);
            }
            else if (data[0]?.id) {
                onPress(data[0]?.id);
            }
        },
        pause: () => modalRef.current?.pause(),
        resume: () => modalRef.current?.resume(),
        goToPreviousStory: () => modalRef.current?.goToPreviousStory(),
        goToNextStory: () => modalRef.current?.goToNextStory(),
        getCurrentStory: () => modalRef.current?.getCurrentStory(),
    }), [data]);
    (0, react_1.useEffect)(() => {
        onStoriesChange();
    }, [data]);
    (0, react_1.useEffect)(() => {
        setData(stories);
    }, [stories]);
    (0, react_1.useEffect)(() => {
        if (isVisible && data[0]?.id) {
            modalRef.current?.show(data[0]?.id);
        }
        else {
            modalRef.current?.hide();
        }
    }, [isVisible]);
    return (<>
        {!hideAvatarList && (<AvatarList_1.default stories={data} loadingStory={loadingStory} seenStories={seenStories} colors={avatarBorderColors} seenColors={avatarSeenBorderColors} size={avatarSize} showName={showName} nameTextStyle={nameTextStyle} nameTextProps={nameTextProps} avatarListContainerProps={avatarListContainerProps} avatarListContainerStyle={avatarListContainerStyle} avatarBorderRadius={avatarBorderRadius} onPress={onPress}/>)}
        <Modal_1.default ref={modalRef} stories={data} seenStories={seenStories} duration={animationDuration} storyAvatarSize={storyAvatarSize} onLoad={onLoad} onSeenStoriesChange={onSeenStoriesChange} backgroundColor={backgroundColor} videoDuration={videoAnimationMaxDuration} videoProps={videoProps} closeIconColor={closeIconColor} {...props}/>
      </>);
});
exports.default = (0, react_1.memo)(InstagramStories);
//# sourceMappingURL=index.js.map