import { Pressable, StyleSheet, View } from "react-native";

import UserAvatar from "../UI/UserAvatar";
import { Colors } from "@/constants/Colors";

import { ReactNode } from "react";

export type ItemLayoutProps = {
  onSelect: () => void;
  imageURL?: string;
  children: ReactNode;
  header?: ReactNode;
};

export default function ItemLayout({
  onSelect,
  imageURL,
  children,
  header,
}: ItemLayoutProps) {
  return (
    <Pressable
      style={styles.rootContainer}
      onPress={() => onSelect()}
      android_ripple={{ color: Colors.lightRipple }}
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
    borderWidth: 2,
    padding: "2%",
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: "4%",
    gap: 4,
  },
  text: {
    flex: 1,
    flexShrink: 1,
    flexWrap: "wrap",
    marginBottom: "2%",
  },
});
