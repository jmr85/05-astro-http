import { defineAction } from "astro:actions";
import { z } from 'astro:schema';

export const server = {
  getPostLikes: defineAction({
    accept: "json",
    input: z.string(),
    handler: async (postId) => {
      // call a mailing service, or store to a database
      //! Server ONLY
      console.log({ server: true ,success: true, postId: postId });
      return { success: true, postId: postId };
    },
  }),
};