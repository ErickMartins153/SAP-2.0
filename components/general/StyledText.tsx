import { Colors } from "@/constants/Colors";
import { type ReactNode } from "react";
import { type StyleProp, StyleSheet, Text, type TextStyle } from "react-native";

type StyledTextProps = {
  children: ReactNode;
  mode?: keyof typeof styles;
  color?: keyof typeof Colors;
  customStyle?: StyleProp<TextStyle>;
};

export default function StyledText({
  children,
  mode = "average",
  color = "text",
  customStyle,
}: StyledTextProps) {
  return (
    <Text style={[{ color: Colors[color] }, styles[mode], customStyle]}>
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
