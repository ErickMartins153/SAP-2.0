import AuthContextProvider from "@/context/auth";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" backgroundColor="transparent" translucent />
      <AuthContextProvider>
        <Slot />
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
