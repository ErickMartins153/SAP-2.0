import PageLayout from "@/components/general/PageLayout";
import PostList from "@/components/post/PostList";
import useAuth from "@/hooks/useAuth";
import { View } from "react-native";

export default function Mural() {
  const { logout } = useAuth();
  return (
    <PageLayout>
      <View>
        <PostList />
      </View>
    </PageLayout>
  );
}
