import { defineAction } from "astro:actions";
import { z } from 'astro:schema';
import { db, Posts, eq } from "astro:db";

export const getPostLikes = defineAction({
    accept: "json",
    input: z.string(),//seria como el params.id
    handler: async (postId) => {
      // call a mailing service, or store to a database
      //! Server ONLY
      const posts = await db.select().from(Posts).where(eq(Posts.id, postId));
      console.log({ server: true ,success: true, likes: posts.at(0)?.likes });
      return { 
        likes: posts.at(0)?.likes ?? 0, 
      };
    },
})