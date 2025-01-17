import { Image, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";

import { Colors } from "@/constants/Colors";
import LoginForm from "@/components/form/LoginForm";
import MainPageLayout from "@/components/layouts/MainPageLayout";

import RecoverForm from "@/components/form/RecoverForm";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);

  function toggleModalHandler() {
    setIsVisible((p) => !p);
  }

  return (
    <MainPageLayout>
      <ScrollView
        contentContainerStyle={styles.rootContainer}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          style={styles.image}
          source={require("@/assets/images/logoSAP.png")}
          resizeMode="center"
        />
        <LoginForm onShowModal={toggleModalHandler} />
      </ScrollView>
      <RecoverForm isVisible={isVisible} toggleModal={toggleModalHandler} />
    </MainPageLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    minHeight: "100%",
  },
  scrollContainer: {
    backgroundColor: Colors.background,
    flexGrow: 1,
  },
  rootContainer: {
    alignItems: "center",
  },
  welcomeText: {
    marginTop: "20%",
    textAlign: "center",
  },
  image: {
    marginTop: "34%",
    maxHeight: 200,
  },
});
