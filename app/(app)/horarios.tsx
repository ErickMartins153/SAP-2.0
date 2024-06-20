import Calendar from "@/components/calendar/Calendar";

import PageLayout from "@/components/general/PageLayout";
import useModal from "@/hooks/useModal";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function Horarios() {
  const navigation = useNavigation();
  const { clear } = useModal();

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", (e) => {
      clear();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <PageLayout>
      <Calendar />
    </PageLayout>
  );
}
