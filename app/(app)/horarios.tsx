import Calendar from "@/components/horario/Calendar";

import MainPageLayout from "@/components/layouts/MainPageLayout";
import useBottomSheet from "@/hooks/useBottom";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect } from "react";
import { BackHandler } from "react-native";
import RoomModal from "@/components/horario/RoomBottom";

export default function Horarios() {
  const navigation = useNavigation();
  const {
    clear,
    isVisible,
    closeBottom,
    changeBottomContent: changeModalContent,
  } = useBottomSheet();

  useLayoutEffect(() => {
    changeModalContent(<RoomModal />);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", (e) => {
      clear();
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      function onBackPress() {
        if (isVisible) {
          closeBottom();
          return true;
        } else {
          router.navigate("(app)");
          return true;
        }
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [isVisible, closeBottom])
  );

  return (
    <MainPageLayout>
      <Calendar />
    </MainPageLayout>
  );
}
