import { StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import UserAvatar from "@/components/UI/UserAvatar";
import Button from "@/components/general/Button";
import StyledText from "@/components/general/StyledText";
import MainPageLayout from "@/components/layouts/MainPageLayout";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { getFuncionarioById } from "@/util/requests/funcionarioHTTP";

export default function ProfileScreen() {
  const { user } = useAuth();

  const { data: funcionarioData } = useQuery({
    queryKey: ["funcionarios", user!.id],
    queryFn: () => getFuncionarioById(user!.id),
  });
  function handleEdit() {
    alert("Em breve!");
  }

  return (
    <MainPageLayout>
      <View style={styles.userContainer}>
        <UserAvatar size={144} imageURL={funcionarioData?.imagemURL} />
        <StyledText fontWeight="bold" textTransform="capitalize">
          {`${funcionarioData?.nome} ${funcionarioData?.sobrenome}`}
        </StyledText>
        <StyledText>
          {funcionarioData?.isTecnico ? "Técnico" : "Estagiário"}
        </StyledText>
        <View style={styles.buttonsContainer}>
          {/* <Button style={styles.button} onPress={() => {}}>
            Dados pessoais
          </Button> */}
          <Button style={styles.button} onPress={() => {}}>
            Estatísticas
          </Button>
          <Button style={styles.button} onPress={() => {}}>
            Meus supervisionados
          </Button>
        </View>
      </View>
    </MainPageLayout>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    marginTop: 100,
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
    height: "54%",
    gap: 24,
  },
  button: {
    paddingHorizontal: "18%",
    paddingVertical: "6%",
    alignItems: "center",
  },
});
