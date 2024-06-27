import { Colors } from "@/constants/Colors";
import { ActivityIndicator, View } from "react-native";

export default function Loading() {
  return (
    <View
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        zIndex: 100,
        backgroundColor: Colors.backdrop,
      }}
    >
      <ActivityIndicator color={Colors.background} size="large" />
    </View>
  );
}
