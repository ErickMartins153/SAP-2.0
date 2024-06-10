import Icon from "@/components/general/Icon";
import Navbar from "@/components/navigation/Navbar";
import { Colors } from "@/constants/Colors";
import useAuth from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Dimensions } from "react-native";

export default function RootLayout() {
  const { user } = useAuth();
  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Drawer
      drawerContent={(props) => <Navbar {...props} />}
      screenOptions={({ navigation }) => ({
        headerTransparent: true,
        drawerStyle: {
          maxWidth: Dimensions.get("window").width / 1.5,
        },
        headerLeft: () => (
          <Icon
            name="align-justify"
            color="text"
            size={32}
            style={{ padding: "6%" }}
            onPress={navigation.toggleDrawer}
          />
        ),
        headerTintColor: Colors.viridian,
      })}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Mural",
          drawerLabel: "Mural",
          headerTitleAlign: "center",
          drawerType: "slide",
        }}
      />
    </Drawer>
  );
}
