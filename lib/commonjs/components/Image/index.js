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
const react_native_1 = require("react-native");
const react_1 = __importStar(require("react"));
const react_native_reanimated_1 = require("react-native-reanimated");
const Loader_1 = __importDefault(require("../Loader"));
const constants_1 = require("../../core/constants");
const Image_styles_1 = __importDefault(require("./Image.styles"));
const video_1 = __importDefault(require("./video"));
const StoryImage = ({ stories, activeStory, defaultStory, isDefaultVideo, paused, videoProps, isActive, mediaContainerStyle, imageStyles, imageProps, videoDuration, onImageLayout, onLoad, }) => {
    const [data, setData] = (0, react_1.useState)({ data: defaultStory, isVideo: isDefaultVideo });
    const loading = (0, react_native_reanimated_1.useSharedValue)(true);
    const color = (0, react_native_reanimated_1.useSharedValue)(constants_1.LOADER_COLORS);
    const duration = (0, react_native_reanimated_1.useSharedValue)(undefined);
    const isPaused = (0, react_native_reanimated_1.useDerivedValue)(() => paused.value || !isActive.value);
    const onImageChange = async () => {
        if (!activeStory.value) {
            return;
        }
        const story = stories.find((item) => item.id === activeStory.value);
        if (!story) {
            return;
        }
        if (data.data?.id === story.id) {
            if (!loading.value) {
                onLoad(duration.value);
            }
        }
        else {
            loading.value = true;
            setData({ data: story, isVideo: story.mediaType === 'video' });
        }
        const nextStory = stories[stories.indexOf(story) + 1];
        if (nextStory && nextStory.mediaType !== 'video' && nextStory.source?.uri) {
            react_native_1.Image.prefetch(nextStory.source?.uri);
        }
    };
    (0, react_native_reanimated_1.useAnimatedReaction)(() => isActive.value, (res, prev) => res !== prev && res && (0, react_native_reanimated_1.runOnJS)(onImageChange)(), [isActive.value, onImageChange]);
    (0, react_native_reanimated_1.useAnimatedReaction)(() => activeStory.value, (res, prev) => res !== prev && (0, react_native_reanimated_1.runOnJS)(onImageChange)(), [activeStory.value, onImageChange]);
    const onContentLoad = (newDuration) => {
        const animationDuration = (data?.data?.mediaType === 'video' ? videoDuration : undefined) ?? data.data?.animationDuration ?? newDuration;
        duration.value = animationDuration;
        loading.value = false;
        if (isActive.value) {
            onLoad(animationDuration);
        }
    };
    return (<>
      <react_native_1.View style={Image_styles_1.default.container}>
        <Loader_1.default loading={loading} color={color} size={80}/>
      </react_native_1.View>
      <react_native_1.View style={[Image_styles_1.default.image, mediaContainerStyle]}>
        {data.data?.source && (data.isVideo ? (<video_1.default onLoad={onContentLoad} onLayout={onImageLayout} source={data.data.source} paused={isPaused} isActive={isActive} {...videoProps}/>) : (<react_native_1.Image source={data.data.source} style={[{ width: constants_1.WIDTH, aspectRatio: 0.5626 }, imageStyles]} resizeMode="contain" testID="storyImageComponent" onLayout={(e) => onImageLayout(Math.min(constants_1.HEIGHT, e.nativeEvent.layout.height))} onLoad={() => onContentLoad()} {...imageProps}/>))}
      </react_native_1.View>
    </>);
};
exports.default = (0, react_1.memo)(StoryImage);
//# sourceMappingURL=index.js.map