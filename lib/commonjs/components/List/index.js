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
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const Animation_1 = __importDefault(require("../Animation"));
const List_styles_1 = __importDefault(require("./List.styles"));
const Image_1 = __importDefault(require("../Image"));
const Progress_1 = __importDefault(require("../Progress"));
const Header_1 = __importDefault(require("../Header"));
const constants_1 = require("../../core/constants");
const Content_1 = __importDefault(require("../Content"));
const Footer_1 = __importDefault(require("../Footer"));
const StoryList = ({ id, stories, index, x, activeUser, activeStory, progress, seenStories, paused, onLoad, videoProps, progressColor, progressActiveColor, mediaContainerStyle, imageStyles, imageProps, progressContainerStyle, imageOverlayView, hideElements, hideOverlayViewOnLongPress, videoDuration, ...props }) => {
    const imageHeight = (0, react_native_reanimated_1.useSharedValue)(constants_1.HEIGHT);
    const isActive = (0, react_native_reanimated_1.useDerivedValue)(() => activeUser.value === id);
    const activeStoryIndex = (0, react_native_reanimated_1.useDerivedValue)(() => stories.findIndex((item) => item.id === activeStory.value));
    const animatedStyles = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({ height: imageHeight.value }));
    const contentStyles = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        opacity: (0, react_native_reanimated_1.withTiming)(hideElements.value ? 0 : 1),
    }));
    const onImageLayout = (height) => {
        imageHeight.value = height;
    };
    const lastSeenIndex = stories.findIndex((item) => item.id === seenStories.value[id]);
    return (<Animation_1.default x={x} index={index}>
      <react_native_reanimated_1.default.View style={[animatedStyles, List_styles_1.default.container]}>
        <Image_1.default stories={stories} activeStory={activeStory} defaultStory={stories[lastSeenIndex + 1] ?? stories[0]} isDefaultVideo={(stories[lastSeenIndex + 1]?.mediaType ?? stories[0]?.mediaType) === 'video'} onImageLayout={onImageLayout} onLoad={onLoad} paused={paused} isActive={isActive} videoProps={videoProps} mediaContainerStyle={mediaContainerStyle} imageStyles={imageStyles} imageProps={imageProps} videoDuration={videoDuration}/>
        <react_native_reanimated_1.default.View style={[
            hideOverlayViewOnLongPress ? contentStyles : {},
            List_styles_1.default.content,
        ]} pointerEvents="auto">
          {imageOverlayView}
          <react_native_reanimated_1.default.View style={[contentStyles, List_styles_1.default.content]} pointerEvents="box-none">
            <Progress_1.default active={isActive} activeStory={activeStoryIndex} progress={progress} length={stories.length} progressColor={progressColor} progressActiveColor={progressActiveColor} progressContainerStyle={progressContainerStyle}/>
            <Header_1.default {...props}/>
            <Content_1.default stories={stories} active={isActive} activeStory={activeStory}/>
          </react_native_reanimated_1.default.View>
        </react_native_reanimated_1.default.View>
      </react_native_reanimated_1.default.View>
      <Footer_1.default stories={stories} active={isActive} activeStory={activeStory}/>
    </Animation_1.default>);
};
exports.default = (0, react_1.memo)(StoryList);
//# sourceMappingURL=index.js.map