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
const Avatar_1 = __importDefault(require("../Avatar"));
let FlashList;
try {
    // eslint-disable-next-line global-require
    FlashList = require('@shopify/flash-list').FlashList;
}
catch (error) {
    FlashList = null;
}
const StoryAvatarList = ({ stories, loadingStory, seenStories, colors, seenColors, size, showName, nameTextStyle, nameTextProps, avatarListContainerProps, avatarListContainerStyle, avatarBorderRadius, onPress, }) => {
    const renderItem = (story) => (<Avatar_1.default {...story} loadingStory={loadingStory} seenStories={seenStories} onPress={() => onPress(story.id)} colors={colors} seenColors={seenColors} size={size} showName={showName} nameTextStyle={nameTextStyle} nameTextProps={nameTextProps} avatarBorderRadius={avatarBorderRadius} key={`avatar${story.id}`}/>);
    if (FlashList) {
        return (<FlashList horizontal {...avatarListContainerProps} data={stories} renderItem={({ item }) => renderItem(item)} keyExtractor={(item) => item.id} contentContainerStyle={avatarListContainerStyle} testID="storiesList"/>);
    }
    return (<react_native_1.ScrollView horizontal {...avatarListContainerProps} contentContainerStyle={avatarListContainerStyle} testID="storiesList">
      {stories.map(renderItem)}
    </react_native_1.ScrollView>);
};
exports.default = (0, react_1.memo)(StoryAvatarList);
//# sourceMappingURL=index.js.map