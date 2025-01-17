import { FlatList, View } from "react-native";

import Post from "@/interfaces/Post";
import PostItem from "./PostItem";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/util/requests/postHTTP";
import useAuth from "@/hooks/useAuth";
import StyledText from "../UI/StyledText";
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
  const { user, token } = useAuth();

  const {
    data: posts,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(token!),
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <FlatList
        data={posts || []}
        ListEmptyComponent={
          <View
            style={{
              justifyContent: "center",
              marginTop: "32%",
              alignItems: "center",
            }}
          >
            <StyledText size="big" textAlign="center">
              Não há nenhum post no momento, clique no{" "}
              <StyledText fontWeight="bold" size="big">
                +
              </StyledText>{" "}
              no canto superior direito para adicionar um!
            </StyledText>
          </View>
        }
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
