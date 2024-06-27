import {
  type StyleProp,
  StyleSheet,
  View,
  type ViewProps,
  TextStyle,
} from "react-native";
import { Image } from "expo-image";
import { type ReactNode } from "react";

import { Colors } from "@/constants/Colors";
import blurhash from "@/util/blurhash";

type UserAvatarProps = {
  size: number;
  style?: StyleProp<ViewProps>;
  alignSelf?: "flex-start" | "center";
  imageURL?: string;
  icon?: (props: {
    size: number;
    style: StyleProp<TextStyle>;
    color: keyof typeof Colors;
  }) => ReactNode;
};

export default function UserAvatar({
  size = 32,
  style,
  alignSelf = "center",
  imageURL,
  icon,
}: UserAvatarProps) {
  return (
    <View style={[styles.avatarContainer, style, { alignSelf }]}>
      <Image
        style={{ width: size, height: size, borderRadius: size / 2 }}
        source={
          imageURL ? { uri: imageURL } : require("@/assets/images/avatar.png")
        }
        placeholder={{ blurhash }}
      />
      {icon && icon({ size: 32, style: styles.icon, color: "button" })}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: 500,
    padding: 2,
    backgroundColor: Colors.icon,
    alignSelf: "flex-start",
  },
  icon: {
    position: "absolute",
    top: 0,
    padding: 8,
    right: "-8%",
  },
});
