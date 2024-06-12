import Calendar from "@/components/calendar/Calendar";
import PageLayout from "@/components/general/PageLayout";

import { View } from "react-native";

export default function Horarios() {
  return (
    <PageLayout>
      <View style={{ flex: 1 }}>
        <Calendar />
      </View>
    </PageLayout>
  );
}
