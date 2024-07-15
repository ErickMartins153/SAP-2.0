import Icon from "@/components/general/Icon";
import MainPageLayout from "@/components/layouts/MainPageLayout";
import AddPost from "@/components/post/AddPost";

import PostList from "@/components/post/PostList";
import { queryClient } from "@/util/queries";
import { deleteMultiplePosts } from "@/util/requests/postHTTP";
import { useMutation } from "@tanstack/react-query";
import { useFocusEffect, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, BackHandler, View } from "react-native";

export default function Mural() {
  const navigation = useNavigation();
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  const { mutate: deletePosts } = useMutation({
    mutationFn: deleteMultiplePosts,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="plus"
          style={{
            paddingRight: "8%",
            paddingLeft: "20%",
            height: "100%",
            justifyContent: "center",
          }}
          onPress={togglePostModal}
        />
      ),
    });
  }, [navigation]);

  useFocusEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  });

  useEffect(() => {
    if (selectedPosts.length > 0) {
      navigation.setOptions({
        headerRight: () => (
          <Icon
            name="trash"
            color="red"
            style={{
              paddingRight: "8%",
              paddingLeft: "20%",
              height: "100%",
              justifyContent: "center",
            }}
            onPress={() =>
              Alert.alert(
                "Tem certeza?",
                `Confirmar deleção de ${selectedPosts.length} Post${
                  selectedPosts.length > 1 ? "(s)" : ""
                }?`,
                [
                  { isPreferred: true, text: "Cancelar" },
                  {
                    text: "Confirmar",
                    onPress: () => deletePosts(selectedPosts),
                  },
                ]
              )
            }
          />
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => (
          <Icon
            name="plus"
            style={{
              paddingRight: "8%",
              paddingLeft: "20%",
              height: "100%",
              justifyContent: "center",
            }}
            onPress={togglePostModal}
          />
        ),
      });
    }
  }, [selectedPosts.length, navigation]);

  function selectPostHandler(isSelected: boolean, selectedPostId: string) {
    if (!isSelected) {
      setSelectedPosts((postIds) => [...postIds, selectedPostId]);
    } else {
      setSelectedPosts((postId) =>
        postId.filter((id) => id !== selectedPostId)
      );
    }
  }

  function togglePostModal() {
    setShowPostModal((prev) => !prev);
  }

  return (
    <MainPageLayout>
      <View>
        {/* <PostList
          onSelection={selectPostHandler}
          selectedPosts={selectedPosts}
        /> */}
        <AddPost visible={showPostModal} toggleModal={togglePostModal} />
      </View>
      {/* <PostButton addPostHandler={togglePostModal} /> */}
    </MainPageLayout>
  );
}
