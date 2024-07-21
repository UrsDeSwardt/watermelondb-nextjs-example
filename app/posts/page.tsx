"use client";
import Posts from "@/app/posts/posts";
import { Post } from "@/db/models";
import { useDatabase, withDatabase } from "@nozbe/watermelondb/react";

const Page = () => {
  return (
    <div>
      <h1>Posts</h1>
      {/* <CreatePostButtonComponent2 /> */}
      <Posts />
    </div>
  );
};

export default Page;

const CreatePostButtonComponent2 = () => {
  const database = useDatabase();
  const handleClick = async () => {
    console.log("clicked");
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

const CreatePostButton = withDatabase(CreatePostButtonComponent2);
