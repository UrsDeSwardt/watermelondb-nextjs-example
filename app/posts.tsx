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
import { useGetPosts } from "./hooks/useCrud";
import { Observable } from "@nozbe/watermelondb/utils/rx";

const Posts = () => {
  const posts = useGetPosts();

  return (
    <div>
      <h1>hi</h1>
      <CreatePostButton2 />
      <EnhancedPostsList posts={posts} />
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

const CreatePostButtonComponent = ({ database }: { database: Database }) => {
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

const CreatePostButton2 = withDatabase(CreatePostButtonComponent);
