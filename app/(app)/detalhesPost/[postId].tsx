import {
  Alert,
  BackHandler,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import Icon from "@/components/general/Icon";

import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";

import StyledText from "@/components/general/StyledText";
import UserAvatar from "@/components/UI/UserAvatar";
import { POSTS } from "@/interfaces/Post";
import { useCallback } from "react";
import Input from "@/components/general/Input";
import CommentList from "@/components/post/CommentList";

export default function detalhesPost() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const selectedPost = POSTS.find((post) => post.id === postId);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      function onBackPress() {
        router.navigate("(app)");

        return true;
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

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

  function goBackHandler() {
    router.navigate("(app)");
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
            onPress={goBackHandler}
          />

          <Icon
            name="trash-2"
            color="red"
            size={32}
            style={styles.icon}
            onPress={reportHandler}
          />
        </View>
        <View style={styles.postContent}>
          <View style={styles.userContainer}>
            <UserAvatar size={64} alignSelf="flex-start" />
            <StyledText
              mode="title"
              style={{ marginHorizontal: "4%", flex: 1 }}
            >
              {selectedPost?.autor}
            </StyledText>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{ marginVertical: "4%", minHeight: "100%" }}
          nestedScrollEnabled
        >
          <StyledText mode="title" fontWeight="bold">
            {selectedPost?.titulo}
          </StyledText>
          <ImageBackground
            resizeMode="cover"
            style={styles.imageContainer}
            imageStyle={styles.image}
            source={{
              uri: selectedPost?.imagemURL,
            }}
          />
          <View style={styles.description}>
            <StyledText>{selectedPost?.conteudo}</StyledText>
          </View>
          <CommentList />
        </ScrollView>
        <View style={styles.submitContainer}></View>
      </View>
    </View>
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
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  icon: {
    marginLeft: 0,
    marginTop: "2%",
  },
  postContent: {
    marginTop: "8%",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: "2%",
    borderBottomWidth: 1,
  },
  userText: {
    fontWeight: "bold",
    color: "white",
    paddingVertical: "2%",
    paddingHorizontal: "16%",
  },
  content: {},
  imageContainer: {
    aspectRatio: 1,
    width: "90%",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    marginVertical: "4%",
    borderWidth: 2,
    borderRadius: 4,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  description: {
    paddingBottom: "4%",
    borderBottomWidth: 1,
  },
  submitContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 8,
  },
  submitButton: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingHorizontal: "4%",
    overflow: "hidden",
  },
});
