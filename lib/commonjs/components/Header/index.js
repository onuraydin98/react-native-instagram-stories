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
const constants_1 = require("../../core/constants");
const Header_styles_1 = __importDefault(require("./Header.styles"));
const close_1 = __importDefault(require("../Icon/close"));
const react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
const StoryHeader = ({ avatarSource, name, onClose, avatarSize, textStyle, closeColor, headerStyle, headerContainerStyle, renderStoryHeader, onStoryHeaderPress, }) => {
    const styles = {
        width: avatarSize + 8,
        height: avatarSize + 8,
        borderRadius: avatarSize,
    };
    const width = constants_1.WIDTH - Header_styles_1.default.container.left * 2;
    if (renderStoryHeader) {
        return (<react_native_1.View style={[Header_styles_1.default.container, { width }, headerContainerStyle]}>
        {renderStoryHeader()}
      </react_native_1.View>);
    }
    return (<react_native_1.View style={[
            Header_styles_1.default.container,
            Header_styles_1.default.containerFlex,
            { width },
            headerContainerStyle,
        ]}>
      <react_native_1.Pressable style={[Header_styles_1.default.left, headerStyle]} onPress={() => onStoryHeaderPress?.()}>
        {Boolean(avatarSource) && (<react_native_linear_gradient_1.default colors={["#FCC94F", "#A80533"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{
                padding: 2,
                borderRadius: 100,
            }}>
            <react_native_1.View style={[
                Header_styles_1.default.avatar,
                { borderRadius: styles.borderRadius },
            ]}>
              <react_native_1.Image source={avatarSource} style={styles}/>
            </react_native_1.View>
          </react_native_linear_gradient_1.default>)}
        {Boolean(name) && <react_native_1.Text style={textStyle}>{name}</react_native_1.Text>}
      </react_native_1.Pressable>
      <react_native_1.TouchableOpacity onPress={onClose} hitSlop={16} testID="storyCloseButton">
        <close_1.default color={closeColor}/>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>);
};
exports.default = (0, react_1.memo)(StoryHeader);
//# sourceMappingURL=index.js.map