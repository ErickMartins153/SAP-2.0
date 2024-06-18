import { Colors } from "@/constants/Colors";
import { type PropsWithoutRef, type ReactNode } from "react";
import { PressableProps, Pressable, StyleSheet, View } from "react-native";
import StyledText from "./StyledText";

type ButtonProps = {
  children: ReactNode;
  onPress?: () => void;
} & PropsWithoutRef<PressableProps>;

export default function Button({ children, onPress, ...rest }: ButtonProps) {
  return (
    <View style={styles.externalContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.internalContainer,
          pressed && styles.pressed,
        ]}
        android_ripple={{ color: Colors.darkRipple }}
        {...rest}
      >
        <View>
          <StyledText mode="big" color="white">
            {children}
          </StyledText>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  externalContainer: {
    borderRadius: 18,
    backgroundColor: Colors.button,
    elevation: 4,
    overflow: "hidden",
  },

  internalContainer: {
    paddingVertical: "4%",
    paddingHorizontal: "12%",
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
  },
});
