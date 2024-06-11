import PageLayout from "@/components/general/PageLayout";
import PostButton from "@/components/post/PostButton";
import PostList from "@/components/post/PostList";
import { View } from "react-native";

export default function Mural() {
  return (
    <PageLayout>
      <View>
        <PostList />
      </View>
      <PostButton />
    </PageLayout>
  );
}
