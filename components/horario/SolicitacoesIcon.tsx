import { Pressable, View } from "react-native";
import Icon from "../general/Icon";
import StyledText from "../UI/StyledText";
import { Colors } from "@/constants/Colors";

type SolicitacoesIconProps = {
  toggleModal: () => void;
  qtdSolicitacoes: number;
};

export default function SolicitacoesIcon({
  qtdSolicitacoes,
  toggleModal,
}: SolicitacoesIconProps) {
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
          color={qtdSolicitacoes < 0 ? "icon" : "red"}
          onPress={toggleModal}
          style={{ zIndex: 100 }}
        />
        {qtdSolicitacoes > 0 && (
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
              {qtdSolicitacoes}
            </StyledText>
          </View>
        )}
      </View>
    </Pressable>
  );
}
