import Calendar from "@/components/calendar/Calendar";

import PageLayout from "@/components/general/PageLayout";

import { useCallback, useState } from "react";

export default function Horarios() {
  const [showModal, setShowModal] = useState(false);

  const toggleModalHandler = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  return (
    <PageLayout isModalVisible={showModal}>
      <Calendar onShowModal={toggleModalHandler} />
    </PageLayout>
  );
}
