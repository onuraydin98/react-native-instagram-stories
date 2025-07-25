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
const Animation_styles_1 = __importDefault(require("./Animation.styles"));
const StoryAnimation = ({ children, x, index }) => {
    const angle = Math.PI / 3;
    const ratio = react_native_1.Platform.OS === 'ios' ? 2 : 1.2;
    const offset = constants_1.WIDTH * index;
    const inputRange = [offset - constants_1.WIDTH, offset + constants_1.WIDTH];
    const maskInputRange = [offset - constants_1.WIDTH, offset, offset + constants_1.WIDTH];
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const translateX = (0, react_native_reanimated_1.interpolate)(x.value, inputRange, [constants_1.WIDTH / ratio, -constants_1.WIDTH / ratio], react_native_reanimated_1.Extrapolation.CLAMP);
        const rotateY = (0, react_native_reanimated_1.interpolate)(x.value, inputRange, [angle, -angle], react_native_reanimated_1.Extrapolation.CLAMP);
        const alpha = Math.abs(rotateY);
        const gamma = angle - alpha;
        const beta = Math.PI - alpha - gamma;
        const w = constants_1.WIDTH / 2 - (constants_1.WIDTH / 2 * (Math.sin(gamma) / Math.sin(beta)));
        const translateX1 = rotateY > 0 ? w : -w;
        const left = react_native_1.Platform.OS === 'android' ? (0, react_native_reanimated_1.interpolate)(rotateY, [-angle, -angle + 0.1, 0, angle - 0.1, angle], [0, 20, 0, -20, 0], react_native_reanimated_1.Extrapolation.CLAMP) : 0;
        return {
            transform: [
                { perspective: constants_1.WIDTH },
                { translateX },
                { rotateY: `${rotateY}rad` },
                { translateX: translateX1 },
            ],
            left,
        };
    });
    const maskAnimatedStyles = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        opacity: (0, react_native_reanimated_1.interpolate)(x.value, maskInputRange, [0.5, 0, 0.5], react_native_reanimated_1.Extrapolation.CLAMP),
    }));
    return (<react_native_reanimated_1.default.View style={[animatedStyle, Animation_styles_1.default.container, Animation_styles_1.default.cube]}>
      {children}
      <react_native_reanimated_1.default.View style={[maskAnimatedStyles, Animation_styles_1.default.absolute, { width: constants_1.WIDTH, height: constants_1.HEIGHT }]} pointerEvents="none"/>
    </react_native_reanimated_1.default.View>);
};
exports.default = (0, react_1.memo)(StoryAnimation);
//# sourceMappingURL=index.js.map