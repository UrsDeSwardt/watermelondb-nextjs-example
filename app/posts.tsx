"use client";
import { useDatabase, withObservables } from "@nozbe/watermelondb/react";
import { Post } from "@/db/models";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import { Database } from "@nozbe/watermelondb";
import { useGetPosts } from "./hooks/useCrud";

const Posts = () => {
  const posts = useGetPosts();

  return (
    <div>
      <h1>Posts:</h1>
      <CreatePostButton />
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

const CreatePostButton2 = withDatabase(
  ({ database }: { database: Database }) => {
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
  }
);
