import { BackHandler, Pressable, StyleSheet, View } from "react-native";
import Icon from "./Icon";
import StyledText from "../UI/StyledText";
import { Colors } from "@/constants/Colors";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

type HeaderProps = {} & DrawerHeaderProps;

export default function Header({ navigation, ...props }: HeaderProps) {
  useFocusEffect(
    useCallback(() => {
      function onBackPress() {
        navigation.navigate("perfil");
        return true;
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );
  return (
    <View style={styles.header} {...props}>
      <Pressable
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => navigation.navigate("perfil")}
      >
        <Icon
          name="chevron-left"
          size={32}
          onPress={() => navigation.navigate("perfil")}
        />
        <StyledText
          mode="big"
          fontWeight="bold"
          textAlign="center"
          onPress={() => navigation.navigate("perfil")}
        >
          Voltar
        </StyledText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    elevation: 4,
    paddingTop: "12%",
    paddingBottom: "4%",
    paddingRight: "2%",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
});
