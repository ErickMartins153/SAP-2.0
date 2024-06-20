import { Colors } from "@/constants/Colors";
import { useEffect, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { useNavigation } from "expo-router";
import Modal from "./Modal";
import Icon from "./Icon";
import useModal from "@/hooks/useModal";

type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  const { isVisible } = useModal();
  const navigation = useNavigation();

  useEffect(() => {
    if (isVisible) {
      navigation.setOptions({
        headerLeft: () => {},
      });
    } else {
      navigation.setOptions({
        headerLeft: () => (
          <Icon
            name="align-justify"
            color="text"
            size={32}
            style={{ padding: "6%", marginLeft: "8%" }}
            // @ts-expect-error
            onPress={navigation.toggleDrawer}
          />
        ),
      });
    }
  }, [isVisible]);

  return (
    <>
      <View style={styles.rootLayout}>
        <View style={styles.contentStyle}>{children}</View>
      </View>
      <Modal />
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
