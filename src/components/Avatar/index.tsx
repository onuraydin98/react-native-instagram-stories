import React, { FC, memo, useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  runOnJS,
  useAnimatedReaction,
} from "react-native-reanimated";
import { StoryAvatarProps } from "../../core/dto/componentsDTO";
import AvatarStyles from "./Avatar.styles";
import Loader from "../Loader";
import { AVATAR_OFFSET } from "../../core/constants";
import LinearGradient from "react-native-linear-gradient";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const StoryAvatar: FC<StoryAvatarProps> = ({
  id,
  avatarSource,
  name,
  stories,
  loadingStory,
  seenStories,
  onPress,
  colors,
  seenColors,
  size,
  showName,
  nameTextStyle,
  nameTextProps,
  renderAvatar,
  avatarBorderRadius,
}) => {
  const loaded = useSharedValue(false);
  const isLoading = useDerivedValue(
    () => loadingStory.value === id || !loaded.value
  );
  const seen = useDerivedValue(
    () => seenStories.value[id] === stories[stories.length - 1]?.id
  );
  const [isSeen, setIsSeen] = useState(false);

  useAnimatedReaction(
    () => seenStories.value[id] === stories[stories.length - 1]?.id,
    (seenNow) => {
      runOnJS(setIsSeen)(seenNow);
    },
    [id, stories]
  );

  const onLoad = () => {
    loaded.value = true;
  };

  const imageAnimatedStyles = useAnimatedStyle(() => ({
    opacity: withTiming(isLoading.value ? 0.5 : 1),
  }));

  if (renderAvatar) {
    return renderAvatar(seen.value);
  }

  if (!avatarSource) {
    return null;
  }

  return (
    <LinearGradient
      colors={seen.value ? ["#D9D9D9", "#D9D9D9"] : ["#FCC94F", "#A80533"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: 110,
        height: 200,
        borderRadius: 12,
        padding: 3, // border thickness
        marginRight: 7,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        testID={`${id}StoryAvatar${stories.length}Story`}
        style={{
          flex: 1,
          borderRadius: 10,
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        <AnimatedImage
          source={avatarSource}
          style={[
            {
              width: "100%",
              height: "100%",
              borderRadius: 10,
            },
            imageAnimatedStyles,
          ]}
          resizeMode="cover"
          onLoad={onLoad}
          testID="storyAvatarImage"
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: 6,
          }}
        >
          <Image
            source={require("../../assets/images/playIcon.png")}
            style={{ width: 20, height: 20 }}
          />
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 6,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: "600",
              fontFamily: "Anton-Regular",
            }}
          >
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default memo(StoryAvatar);
