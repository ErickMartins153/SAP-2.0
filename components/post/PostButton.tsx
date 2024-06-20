import { Pressable, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import Icon from "../general/Icon";

type PostButtonProps = {
  addPostHandler: () => void;
};

export default function PostButton({ addPostHandler }: PostButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={addPostHandler}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        android_ripple={{ color: Colors.darkRipple }}
      >
        <Icon name="plus" size={64} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.button,
    borderWidth: 3,
    borderColor: Colors.border,
    borderRadius: 100,
    position: "absolute",
    bottom: "3%",
    right: 0,
    elevation: 4,
    overflow: "hidden",
  },
  button: {
    flex: 1,
  },
  pressed: {
    opacity: 0.75,
  },
});
