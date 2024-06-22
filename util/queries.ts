import { QueryClient } from "@tanstack/react-query";

import { addPost, deletePost } from "./postHTTP";

export const queryClient = new QueryClient();

queryClient.setMutationDefaults(["addPost"], {
  mutationFn: addPost,
  onMutate: async () => {
    await queryClient.cancelQueries({ queryKey: ["posts"] });
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
  retry: 3,
});

queryClient.setMutationDefaults(["deletePost"], {
  mutationFn: deletePost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
  retry: 3,
});
