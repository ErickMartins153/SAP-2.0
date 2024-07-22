import { Pressable, PressableProps, StyleSheet, View } from "react-native";

import UserAvatar from "../UI/UserAvatar";
import { Colors } from "@/constants/Colors";

import { PropsWithoutRef, ReactNode } from "react";

export type ItemLayoutProps = {
  onPress: () => void;
  imageURL?: string;
  children: ReactNode;
  header?: ReactNode;
  isSelected?: boolean;
} & PropsWithoutRef<PressableProps>;

export default function ItemLayout({
  onPress,
  imageURL,
  children,
  header,
  isSelected,
  ...props
}: ItemLayoutProps) {
  return (
    <Pressable
      style={[styles.rootContainer, isSelected && styles.selected]}
      onPress={() => onPress()}
      android_ripple={{ color: Colors.lightRipple }}
      {...props}
    >
      {imageURL && <UserAvatar size={64} imageURL={imageURL} />}
      <View style={styles.mainContainer}>
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {header}
        </View>
        {children}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    paddingHorizontal: "2%",
    paddingVertical: "4%",
    borderRadius: 4,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightRipple,
    overflow: "hidden",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: "4%",
    gap: 4,
    borderRadius: 4,
  },
  text: {
    flex: 1,
    flexShrink: 1,
    flexWrap: "wrap",
    marginBottom: "2%",
  },
  selected: {
    opacity: 0.9,
    backgroundColor: Colors.lightRipple,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: Colors.text,
  },
});
