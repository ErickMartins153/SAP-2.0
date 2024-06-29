import Select from "@/components/form/Select";
import Button from "@/components/general/Button";
import Input from "@/components/general/Input";
import StyledText from "@/components/UI/StyledText";
import FuncionariosBottom from "@/components/gerenciar/FuncionariosBottom";
import MainPageLayout from "@/components/layouts/MainPageLayout";
import { Colors } from "@/constants/Colors";
import useBottomSheet from "@/hooks/useBottom";
import { newFuncionario } from "@/interfaces/Funcionario";
import { queryClient } from "@/util/queries";
import { addFuncionario, getTecnicos } from "@/util/requests/funcionarioHTTP";
import { notBlank } from "@/util/validate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router, useFocusEffect, useNavigation } from "expo-router";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const defaultFuncionario: newFuncionario = {
  email: "",
  isTecnico: false,
  nome: "",
  sobrenome: "",
  ativo: true,
};

export default function Gerenciar() {
  const [funcionarioData, setFuncionarioData] =
    useState<newFuncionario>(defaultFuncionario);
  const supervisoresRef = useRef<SelectDropdown>(null);
  const isTecnicoRef = useRef<SelectDropdown>(null);
  const {
    changeBottomContent: changeModalContent,
    openBottom,
    isVisible,
    closeBottom,
    clear,
  } = useBottomSheet();
  const navigation = useNavigation();
  const {
    data: tecnicos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["funcionarios"],
    queryFn: getTecnicos,
  });

  const { mutate } = useMutation({
    mutationFn: addFuncionario,
    onSuccess: () => {
      setFuncionarioData(defaultFuncionario);
      supervisoresRef.current!.reset();
      isTecnicoRef.current!.reset();
      queryClient.invalidateQueries({
        queryKey: ["funcionarios"],
      });
    },
  });

  useLayoutEffect(() => {
    changeModalContent(<FuncionariosBottom />);
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

  function updateFuncionarioHandler(field: keyof newFuncionario, text: string) {
    setFuncionarioData((funcionario) => ({ ...funcionario, [field]: text }));
  }

  function registerFuncionarioHandler() {
    if (notBlank(funcionarioData)) {
      mutate(funcionarioData);
    }
  }

  return (
    <MainPageLayout isLoading={isLoading}>
      <View style={styles.gap}>
        <View style={styles.wrapper}>
          <StyledText mode="big" textAlign="center" fontWeight="bold">
            Cadastrar funcionário
          </StyledText>
          <Input
            placeholder="email@upe.br"
            onChangeText={updateFuncionarioHandler.bind(null, "email")}
            value={funcionarioData.email}
            key="email"
          />
          <View style={styles.gap}>
            <Select
              ref={supervisoresRef}
              data={tecnicos!}
              onSelect={updateFuncionarioHandler.bind(null, "supervisor")}
              search
              placeholder="Escolha o Supervisor"
              key="supervisor"
            />

            <Select
              ref={isTecnicoRef}
              data={[{ nome: "Sim" }, { nome: "Não" }]}
              placeholder="O funcionário é técnico?"
              onSelect={updateFuncionarioHandler.bind(null, "isTecnico")}
              key="isTecnico"
            />
          </View>
          <Input
            placeholder="Nome do funcionário"
            onChangeText={updateFuncionarioHandler.bind(null, "nome")}
            value={funcionarioData.nome}
            key="nome"
          />
          <Input
            placeholder="Sobrenome do funcionário"
            onChangeText={updateFuncionarioHandler.bind(null, "sobrenome")}
            value={funcionarioData.sobrenome}
            style={{ marginTop: 0 }}
            key="sobrenome"
          />
          <View style={styles.marginVertical}>
            <Button onPress={registerFuncionarioHandler}>Confirmar</Button>
          </View>
        </View>

        <Button color="red" onPress={openBottom}>
          Remover usuário
        </Button>
      </View>
    </MainPageLayout>
  );
}

const styles = StyleSheet.create({
  gap: {
    gap: 24,
  },
  wrapper: {
    marginTop: "4%",
    padding: "4%",
    backgroundColor: Colors.white,
    elevation: 4,
    borderRadius: 4,
  },
  marginVertical: {
    marginVertical: "4%",
  },
});
