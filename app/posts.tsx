"use client";
import { useDatabase, withObservables } from "@nozbe/watermelondb/react";
import { Post, Comment } from "@/db/models";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import { Database } from "@nozbe/watermelondb";
import { useGetComments, useGetPosts } from "./hooks/useReadDatabase";

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
      <PostItem key={i} post={post} />
    ))}
  </div>
);

const EnhancedPostsList = withObservables(["posts"], ({ posts }) => ({
  posts,
}))(PostsList);

const PostItem = ({ post }: { post: Post }) => {
  const comments = useGetComments(post.id); // this is the magic hook

  return (
    <div>
      <h1 style={{ fontSize: 20, margin: 15 }}>{post.title}</h1>
      <button style={{ color: "red" }} onClick={() => post.delete()}>
        <p>{post.body}</p>
      </button>
      <div>
        <CreateCommentButton post={post} />
        <EnhancedCommentsList comments={comments} />
      </div>
    </div>
  );
};

const CommentsList = ({ comments }: { comments: Comment[] }) => (
  <div>
    {comments.map((comment, i) => (
      <button
        key={i}
        style={{ marginInline: 10 }}
        onClick={() => comment.delete()}
      >
        {comment.body}
      </button>
    ))}
  </div>
);

const EnhancedCommentsList = withObservables(["comments"], ({ comments }) => ({
  comments,
}))(CommentsList);

const CreatePostButton = () => {
  const database = useDatabase(); // we can access the db like this
  const handleClick = async () => {
    await database.write(async () => {
      await database.get<Post>(Post.table).create((post) => {
        post.title = "A post";
        post.body = "Click me to delete me!";
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
        Add a comment
      </button>
    );
  }
);
