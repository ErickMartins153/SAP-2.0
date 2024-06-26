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
import { useQuery } from "@tanstack/react-query";
import { getFuncionarioById } from "@/util/requests/funcionarioHTTP";

export default function Navbar({ ...props }: DrawerContentComponentProps) {
  const { logout, user } = useAuth();
  const { data: funcionarioData } = useQuery({
    queryKey: ["funcionarios", user!.id],
    queryFn: () => getFuncionarioById(user!.id),
  });

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
              <UserAvatar size={144} imageURL={funcionarioData?.imagemURL} />
            </Pressable>
            <View style={styles.userInfoSection}>
              <Title
                style={styles.userInfoText}
              >{`${funcionarioData?.nome} ${funcionarioData?.sobrenome}`}</Title>
              <Caption>
                Cargo: {funcionarioData?.isTecnico ? "Técnico" : "Estagiário"}
              </Caption>
            </View>
          </View>
          <Drawer.Section>
            <NavbarItem
              label="Mural"
              icon="message-square"
              size={50}
              onPress={handleNavigation}
              page="index"
            />
            <NavbarItem
              label="Horários"
              icon="calendar"
              size={50}
              onPress={handleNavigation}
              page="horarios"
            />

            {user?.isTecnico && (
              <NavbarItem
                label="Gerenciar"
                icon="users"
                size={50}
                onPress={handleNavigation}
                page="gerenciar"
              />
            )}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <NavbarItem
        label="Sair"
        icon="power"
        size={50}
        onPress={handleLogout}
        page=""
      />
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
