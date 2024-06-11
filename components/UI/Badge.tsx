import { StyleSheet, View } from "react-native";
import StyledText from "../general/StyledText";
import UserAvatar from "./UserAvatar";
import { Colors } from "@/constants/Colors";

export default function Badge() {
  return (
    <>
      <View style={styles.userContainer}>
        <StyledText color="white">Usuário</StyledText>
      </View>
      <UserAvatar size={64} />
    </>
  );
}
const styles = StyleSheet.create({
  userContainer: {
    borderWidth: 1,
    backgroundColor: Colors.button,
    paddingVertical: "3%",
    paddingLeft: "8%",
    paddingRight: "2%",
    borderRadius: 8,
    position: "absolute",
    left: "15%",
    bottom: "20%",
    maxWidth: 118,
  },
});
