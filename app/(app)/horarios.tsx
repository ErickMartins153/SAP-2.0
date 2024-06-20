import Calendar from "@/components/horario/Calendar";

import PageLayout from "@/components/general/PageLayout";
import useModal from "@/hooks/useModal";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect } from "react";
import { BackHandler } from "react-native";
import RoomModal from "@/components/horario/RoomModal";

export default function Horarios() {
  const navigation = useNavigation();
  const { clear, isVisible, closeModal, changeModalContent } = useModal();

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
          closeModal();
          return true;
        } else {
          router.navigate("(app)");
          return true;
        }
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [isVisible, closeModal])
  );

  return (
    <PageLayout>
      <Calendar />
    </PageLayout>
  );
}
