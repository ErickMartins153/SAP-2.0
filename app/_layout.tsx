import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";

import Modal from "@/components/general/Modal";
import AuthContextProvider from "@/context/auth";
import ModalContextProvider from "@/context/modal";
import { queryClient } from "@/util/queries";
import useUpdates from "@/hooks/useUpdates";

export default function RootLayout() {
  const { isChecking, checkUpdate } = useUpdates();

  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}
      onLayout={async () => await checkUpdate()}
    >
      <StatusBar style="auto" backgroundColor="transparent" translucent />
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <ModalContextProvider>
            <Slot />
            <Modal />
          </ModalContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
