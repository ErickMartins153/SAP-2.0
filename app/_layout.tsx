import AuthContextProvider from "@/context/auth";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Slot />
      </AuthContextProvider>
    </>
  );
}
