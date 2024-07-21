"use client";
import { useDatabase, withObservables } from "@nozbe/watermelondb/react";
import { Post, Comment } from "@/db/models";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import { Database } from "@nozbe/watermelondb";
import { useGetPosts } from "./hooks/useCrud";

const Posts = () => {
  const posts = useGetPosts(); // this is the magic hook

  return (
    <div>
      <h1>Posts:</h1>
      <CreatePostButton />

      <EnhancedPostsList posts={posts} />
    </div>
  );
};

export default Posts;

const PostsList = ({ posts }: { posts: Post[] }) => (
  <div>
    {posts.map((post, i) => (
      <EnhancedPostItem key={i} post={post} />
    ))}
  </div>
);

const EnhancedPostsList = withObservables(["posts"], ({ posts }) => ({
  posts,
}))(PostsList);

const PostItem = ({ post, comments }: { post: Post; comments: Comment[] }) => (
  <div>
    <h1 style={{ fontSize: 20, margin: 10 }}>{post.title}</h1>
    <button style={{ color: "red" }} onClick={() => post.delete()}>
      <p>{post.body}</p>
    </button>
    <div>
      <CreateCommentButton post={post} />
      {comments.map((comment, i) => (
        <p key={i}>{comment.body}</p>
      ))}
    </div>
  </div>
);

const EnhancedPostItem = withObservables(["post"], ({ post }) => ({
  post,
  comments: post.comments.observe(),
}))(PostItem);

const CreatePostButton = () => {
  const database = useDatabase(); // we can access the db like this
  const handleClick = async () => {
    await database.write(async () => {
      await database.get<Post>(Post.table).create((post) => {
        post.title = "A post";
        post.body = "Click me to delete me";
      });
    });
  };

  return (
    <button style={{ color: "green" }} onClick={handleClick}>
      Create a post
    </button>
  );
};

const CreateCommentButton = withDatabase(
  // we can also access the db like this
  ({ database, post }: { database: Database; post: Post }) => {
    const handleClick = async () => {
      await database.write(async () => {
        await database.get<Comment>(Comment.table).create((comment) => {
          comment.body = "A comment";
          comment.post.set(post);
        });
      });
    };

    return (
      <button style={{ color: "blue" }} onClick={handleClick}>
        Create a comment
      </button>
    );
  }
);
