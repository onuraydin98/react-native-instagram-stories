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
const Progress_styles_1 = __importDefault(require("./Progress.styles"));
const constants_1 = require("../../core/constants");
const AnimatedView = react_native_reanimated_1.default.createAnimatedComponent(react_native_1.View);
const ProgressItem = ({ progress, active, activeStory, index, width, progressActiveColor = constants_1.PROGRESS_ACTIVE_COLOR, progressColor = constants_1.PROGRESS_COLOR, }) => {
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        if (!active.value || activeStory.value < index) {
            return { width: 0 };
        }
        if (activeStory.value > index) {
            return { width };
        }
        return { width: width * progress.value };
    });
    return (<react_native_1.View style={[Progress_styles_1.default.item, { backgroundColor: progressColor }, { width }]}>
      <AnimatedView style={[Progress_styles_1.default.item, { backgroundColor: progressActiveColor }, animatedStyle]}/>
    </react_native_1.View>);
};
exports.default = (0, react_1.memo)(ProgressItem);
//# sourceMappingURL=item.js.map