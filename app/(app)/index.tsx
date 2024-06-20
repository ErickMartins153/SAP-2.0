import MainPageLayout from "@/components/layouts/MainPageLayout";
import AddPost from "@/components/post/AddPost";
import PostButton from "@/components/post/PostButton";
import PostList from "@/components/post/PostList";
import { useState } from "react";
import { View } from "react-native";

export default function Mural() {
  const [showPostModal, setShowPostModal] = useState(false);

  function togglePostModal() {
    setShowPostModal((prev) => !prev);
  }

  return (
    <MainPageLayout>
      <View>
        <PostList />
        <AddPost visible={showPostModal} toggleModal={togglePostModal} />
      </View>
      <PostButton addPostHandler={togglePostModal} />
    </MainPageLayout>
  );
}
