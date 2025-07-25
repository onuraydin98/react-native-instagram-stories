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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_reanimated_1 = require("react-native-reanimated");
const constants_1 = require("../../core/constants");
const react_native_1 = require("react-native");
const StoryVideo = ({ source, paused, isActive, onLoad, onLayout, ...props }) => {
    try {
        // eslint-disable-next-line global-require
        const Video = require("react-native-video").default;
        const ref = (0, react_1.useRef)(null);
        const [pausedValue, setPausedValue] = (0, react_1.useState)(paused.value);
        const start = () => {
            ref.current?.seek(0);
            ref.current?.resume?.();
        };
        (0, react_native_reanimated_1.useAnimatedReaction)(() => paused.value, (res, prev) => res !== prev && (0, react_native_reanimated_1.runOnJS)(setPausedValue)(res), [paused.value]);
        (0, react_native_reanimated_1.useAnimatedReaction)(() => isActive.value, (res) => res && (0, react_native_reanimated_1.runOnJS)(start)(), [isActive.value]);
        return (<Video ref={ref} style={{
                width: constants_1.WIDTH,
                aspectRatio: react_native_1.Platform.OS === "ios" ? 0.55 : 0.5,
                marginBottom: react_native_1.Platform.OS === "ios" ? 0 : "40%",
            }} {...props} resizeMode="contain" source={source} paused={pausedValue} controls={false} repeat={false} onLoad={({ duration }) => onLoad(duration * 1000)} onLayout={(e) => onLayout(e.nativeEvent.layout.height)}/>);
    }
    catch (error) {
        return null;
    }
};
exports.default = (0, react_1.memo)(StoryVideo);
//# sourceMappingURL=video.js.map