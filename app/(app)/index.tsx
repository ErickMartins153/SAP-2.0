import Icon from "@/components/general/Icon";
import MainPageLayout from "@/components/layouts/MainPageLayout";
import AddPost from "@/components/post/AddPost";
import PostButton from "@/components/post/PostButton";

import PostList from "@/components/post/PostList";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { View } from "react-native";

export default function Mural() {
  const [showPostModal, setShowPostModal] = useState(false);
  const navigation = useNavigation();

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

  function togglePostModal() {
    setShowPostModal((prev) => !prev);
  }

  return (
    <MainPageLayout>
      <View>
        <PostList />
        <AddPost visible={showPostModal} toggleModal={togglePostModal} />
      </View>
      {/* <PostButton addPostHandler={togglePostModal} /> */}
    </MainPageLayout>
  );
}
