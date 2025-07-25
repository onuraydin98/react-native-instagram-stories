import React, { memo, useState, useMemo, } from 'react';
import { View } from 'react-native';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';
import ContentStyles from './Content.styles';
const StoryContent = ({ stories, active, activeStory }) => {
    const [storyIndex, setStoryIndex] = useState(0);
    const onChange = async () => {
        'worklet';
        const index = stories.findIndex((item) => item.id === activeStory.value);
        if (active.value && index >= 0 && index !== storyIndex) {
            runOnJS(setStoryIndex)(index);
        }
    };
    useAnimatedReaction(() => active.value, (res, prev) => res !== prev && onChange(), [active.value, onChange]);
    useAnimatedReaction(() => activeStory.value, (res, prev) => res !== prev && onChange(), [activeStory.value, onChange]);
    const content = useMemo(() => stories[storyIndex]?.renderContent?.(), [storyIndex]);
    return content ? <View style={ContentStyles.container} pointerEvents="box-none">{content}</View> : null;
};
export default memo(StoryContent);
//# sourceMappingURL=index.js.map