import { StyleSheet, View } from "react-native";
import StyledText from "../general/StyledText";
import UserAvatar from "./UserAvatar";
import { Colors } from "@/constants/Colors";

type BadgeProps = {
  label: string;
  imagemURL?: string;
};

export default function Badge({ label, imagemURL }: BadgeProps) {
  return (
    <>
      <View style={styles.userContainer}>
        <StyledText color="white">{label}</StyledText>
      </View>
      <UserAvatar size={64} imageURL={imagemURL} />
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
