import PageLayout from "@/components/general/PageLayout";
import PostList from "@/components/post/PostList";
import { View } from "react-native";

export default function Mural() {
  return (
    <PageLayout>
      <View>
        <PostList />
      </View>
    </PageLayout>
  );
}
