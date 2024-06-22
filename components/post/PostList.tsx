import { useState } from "react";
import { FlatList } from "react-native";

import Post from "@/interfaces/Post";
import PostItem from "./PostItem";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/util/postHTTP";

export default function PostList() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  function handleRefresh() {}

  function renderPostHandler(post: Post) {
    return <PostItem postData={post} />;
  }

  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item }) => renderPostHandler(item)}
        keyExtractor={({ id }) => id}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        contentContainerStyle={{ paddingBottom: "8%" }}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}
