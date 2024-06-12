import { Alert, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import Icon from "@/components/general/Icon";

import { router, useLocalSearchParams } from "expo-router";

import StyledText from "@/components/general/StyledText";
import UserAvatar from "@/components/UI/UserAvatar";

export default function detalhesPost() {
  const { postId } = useLocalSearchParams<{ postId: string }>();

  function handleDelete() {
    Alert.alert(
      "Você tem certeza?",
      "Uma vez deletado esse post não poderá ser recuperado!",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "destructive",
        },
      ]
    );
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

  function deleteHandler(id: string) {}

  return (
    <View style={styles.rootContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.headerIcons}>
          <Icon
            name="corner-down-left"
            size={32}
            style={styles.icon}
            onPress={router.back}
          />

          <View>
            <Icon
              name="alert-triangle"
              color="red"
              size={32}
              style={styles.icon}
              onPress={reportHandler}
            />
          </View>
        </View>
        <View style={styles.postContent}>
          <View style={styles.userContainer}>
            <UserAvatar size={120} alignSelf="flex-start" />
            <StyledText mode="title" textAlign="center" style={{ flex: 1 }}>
              Usuário
            </StyledText>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            {/* <FormattedImage path={postData.imageUri} /> */}
          </View>
          <StyledText style={styles.description}>
            {postId || "testando"}
          </StyledText>
        </View>
        <View style={styles.submitContainer}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingVertical: "12%",
    backgroundColor: Colors.background,
    borderWidth: 1,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    marginVertical: "4%",
    width: "90%",
    borderWidth: 1,
    backgroundColor: Colors.white,
    elevation: 4,
    borderRadius: 20,
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  icon: {
    marginLeft: 0,
    marginTop: 12,
  },
  postContent: {
    paddingHorizontal: "auto",
    marginTop: "12%",
  },
  userContainer: {
    paddingLeft: "2%",
    paddingRight: "8%",
    flexDirection: "row",
    alignItems: "center",
  },
  userText: {
    fontWeight: "bold",
    color: "white",
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  content: {},
  imageContainer: {},
  description: {
    paddingVertical: "4%",
    paddingHorizontal: "8%",
  },
  submitContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 8,
  },
  submitButton: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    overflow: "hidden",
  },
});
