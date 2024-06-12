import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <View style={styles.rootLayout}>
      <View style={styles.contentStyle}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootLayout: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentStyle: {
    marginTop: "32%",
    marginHorizontal: "4%",
    flexGrow: 1,
  },
});
