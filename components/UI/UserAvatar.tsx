import { type StyleProp, StyleSheet, View, type ViewProps } from "react-native";
import { Avatar } from "react-native-paper";
import { Colors } from "@/constants/Colors";

type UserAvatarProps = {
  size: number;
  style?: StyleProp<ViewProps>;
  alignSelf?: "flex-start" | "center";
  imageURL?: string;
};

const placeholder = require("@/assets/images/avatar.png");

export default function UserAvatar({
  size,
  style,
  alignSelf = "center",
  imageURL,
}: UserAvatarProps) {
  return (
    <View style={[styles.avatarContainer, style, { alignSelf }]}>
      <Avatar.Image
        style={styles.avatar}
        source={imageURL ? { uri: imageURL } : placeholder}
        size={size}
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
  avatar: {
    borderRadius: 500,
  },
});
