import { PropsWithoutRef, useRef, useState } from "react";
import ModalLayout, { ModalLayoutProps } from "../layouts/ModalLayout";
import Input from "../general/Input";
import { NewFicha } from "@/interfaces/Ficha";
import Select from "../form/Select";
import SelectDropdown from "react-native-select-dropdown";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getGruposTerapeuticosByFuncionario } from "@/util/requests/GrupoTerapeuticoHTTP";
import useAuth from "@/hooks/useAuth";
import { Alert, View } from "react-native";
import { createFicha } from "@/util/requests/fichaHTTP";
import Button from "../general/Button";
import { queryClient } from "@/util/queries";
import { notBlank } from "@/util/validate";
type AddFichaModalProps = {} & PropsWithoutRef<
  Omit<ModalLayoutProps, "children">
>;

const defaultValues: NewFicha = {
  nome: "",
  idResponsavel: "",
  idGrupoTerapeutico: "",
};

export default function AddFichaModal({
  visible,
  toggleModal,
  ...props
}: AddFichaModalProps) {
  const { user, token } = useAuth();
  const hasGroupRef = useRef<SelectDropdown>(null);
  const [inputs, setInputs] = useState(defaultValues);
  const [hasGroup, setHasGroup] = useState<boolean | undefined>(undefined);

  const {
    data: gruposTerapeuticos,
    refetch: refetchTerapeutico,
    isLoading: loadingTerapeutico,
  } = useQuery({
    queryKey: ["grupos", "terapeutico", user!.id],
    enabled: !!user?.id && hasGroup,
    queryFn: () =>
      getGruposTerapeuticosByFuncionario({
        funcionarioId: user!.id!,
        token: token!,
      }),
    initialData: [],
  });

  const { mutate: criarFicha, isPending } = useMutation({
    mutationFn: createFicha,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fichas"],
      });
      queryClient.refetchQueries({
        queryKey: ["fichas"],
      });
      closeModal();
      Alert.alert(
        "Ficha criada",
        "A ficha foi registrada com sucesso no sistema SAP"
      );
    },
  });

  function inputHandler(field: keyof typeof defaultValues, input: string) {
    setInputs((previous) => ({ ...previous, [field]: input }));
  }

  function groupHandler(groupStatus: boolean) {
    setHasGroup(groupStatus);
  }

  function reset() {
    setInputs(defaultValues);
    setHasGroup(false);
  }

  function closeModal() {
    reset();
    toggleModal();
  }

  function createFichaHandler() {
    if (notBlank({ nome: inputs.nome }) && hasGroup !== undefined) {
      criarFicha({
        ficha: {
          ...inputs,
          idResponsavel: user?.id!,
        },
        token: token!,
      });
    } else {
      Alert.alert(
        "Erro",
        "Preencha todas as informações necessárias para continuar."
      );
    }
  }

  return (
    <ModalLayout
      visible={visible}
      toggleModal={closeModal}
      {...props}
      submitButton={{
        button: ({ onSubmit }) => (
          <Button onPress={onSubmit}>
            {!isPending ? "Criar Ficha" : "Criando..."}
          </Button>
        ),
        onSubmit: createFichaHandler,
      }}
    >
      <Input
        onChangeText={inputHandler.bind(null, "nome")}
        placeholder="Digite o nome do paciente"
        autoCapitalize="words"
        value={inputs.nome}
      />
      <View style={{ gap: 24 }}>
        <Select
          ref={hasGroupRef}
          data={[{ nome: "Sim" }, { nome: "Não" }]}
          placeholder="O paciente possui grupo terapêutico?"
          onSelect={groupHandler}
          iconPress={hasGroupRef && hasGroupRef.current?.openDropdown}
          key="isTecnico"
        />
        {hasGroup && (
          <Select
            data={gruposTerapeuticos || []}
            placeholder="Escolha o grupo terapêutico"
            onSelect={inputHandler.bind(null, "idGrupoTerapeutico")}
          />
        )}
      </View>
    </ModalLayout>
  );
}
