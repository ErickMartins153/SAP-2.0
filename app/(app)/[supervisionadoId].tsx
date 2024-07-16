import UserAvatar from "../../components/UI/UserAvatar";
import { ScrollView, StyleSheet, View } from "react-native";
import StyledText from "../../components/UI/StyledText";
import MainPageLayout from "../../components/layouts/MainPageLayout";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getFuncionarioById } from "@/util/requests/funcionarioHTTP";
import BarChart from "@/components/graphics/BarChart";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/UI/Loading";

export default function PerfilSupervisionado() {
  const { token } = useAuth();
  const navigation = useNavigation();
  const { supervisionadoId } = useLocalSearchParams<{
    supervisionadoId: string;
  }>();

  const { data: funcionario, isLoading } = useQuery({
    queryKey: ["funcionarios", supervisionadoId],
    queryFn: () => getFuncionarioById(supervisionadoId!, token!),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MainPageLayout>
      <ScrollView>
        <View style={styles.userContainer}>
          <UserAvatar size={144} imageURL={funcionario?.urlImagem} />
          <StyledText fontWeight="bold" textTransform="capitalize">
            {`${funcionario?.nome} ${funcionario?.sobrenome}`}
          </StyledText>
          <StyledText>
            {funcionario?.cargo === "TECNICO" ? "Técnico" : "Estagiário"}
          </StyledText>
        </View>
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
