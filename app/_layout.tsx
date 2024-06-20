import AuthContextProvider from "@/context/auth";
import ModalContextProvider from "@/context/modal";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" backgroundColor="transparent" translucent />
      <AuthContextProvider>
        <ModalContextProvider>
          <Slot />
        </ModalContextProvider>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
