import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import StoryAvatar from '../Avatar';
let FlashList;
try {
    // eslint-disable-next-line global-require
    FlashList = require('@shopify/flash-list').FlashList;
}
catch (error) {
    FlashList = null;
}
const StoryAvatarList = ({ stories, loadingStory, seenStories, colors, seenColors, size, showName, nameTextStyle, nameTextProps, avatarListContainerProps, avatarListContainerStyle, avatarBorderRadius, onPress, }) => {
    const renderItem = (story) => (<StoryAvatar {...story} loadingStory={loadingStory} seenStories={seenStories} onPress={() => onPress(story.id)} colors={colors} seenColors={seenColors} size={size} showName={showName} nameTextStyle={nameTextStyle} nameTextProps={nameTextProps} avatarBorderRadius={avatarBorderRadius} key={`avatar${story.id}`}/>);
    if (FlashList) {
        return (<FlashList horizontal {...avatarListContainerProps} data={stories} renderItem={({ item }) => renderItem(item)} keyExtractor={(item) => item.id} contentContainerStyle={avatarListContainerStyle} testID="storiesList"/>);
    }
    return (<ScrollView horizontal {...avatarListContainerProps} contentContainerStyle={avatarListContainerStyle} testID="storiesList">
      {stories.map(renderItem)}
    </ScrollView>);
};
export default memo(StoryAvatarList);
//# sourceMappingURL=index.js.map