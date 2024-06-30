import { View } from "react-native";

import Button from "../general/Button";
import Input from "../general/Input";
import Select from "../form/Select";

import { getWeekdayNames } from "@/util/dateUtils";

import { NewGrupo } from "./AddGrupoModal";

import Funcionario from "@/interfaces/Funcionario";

type GrupoInfoProps = {
  grupo: NewGrupo;
  tecnicos: Funcionario[];
  inputHandler: (field: keyof NewGrupo, text: string) => void;
  onSubmit: () => void;
};

const weekDays = getWeekdayNames();

export default function GrupoInfo({
  grupo,
  tecnicos,
  inputHandler,
  onSubmit,
}: GrupoInfoProps) {
  return (
    <>
      <Input
        autoCapitalize="sentences"
        placeholder="Tema do grupo"
        maxLength={50}
        value={grupo.temaEstudo}
        onChangeText={inputHandler.bind(null, "temaEstudo")}
      />
      <View style={{ gap: 24, paddingBottom: "4%" }}>
        <Select
          data={tecnicos!}
          onSelect={inputHandler.bind(null, "ministrantesId")}
          search
          placeholder="Ministrante Principal"
          key="ministrantePrincipal"
        />
        <Select
          data={[{ nome: "Estudo" }, { nome: "Terapêutico" }]}
          onSelect={inputHandler.bind(null, "tipo")}
          placeholder="Tipo de Grupo"
          key="tipoGrupo"
        />
        <Button onPress={onSubmit}>Escolher horário</Button>
      </View>
    </>
  );
}
