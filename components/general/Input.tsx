import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import { PropsWithoutRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import Icon from "./Icon";

type InputProps = {
  placeholder: string;
  mode?: "password";
  maxLength?: number;
  value: string;
  field: string;

  changeText: (text: string, field: string) => void;
} & PropsWithoutRef<TextInputProps>;

export default function Input({
  changeText: onChangeText,
  placeholder,
  value,
  maxLength = 32,
  mode,
  field,
  ...rest
}: InputProps) {
  const [hide, setHide] = useState(false);

  function hideHandler() {
    setHide((prevState) => !prevState);
  }

  function changeTextHandler(text: string) {
    onChangeText(text, field);
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
        <Icon
          name={hide ? "eye-off" : "eye"}
          color="viridian"
          onPress={hideHandler}
        />
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
    borderColor: "#5F9F62",
    borderWidth: 1,
    borderRadius: 6,
    elevation: 2,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    padding: "2%",
  },
  input: {
    minWidth: "72%",
    textAlign: "justify",
    fontSize: 16,
  },
});
