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
const react_native_reanimated_1 = require("react-native-reanimated");
const Content_styles_1 = __importDefault(require("./Content.styles"));
const StoryContent = ({ stories, active, activeStory }) => {
    const [storyIndex, setStoryIndex] = (0, react_1.useState)(0);
    const onChange = async () => {
        'worklet';
        const index = stories.findIndex((item) => item.id === activeStory.value);
        if (active.value && index >= 0 && index !== storyIndex) {
            (0, react_native_reanimated_1.runOnJS)(setStoryIndex)(index);
        }
    };
    (0, react_native_reanimated_1.useAnimatedReaction)(() => active.value, (res, prev) => res !== prev && onChange(), [active.value, onChange]);
    (0, react_native_reanimated_1.useAnimatedReaction)(() => activeStory.value, (res, prev) => res !== prev && onChange(), [activeStory.value, onChange]);
    const content = (0, react_1.useMemo)(() => stories[storyIndex]?.renderContent?.(), [storyIndex]);
    return content ? <react_native_1.View style={Content_styles_1.default.container} pointerEvents="box-none">{content}</react_native_1.View> : null;
};
exports.default = (0, react_1.memo)(StoryContent);
//# sourceMappingURL=index.js.map