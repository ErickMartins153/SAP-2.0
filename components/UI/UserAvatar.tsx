import { type StyleProp, StyleSheet, View, type ViewProps } from "react-native";
import { Avatar } from "react-native-paper";
import { Colors } from "@/constants/Colors";

type UserAvatarProps = {
  size: number;
  style?: StyleProp<ViewProps>;
};

export default function UserAvatar({ size, style }: UserAvatarProps) {
  return (
    <View style={[styles.avatarContainer, style]}>
      <Avatar.Image
        style={styles.avatar}
        source={require("@/assets/images/avatar.png")}
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
  },
  avatar: {
    backgroundColor: Colors.icon,
    borderRadius: 500,
  },
});
