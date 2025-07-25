import React, { memo, useRef, useState } from "react";
import { runOnJS, useAnimatedReaction } from "react-native-reanimated";
import { WIDTH } from "../../core/constants";
import { Platform } from "react-native";
const StoryVideo = ({ source, paused, isActive, onLoad, onLayout, ...props }) => {
    try {
        // eslint-disable-next-line global-require
        const Video = require("react-native-video").default;
        const ref = useRef(null);
        const [pausedValue, setPausedValue] = useState(paused.value);
        const start = () => {
            ref.current?.seek(0);
            ref.current?.resume?.();
        };
        useAnimatedReaction(() => paused.value, (res, prev) => res !== prev && runOnJS(setPausedValue)(res), [paused.value]);
        useAnimatedReaction(() => isActive.value, (res) => res && runOnJS(start)(), [isActive.value]);
        return (<Video ref={ref} style={{
                width: WIDTH,
                aspectRatio: Platform.OS === "ios" ? 0.55 : 0.5,
                marginBottom: Platform.OS === "ios" ? 0 : "40%",
            }} {...props} resizeMode="contain" source={source} paused={pausedValue} controls={false} repeat={false} onLoad={({ duration }) => onLoad(duration * 1000)} onLayout={(e) => onLayout(e.nativeEvent.layout.height)}/>);
    }
    catch (error) {
        return null;
    }
};
export default memo(StoryVideo);
//# sourceMappingURL=video.js.map