"use client";
import { useDatabase, withObservables } from "@nozbe/watermelondb/react";
import { Post, Comment } from "@/db/models";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import { Database } from "@nozbe/watermelondb";
// import { createPost } from "./db/crud";
// import { useCrud } from "@/hooks/useCrud";
import { use, useEffect, useState } from "react";
// import { useDatabase } from "@nozbe/watermelondb/hooks";
// import { withDatabase } from "./DatabaseProvider";

import { database } from "@/db/database";
import { useGetPosts } from "../hooks/useCrud";
import { Observable } from "@nozbe/watermelondb/utils/rx";

const Posts = () => {
  const defaultPostObservable = new Observable<Post[]>((observer) => {
    observer.next([]);
  });

  const database = useDatabase();
  const [postss, setPostss] = useState<any>(defaultPostObservable);
  // const posts = useGetPosts();

  useEffect(() => {
    const posts = database.get<Post>("posts").query().observe();
    setPostss(posts);
  }, []);
  // const posts = database.get<Post>("posts").query().observe();

  // const posts = useEffect(() => {
  //   console.log(posts);

  //   setPostss(posts);
  // }, [posts]);

  return (
    <div>
      <h1>hi</h1>
      <CreatePostButton />
      <EnhancedPostsList posts={postss} />
    </div>
  );
};

export default Posts;

const PostsList = ({ posts }: { posts: Post[] }) => {
  console.log(posts);
  return (
    <div>
      {posts.map((post, i) => (
        <article key={i}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
};

// export default withDatabase(
//   withObservables([], ({ database }: { database: Database }) => ({
//     posts: database.get<Post>("posts").query().observe(),
//   }))(Posts)
// );

const EnhancedPostsList = withObservables(["posts"], ({ posts }) => ({
  posts,
}))(PostsList);

const CreatePostButton = () => {
  const database = useDatabase();
  const handleClick = async () => {
    await database.write(async () => {
      await database.get<Post>("posts").create((post) => {
        post.title = "New post";
        post.body = "Hello world";
      });
    });
  };

  return (
    <button style={{ color: "red" }} onClick={handleClick}>
      Create Post
    </button>
  );
};

// import { database } from "./database";
// import { Post } from "./models";

// export const createPost = async ({
//   title,
//   subtitle,
//   body,
// }: {
//   title: string;
//   subtitle?: string;
//   body: string;
// }) => {
//   if (typeof window !== "undefined") {
//     await database.write(async () => {
//       await database.get<Post>("posts").create((post) => {
//         post.title = title;
//         post.subtitle = subtitle;
//         post.body = body;
//       });
//     });
//     console.log("Post created!");
//   } else {
//     console.log("Server side");
//   }
// };
