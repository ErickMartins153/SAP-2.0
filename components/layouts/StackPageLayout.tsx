import { Colors } from "@/constants/Colors";
import { type ReactNode } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Icon from "../general/Icon";
import { router } from "expo-router";
import Loading from "../UI/Loading";

type StackPageLayoutProps = {
  children: ReactNode;
  HeadRight?: ReactNode;
  isLoading?: boolean;
  route?: string;
};

export default function StackPageLayout({
  children,
  HeadRight,
  isLoading = false,
  route = "(app)",
}: StackPageLayoutProps) {
  function goBackHandler() {
    router.navigate(route);
  }

  function reportHandler() {
    Alert.alert("Confirmar denúncia?", "", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Confirmar",
        style: "destructive",
      },
    ]);
  }
  return (
    <>
      {isLoading && <Loading />}
      <View style={styles.rootContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.headerIcons}>
            <Icon name="chevron-left" size={32} onPress={goBackHandler} />

            {HeadRight}
          </View>
          {children}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: "12%",
    paddingBottom: "2%",
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    marginVertical: "2%",
    width: "90%",
    borderWidth: 1,
    backgroundColor: Colors.white,
    elevation: 4,
    borderRadius: 20,
    paddingLeft: "2%",
    paddingRight: "2%",
    justifyContent: "space-between",
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginTop: "2%",
  },
});
