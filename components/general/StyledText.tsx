import { Colors } from "@/constants/Colors";
import { PropsWithoutRef, type ReactNode } from "react";
import {
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  TextProps,
} from "react-native";

type StyledTextProps = {
  children: ReactNode;
  mode?: keyof typeof styles;
  color?: keyof typeof Colors;
  textTransform?: "capitalize" | "none";
  fontWeight?: "regular" | "bold";
  textAlign?: "center" | "auto";
} & PropsWithoutRef<TextProps>;

export default function StyledText({
  children,
  mode = "average",
  color = "text",
  textTransform = "none",
  fontWeight = "regular",
  style,
  textAlign = "auto",
  ...props
}: StyledTextProps) {
  return (
    <Text
      style={[
        { color: Colors[color], textTransform, fontWeight, textAlign },
        styles[mode],
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
  },
  average: {
    fontSize: 16,
  },
  big: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
  },
});
