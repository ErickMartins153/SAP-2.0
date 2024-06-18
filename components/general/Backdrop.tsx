import { Colors } from "@/constants/Colors";

import { StyleSheet, View } from "react-native";

export default function BackDrop() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: Colors.backdrop,
    zIndex: 10,
  },
});
