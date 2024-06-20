import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import { PropsWithoutRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import Icon from "./Icon";

type InputProps = {
  placeholder: string;
  mode?: "password";
  maxLength?: number;
  value: string;
  changeText: (text: string) => void;
} & PropsWithoutRef<TextInputProps>;

export default function Input({
  changeText: onChangeText,
  placeholder,
  value,
  maxLength = 32,
  mode,
  ...rest
}: InputProps) {
  const [hide, setHide] = useState(false);

  function hideHandler() {
    setHide((prevState) => !prevState);
  }

  function changeTextHandler(text: string) {
    onChangeText(text);
  }

  return (
    <View style={[styles.container, rest.style]}>
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
  icon: {
    justifyContent: "center",
    alignItems: "center",
    padding: "2%",
  },
  input: {
    width: "100%",
    textAlign: "justify",
    fontSize: 16,
  },
});
