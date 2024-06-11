import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Caption, Drawer, Title } from "react-native-paper";

import { Alert, StyleSheet, View } from "react-native";
import NavbarItem from "./NavbarItem";
import useAuth from "@/hooks/useAuth";
import UserAvatar from "../UI/UserAvatar";

export default function Navbar({ ...props }: DrawerContentComponentProps) {
  const { logout } = useAuth();

  function handleNavigation(destinyPage: string) {
    props.navigation.navigate(destinyPage);
  }

  function formatName(name: string) {
    return name[0].toUpperCase() + name.slice(1);
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
            <UserAvatar size={144} />
            <View style={styles.userInfoSection}>
              <Title style={styles.userInfoText}>{formatName("Usuário")}</Title>
              <Caption>Cargo/função</Caption>
            </View>
          </View>
          <Drawer.Section>
            <NavbarItem
              label="Meu Perfil"
              icon="user"
              size={50}
              onPress={handleNavigation}
              page="Profile"
            />
            <NavbarItem
              label="Mural"
              icon="message-square"
              size={50}
              onPress={handleNavigation}
              page="index"
            />
            <NavbarItem
              label="Horário"
              icon="calendar"
              size={50}
              onPress={handleNavigation}
              page="Schedule"
            />

            <NavbarItem
              label="Gerenciar"
              icon="users"
              size={50}
              onPress={handleNavigation}
              page="Register"
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          width: "100%",
          bottom: "10%",
        }}
      >
        <NavbarItem
          label="Ajuda"
          icon="help-circle"
          size={50}
          onPress={() => Alert.alert("Em breve!")}
          page=""
        />
        <NavbarItem
          label="Sair"
          icon="power"
          size={50}
          onPress={handleLogout}
          page=""
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  avatar: {
    flex: 1,
    marginTop: 16,
    alignItems: "center",
  },
  userInfoSection: {
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfoText: {
    // ...GlobalStyles.defaultText,
    fontSize: 18,
    textAlign: "center",
    // borderBottomColor: Colors.borderGreen,
    borderBottomWidth: 1,
  },
  LabelStyle: {
    // ...GlobalStyles.largeText,
    textAlign: "left",
  },
});
