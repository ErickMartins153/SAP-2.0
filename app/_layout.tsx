import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";

import Bottom from "@/components/general/Bottom";
import AuthContextProvider from "@/context/auth";
import { queryClient } from "@/util/queries";
import useUpdates from "@/hooks/useUpdates";
import BottomContextProvider from "@/context/modal";

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
          <BottomContextProvider>
            <Slot />
            <Bottom />
          </BottomContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
