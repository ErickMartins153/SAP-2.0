import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Caption, Drawer, Title } from "react-native-paper";

import { Alert, Pressable, StyleSheet, View } from "react-native";
import NavbarItem from "./NavbarItem";
import useAuth from "@/hooks/useAuth";
import UserAvatar from "../UI/UserAvatar";
import { Colors } from "@/constants/Colors";

export default function Navbar({ ...props }: DrawerContentComponentProps) {
  const { logout, user } = useAuth();

  function handleNavigation(destinyPage: string) {
    props.navigation.navigate(destinyPage);
  }

  function handleLogout() {
    Alert.alert(
      "Tem certeza?",
      "Você precisará realizar o login novamente.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "default",
          onPress: logout,
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <View style={styles.rootContainer}>
      <DrawerContentScrollView {...props}>
        <View>
          <View style={styles.avatar}>
            <Pressable onPress={handleNavigation.bind(null, "perfil")}>
              <UserAvatar size={144} imageURL={user?.urlImagem} />
            </Pressable>
            <View style={styles.userInfoSection}>
              <Title
                style={styles.userInfoText}
              >{`${user?.nome} ${user?.sobrenome}`}</Title>
              <Caption style={{ fontWeight: "700" }}>
                Cargo: {user?.cargo === "TECNICO" ? "Técnico" : "Estagiário"}
              </Caption>
            </View>
          </View>
          <Drawer.Section>
            <NavbarItem
              label="Mural"
              icon="message-square"
              onPress={handleNavigation}
              page="index"
            />
            {/* <NavbarItem
              label="Horários"
              icon="calendar"
              onPress={handleNavigation}
              page="horarios"
            /> */}
            <NavbarItem
              label="Atendimentos"
              icon="book"
              onPress={handleNavigation}
              page="atendimentos"
            />
            <NavbarItem
              label="Minhas Fichas"
              icon="file-text"
              onPress={handleNavigation}
              page="fichas"
            />
            <NavbarItem
              label="Meus Grupos"
              icon="users"
              onPress={handleNavigation}
              page="grupos"
            />
          </Drawer.Section>
          {user?.cargo === "TECNICO" && (
            <NavbarItem
              label="Gerenciar"
              icon="user-plus"
              onPress={handleNavigation}
              page="gerenciar"
            />
          )}
        </View>
      </DrawerContentScrollView>

      <NavbarItem label="Sair" icon="power" onPress={handleLogout} page="" />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  avatar: {
    flex: 1,
    marginTop: "4%",
    alignItems: "center",
  },
  userInfoSection: {
    marginVertical: "4%",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfoText: {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    borderBottomColor: Colors.text,
    color: Colors.text,
    borderBottomWidth: 1,
  },
  LabelStyle: {
    textAlign: "left",
  },
});
