import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import { Colors } from "@/constants/Colors";
import LoginForm from "@/components/form/LoginForm";
import PageLayout from "@/components/general/PageLayout";

export default function Login() {
  const [isvalid, setIsValid] = useState(true);

  function handleInput() {
    setIsValid(true);
  }

  return (
    <PageLayout>
      <View style={styles.rootContainer}>
        <Image
          style={styles.image}
          source={require("@/assets/images/SAP-logo.png")}
        />
        <LoginForm />
      </View>
    </PageLayout>
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
    flex: 1,
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