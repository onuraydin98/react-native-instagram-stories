import React, { FC, memo } from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { WIDTH } from "../../core/constants";
import HeaderStyles from "./Header.styles";
import { StoryHeaderProps } from "../../core/dto/componentsDTO";
import Close from "../Icon/close";
import LinearGradient from "react-native-linear-gradient";

const StoryHeader: FC<StoryHeaderProps> = ({
  avatarSource,
  name,
  onClose,
  avatarSize,
  textStyle,
  closeColor,
  headerStyle,
  headerContainerStyle,
  renderStoryHeader,
  onStoryHeaderPress,
}) => {
  const styles = {
    width: avatarSize + 8,
    height: avatarSize + 8,
    borderRadius: avatarSize,
  };
  const width = WIDTH - HeaderStyles.container.left * 2;

  if (renderStoryHeader) {
    return (
      <View style={[HeaderStyles.container, { width }, headerContainerStyle]}>
        {renderStoryHeader()}
      </View>
    );
  }

  return (
    <View
      style={[
        HeaderStyles.container,
        HeaderStyles.containerFlex,
        { width },
        headerContainerStyle,
      ]}
    >
      <Pressable
        style={[HeaderStyles.left, headerStyle]}
        onPress={() => onStoryHeaderPress?.()}
      >
        {Boolean(avatarSource) && (
          <LinearGradient
            colors={["#FCC94F", "#A80533"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 2,
              borderRadius: 100,
            }}
          >
            <View
              style={[
                HeaderStyles.avatar,
                { borderRadius: styles.borderRadius },
              ]}
            >
              <Image source={avatarSource!} style={styles} />
            </View>
          </LinearGradient>
        )}
        {Boolean(name) && <Text style={textStyle}>{name}</Text>}
      </Pressable>
      <TouchableOpacity
        onPress={onClose}
        hitSlop={16}
        testID="storyCloseButton"
      >
        <Close color={closeColor} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(StoryHeader);
