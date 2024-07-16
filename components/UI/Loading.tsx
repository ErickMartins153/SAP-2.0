import { Colors } from "@/constants/Colors";
import { ActivityIndicator, View } from "react-native";

type LoadingProps = {
  showBackdrop?: boolean;
};

export default function Loading({ showBackdrop = true }: LoadingProps) {
  return (
    <View
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        zIndex: 100,
        backgroundColor: showBackdrop ? Colors.backdrop : "",
      }}
    >
      <ActivityIndicator
        color={showBackdrop ? Colors.background : Colors.icon}
        size="large"
      />
    </View>
  );
}
