import { PropsWithoutRef, useRef, useState } from "react";
import ModalLayout, { ModalLayoutProps } from "../layouts/ModalLayout";
import Input from "../general/Input";
import { NewFicha } from "@/interfaces/Ficha";
import Select from "../form/Select";
import SelectDropdown from "react-native-select-dropdown";
import { useQuery } from "@tanstack/react-query";
import { getGruposTerapeuticosByFuncionario } from "@/util/requests/GrupoTerapeuticoHTTP";
import useAuth from "@/hooks/useAuth";
import { Button, View } from "react-native";

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
  const { user } = useAuth();
  const hasGroupRef = useRef<SelectDropdown>(null);
  const [inputs, setInputs] = useState(defaultValues);
  const [hasGroup, setHasGroup] = useState(false);

  const {
    data: gruposTerapeuticos,
    refetch: refetchTerapeutico,
    isLoading: loadingTerapeutico,
  } = useQuery({
    queryKey: ["grupos", "terapeutico", user!.id],
    enabled: !!user?.id && hasGroup,
    queryFn: () => getGruposTerapeuticosByFuncionario(user!.id),
    initialData: [],
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

  function createFichaHandler() {}

  return (
    <ModalLayout
      visible={visible}
      toggleModal={closeModal}
      {...props}
      submitButton={{
        button: ({ onSubmit }) => (
          <Button onPress={onSubmit} title="Criar Ficha" />
        ),
        onSubmit: createFichaHandler,
      }}
    >
      <Input
        onChangeText={inputHandler.bind(null, "nome")}
        placeholder="Digite o nome do paciente"
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
            data={gruposTerapeuticos}
            placeholder="Escolha o grupo terapêutico"
            onSelect={inputHandler.bind(null, "idGrupoTerapeutico")}
          />
        )}
      </View>
    </ModalLayout>
  );
}
