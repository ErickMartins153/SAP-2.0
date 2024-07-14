import { PropsWithoutRef } from "react";
import {
  Switch as NativeSwitch,
  SwitchProps as NativeSwitchProps,
  View,
} from "react-native";
import StyledText from "../UI/StyledText";
import { Colors } from "@/constants/Colors";

type SwitchProps = {
  isEnabled: boolean;
  onToggle: () => void;
  label: string;
} & PropsWithoutRef<NativeSwitchProps>;

export default function Switch({
  isEnabled,
  onToggle,
  label,
  ...props
}: SwitchProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
      }}
    >
      <StyledText fontWeight="bold" mode="big">
        {label}
      </StyledText>
      <NativeSwitch
        trackColor={{ false: Colors.red, true: Colors.green }}
        thumbColor={Colors.lightRipple}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onToggle}
        value={isEnabled}
        {...props}
      />
    </View>
  );
}
