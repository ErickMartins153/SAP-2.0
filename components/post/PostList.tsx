import { FlatList } from "react-native";

import Post from "@/interfaces/Post";
import PostItem from "./PostItem";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/util/requests/postHTTP";
import useAuth from "@/hooks/useAuth";
import Loading from "../UI/Loading";

function isSelected(postId: string, selectedPosts: string[]) {
  return selectedPosts.includes(postId);
}

type PostListProps = {
  onSelection: (isSelected: boolean, postId: string) => void;
  selectedPosts: string[];
};

export default function PostList({
  onSelection,
  selectedPosts,
}: PostListProps) {
  const { user } = useAuth();

  const {
    data: posts,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  function renderPostHandler(post: Post) {
    return (
      <PostItem
        postData={post}
        isSelected={isSelected(post.id, selectedPosts)}
        anySelected={selectedPosts.length > 0}
        key={post.id}
        onSelectPost={
          user?.cargo === "TECNICO"
            ? onSelection.bind(null, isSelected(post.id, selectedPosts))
            : undefined
        }
      />
    );
  }

  return (
    <>
      <FlatList
        data={posts}
        ListEmptyComponent={<Loading />}
        renderItem={({ item }) => renderPostHandler(item)}
        keyExtractor={({ id }) => id}
        onRefresh={refetch}
        refreshing={isRefetching}
        contentContainerStyle={{ paddingBottom: "8%" }}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}
