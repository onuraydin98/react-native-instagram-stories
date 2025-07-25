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
const react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
const AnimatedImage = react_native_reanimated_1.default.createAnimatedComponent(react_native_1.Image);
const StoryAvatar = ({ id, avatarSource, name, stories, loadingStory, seenStories, onPress, colors, seenColors, size, showName, nameTextStyle, nameTextProps, renderAvatar, avatarBorderRadius, }) => {
    const loaded = (0, react_native_reanimated_1.useSharedValue)(false);
    const isLoading = (0, react_native_reanimated_1.useDerivedValue)(() => loadingStory.value === id || !loaded.value);
    const seen = (0, react_native_reanimated_1.useDerivedValue)(() => seenStories.value[id] === stories[stories.length - 1]?.id);
    const [isSeen, setIsSeen] = (0, react_1.useState)(false);
    (0, react_native_reanimated_1.useAnimatedReaction)(() => seenStories.value[id] === stories[stories.length - 1]?.id, (seenNow) => {
        (0, react_native_reanimated_1.runOnJS)(setIsSeen)(seenNow);
    }, [id, stories]);
    const onLoad = () => {
        loaded.value = true;
    };
    const imageAnimatedStyles = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        opacity: (0, react_native_reanimated_1.withTiming)(isLoading.value ? 0.5 : 1),
    }));
    if (renderAvatar) {
        return renderAvatar(seen.value);
    }
    if (!avatarSource) {
        return null;
    }
    return (<react_native_linear_gradient_1.default colors={seen.value ? ["#D9D9D9", "#D9D9D9"] : ["#FCC94F", "#A80533"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{
            width: 110,
            height: 200,
            borderRadius: 12,
            padding: 3,
            marginRight: 7,
        }}>
      <react_native_1.TouchableOpacity activeOpacity={0.7} onPress={onPress} testID={`${id}StoryAvatar${stories.length}Story`} style={{
            flex: 1,
            borderRadius: 10,
            overflow: "hidden",
            backgroundColor: "#000",
        }}>
        <AnimatedImage source={avatarSource} style={[
            {
                width: "100%",
                height: "100%",
                borderRadius: 10,
            },
            imageAnimatedStyles,
        ]} resizeMode="cover" onLoad={onLoad} testID="storyAvatarImage"/>
        <react_native_1.View style={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: 6,
        }}>
          <react_native_1.Image source={require("../../assets/images/playIcon.png")} style={{ width: 20, height: 20 }}/>
        </react_native_1.View>

        <react_native_1.View style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 6,
        }}>
          <react_native_1.Text style={{
            color: "#fff",
            fontSize: 14,
            fontWeight: "600",
            fontFamily: "Anton-Regular",
        }}>
            {name}
          </react_native_1.Text>
        </react_native_1.View>
      </react_native_1.TouchableOpacity>
    </react_native_linear_gradient_1.default>);
};
exports.default = (0, react_1.memo)(StoryAvatar);
//# sourceMappingURL=index.js.map