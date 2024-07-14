import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import { PropsWithoutRef, type ReactNode, useState } from "react";
import { Colors } from "@/constants/Colors";
import Icon from "./Icon";
import { validators } from "@/util/validate";

type InputProps = {
  placeholder: string;
  mode?: "password";
  maxLength?: number;
  value: string;
  onChangeText: (text: string) => void;
  leftIcon?: ReactNode;
  rule?: keyof typeof validators;
} & PropsWithoutRef<TextInputProps>;

export default function Input({
  onChangeText: onChangeText,
  placeholder,
  value,
  maxLength = 32,
  mode,
  leftIcon,
  style: customStyle,
  rule,
  ...rest
}: InputProps) {
  const [hide, setHide] = useState(false);

  function hideHandler() {
    setHide((prevState) => !prevState);
  }

  function changeTextHandler(text: string) {
    if (rule && !text.match(validators[rule])) return;
    onChangeText(text);
  }

  return (
    <View style={[styles.container, customStyle]}>
      {leftIcon && <View style={{ paddingRight: "4%" }}>{leftIcon}</View>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeholder}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        secureTextEntry={mode === "password" && !hide}
        maxLength={maxLength}
        value={value}
        onChangeText={changeTextHandler}
        {...rest}
      />
      {mode === "password" && (
        <Icon name={hide ? "eye-off" : "eye"} onPress={hideHandler} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: "4%",
    marginVertical: "6%",
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 6,
    elevation: 2,
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "90%",
    textAlign: "justify",
    fontSize: 16,
  },
});
