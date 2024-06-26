import { type StyleProp, StyleSheet, View, type ViewProps } from "react-native";
import { Image } from "expo-image";

import { Colors } from "@/constants/Colors";
import blurhash from "@/util/blurhash";

type UserAvatarProps = {
  size: number;
  style?: StyleProp<ViewProps>;
  alignSelf?: "flex-start" | "center";
  imageURL?: string;
};

export default function UserAvatar({
  size,
  style,
  alignSelf = "center",
  imageURL,
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
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: 500,
    padding: 2,
    backgroundColor: Colors.icon,
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  avatar: {},
});
