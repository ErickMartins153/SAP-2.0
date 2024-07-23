import { Pressable, View } from "react-native";
import Icon from "../general/Icon";
import StyledText from "../UI/StyledText";
import { Colors } from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";

import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { getAtividadesByStatus } from "@/util/requests/atividadesHTTP";

type SolicitacoesIconProps = {
  toggleModal: () => void;
};

export default function SolicitacoesIcon({
  toggleModal,
}: SolicitacoesIconProps) {
  const { token } = useAuth();
  const [qtdPendentes, setQtdPendentes] = useState<number>(0);

  const { data: pendentes } = useQuery({
    queryKey: ["agendamentos", "pendentes"],
    queryFn: () => getAtividadesByStatus({ status: "PENDENTE", token: token! }),
  });
  console.log(pendentes);

  useEffect(() => {
    if (pendentes) {
      setQtdPendentes(pendentes.length);
    }
  }, [pendentes]);

  return (
    <Pressable
      style={{
        paddingRight: "16%",
        paddingLeft: "20%",
        height: "100%",
        justifyContent: "center",
      }}
      onPress={toggleModal}
    >
      <View style={{ position: "relative" }}>
        <Icon
          name="bell"
          color={qtdPendentes < 0 ? "icon" : "red"}
          onPress={toggleModal}
          style={{ zIndex: 100 }}
        />
        {qtdPendentes > 0 && (
          <View
            style={{
              position: "absolute",
              minWidth: "100%",
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              top: "-72%",
              right: "-56%",
              backgroundColor: Colors.red,
              borderRadius: 999,
              padding: 1,
            }}
          >
            <StyledText color="white" fontWeight="bold">
              {qtdPendentes}
            </StyledText>
          </View>
        )}
      </View>
    </Pressable>
  );
}
