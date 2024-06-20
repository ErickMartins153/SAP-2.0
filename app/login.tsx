import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import { Colors } from "@/constants/Colors";
import LoginForm from "@/components/form/LoginForm";
import MainPageLayout from "@/components/layouts/MainPageLayout";
import StyledText from "@/components/general/StyledText";

export default function Login() {
  const [isvalid, setIsValid] = useState(true);

  function handleInput() {
    setIsValid(true);
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
          source={require("@/assets/images/logo.png")}
        />

        <LoginForm />
      </ScrollView>
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
  },
});
