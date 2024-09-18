import { getPostLikes } from "./posts/get-post-likes.action";
import { updatePostsLikes } from "./posts/update-post-likes.action";
import { getGreeting } from "./test/get.action";

export const server = {
  // Posts
  getPostLikes,
  updatePostsLikes,
  // Test
  getGreeting,
};