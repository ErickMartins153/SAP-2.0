import { useEffect, useState } from "react";
import { FlatList } from "react-native";

import Post, { POSTS } from "@/interfaces/Post";
import PostItem from "./PostItem";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>(POSTS);
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
