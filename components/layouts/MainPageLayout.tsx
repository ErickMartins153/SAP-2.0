import { Colors } from "@/constants/Colors";
import { useEffect, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { useNavigation } from "expo-router";
import Icon from "../general/Icon";
import useBottomSheet from "@/hooks/useModal";
import Loading from "../general/Loading";

type PageLayoutProps = {
  children: ReactNode;
  isLoading?: boolean;
};

export default function MainPageLayout({
  children,
  isLoading = false,
}: PageLayoutProps) {
  const { isVisible } = useBottomSheet();
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
        {isLoading ? (
          <Loading />
        ) : (
          <View style={styles.contentStyle}>{children}</View>
        )}
      </View>
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
