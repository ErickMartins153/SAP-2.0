import BarChart from "@/components/graphics/BarChart";
import MainPageLayout from "@/components/layouts/MainPageLayout";
import useAuth from "@/hooks/useAuth";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Estatisticas() {
  const { user } = useAuth();
  return (
    <MainPageLayout>
      <ScrollView>
        <View style={{ marginVertical: "4%" }}>
          <BarChart />
        </View>
      </ScrollView>
    </MainPageLayout>
  );
}
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  userContainer: {
    marginTop: "4%",
    alignItems: "center",
  },
  userText: {
    fontWeight: "bold",
    marginTop: 16,
  },
  buttonsContainer: {
    marginTop: "12%",
    gap: 24,
  },
});
