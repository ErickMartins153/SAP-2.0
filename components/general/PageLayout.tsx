import { Colors } from "@/constants/Colors";
import { useEffect, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { useNavigation } from "expo-router";
import Modal from "./BottomSheet";

type PageLayoutProps = {
  children: ReactNode;
  isModalVisible?: boolean;
};

export default function PageLayout({
  children,
  isModalVisible = false,
}: PageLayoutProps) {
  const navigation = useNavigation();

  useEffect(() => {
    if (isModalVisible) {
      navigation.setOptions({
        headerLeft: () => {},
        swipeEnabled: false,
      });
    }
  }, [isModalVisible]);

  return (
    <>
      <View style={styles.rootLayout}>
        <View style={styles.contentStyle}>{children}</View>
      </View>
      <Modal isVisible={isModalVisible} />
    </>
  );
}

const styles = StyleSheet.create({
  rootLayout: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentStyle: {
    marginHorizontal: "4%",
    flexGrow: 1,
  },
});
