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
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const react_native_svg_1 = require("react-native-svg");
const constants_1 = require("../../core/constants");
const react_native_1 = require("react-native");
const react_native_2 = require("react-native");
const AnimatedCircle = react_native_reanimated_1.default.createAnimatedComponent(react_native_svg_1.Circle);
const AnimatedSvg = react_native_reanimated_1.default.createAnimatedComponent(react_native_svg_1.Svg);
const Loader = ({ loading, color, size = constants_1.AVATAR_SIZE + 10, }) => {
    const RADIUS = (0, react_1.useMemo)(() => (size - constants_1.STROKE_WIDTH) / 2, [size]);
    const CIRCUMFERENCE = (0, react_1.useMemo)(() => RADIUS * 2 * Math.PI, [RADIUS]);
    const [colors, setColors] = (0, react_1.useState)(color.value);
    const rotation = (0, react_native_reanimated_1.useSharedValue)(0);
    const progress = (0, react_native_reanimated_1.useSharedValue)(0);
    const animatedProps = (0, react_native_reanimated_1.useAnimatedProps)(() => ({
        strokeDashoffset: (0, react_native_reanimated_1.interpolate)(progress.value, [0, 1], [0, CIRCUMFERENCE * 2 / 3]),
    }));
    const animatedStyles = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));
    const startAnimation = () => {
        'worklet';
        progress.value = (0, react_native_reanimated_1.withRepeat)((0, react_native_reanimated_1.withTiming)(1, { duration: 3000 }), -1, true);
        rotation.value = (0, react_native_reanimated_1.withRepeat)((0, react_native_reanimated_1.withTiming)(720, { duration: 3000 }), -1, false, () => {
            rotation.value = 0;
        });
    };
    const stopAnimation = () => {
        'worklet';
        (0, react_native_reanimated_1.cancelAnimation)(progress);
        progress.value = (0, react_native_reanimated_1.withTiming)(0);
        (0, react_native_reanimated_1.cancelAnimation)(rotation);
        rotation.value = (0, react_native_reanimated_1.withTiming)(0);
    };
    const onColorChange = (newColors) => {
        'worklet';
        if (JSON.stringify(colors) === JSON.stringify(newColors)) {
            return;
        }
        (0, react_native_reanimated_1.runOnJS)(setColors)(newColors);
    };
    (0, react_native_reanimated_1.useAnimatedReaction)(() => loading.value, (res) => (res ? startAnimation() : stopAnimation()), [loading.value]);
    (0, react_native_reanimated_1.useAnimatedReaction)(() => color.value, (res) => onColorChange(res), [color.value]);
    return (<react_native_1.View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <react_native_2.Image source={require("../../assets/loading3.gif")} style={{ width: size * 1.2, height: size * 1.2 }} resizeMode="contain"/>
    </react_native_1.View>);
};
exports.default = (0, react_1.memo)(Loader);
//# sourceMappingURL=index.js.map