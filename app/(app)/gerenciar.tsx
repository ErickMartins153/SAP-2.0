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
import { Alert, BackHandler, StyleSheet, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import useAuth from "@/hooks/useAuth";

const defaultFuncionario: newFuncionario = {
  email: "",
  nome: "",
  sobrenome: "",
};

export default function Gerenciar() {
  const [funcionarioData, setFuncionarioData] =
    useState<newFuncionario>(defaultFuncionario);
  const [cargo, setCargo] = useState<newFuncionario["cargo"]>();
  const [modo, setModo] = useState<"ATIVOS" | "INATIVOS">("ATIVOS");
  const supervisoresRef = useRef<SelectDropdown>(null);
  const isTecnicoRef = useRef<SelectDropdown>(null);

  const { changeBottomContent, openBottom, isVisible, closeBottom, clear } =
    useBottomSheet();
  const navigation = useNavigation();
  const { token } = useAuth();
  const { data: tecnicos, isLoading } = useQuery({
    queryKey: ["funcionarios", "tecnicos"],
    queryFn: () => getTecnicos(token!),
  });

  const { mutate } = useMutation({
    mutationFn: addFuncionario,
    onSuccess: (email) => {
      if (supervisoresRef.current && isTecnicoRef.current) {
        supervisoresRef.current.reset();
        isTecnicoRef.current.reset();
      }
      setFuncionarioData(defaultFuncionario);
      queryClient.invalidateQueries({
        queryKey: ["funcionarios"],
      });
      Alert.alert(
        "Funcionário registrado com sucesso!",
        `O funcionário de email: ${email} agora faz parte do sistema SAP!`,
        [
          {
            isPreferred: true,
            text: "Ok",
            onPress: () => router.navigate("(app)"),
          },
        ]
      );
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  useLayoutEffect(() => {
    changeBottomContent(<FuncionariosBottom mode={modo} />);
  }, [modo]);

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

  function cargoHandler(isTecnico: boolean) {
    let novoCargo: newFuncionario["cargo"];
    if (isTecnico) {
      novoCargo = "TECNICO";
    } else {
      novoCargo = "ESTAGIARIO";
    }
    setCargo(novoCargo);
  }

  function changeModeHandler(novoModo: typeof modo) {
    setModo(novoModo);
    openBottom();
  }

  function updateFuncionarioHandler(field: keyof newFuncionario, text: string) {
    setFuncionarioData((funcionario) => ({ ...funcionario, [field]: text }));
  }

  function registerFuncionarioHandler() {
    if (funcionarioData.cargo === "ESTAGIARIO" && !funcionarioData.uidTecnico) {
      return;
    }
    if (notBlank(funcionarioData) && cargo !== undefined) {
      return mutate({ funcionarioData, cargo, token: token! });
    }
    Alert.alert(
      "Erro",
      "Preencha todas as informações necessárias para continuar."
    );
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
              ref={isTecnicoRef}
              data={[{ nome: "Sim" }, { nome: "Não" }]}
              placeholder="O funcionário é técnico?"
              onSelect={cargoHandler}
              iconPress={isTecnicoRef && isTecnicoRef.current?.openDropdown}
              key="isTecnico"
            />
            {cargo === "ESTAGIARIO" && (
              <Select
                ref={supervisoresRef}
                data={tecnicos!}
                onSelect={updateFuncionarioHandler.bind(null, "uidTecnico")}
                iconPress={
                  supervisoresRef && supervisoresRef.current?.openDropdown
                }
                search
                placeholder="Escolha o Supervisor"
                key="supervisor"
              />
            )}
          </View>
          <Input
            placeholder="Nome do funcionário"
            onChangeText={updateFuncionarioHandler.bind(null, "nome")}
            value={funcionarioData.nome}
            key="nome"
            rule="nameValidator"
            autoCapitalize="words"
          />
          <Input
            placeholder="Sobrenome do funcionário"
            onChangeText={updateFuncionarioHandler.bind(null, "sobrenome")}
            value={funcionarioData.sobrenome}
            style={{ marginTop: 0 }}
            key="sobrenome"
            rule="nameValidator"
            autoCapitalize="words"
          />
          <View style={styles.marginVertical}>
            <Button onPress={registerFuncionarioHandler}>Confirmar</Button>
          </View>
        </View>

        <Button color="red" onPress={changeModeHandler.bind(null, "ATIVOS")}>
          Remover usuário
        </Button>
        <Button
          color="green"
          onPress={changeModeHandler.bind(null, "INATIVOS")}
        >
          Reativar funcionário
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
