"use client";
import { withObservables } from "@nozbe/watermelondb/react";
import { Post } from "@/db/models";
import { useGetComments, useGetPosts } from "@/hooks/useQuery";
import CommentsList from "./comments";
import { CreatePostButton, CreateCommentButton } from "./buttons";
import useSync from "@/hooks/useSync";

const Posts = () => {
  const posts = useGetPosts(); // we need to use this hook for observability to work.
  const { sync, isSyncing } = useSync();

  return (
    <div>
      <h1>Posts: {isSyncing && "syncing..."}</h1>
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
  const comments = useGetComments(post.id); // we need to use this hook for observability to work.

  return (
    <div>
      <h1 style={{ fontSize: 20, margin: 15 }}>{post.title}</h1>
      <button style={{ color: "red" }} onClick={() => post.delete()}>
        <p>{post.content}</p>
      </button>
      <div>
        <CreateCommentButton post={post} />
        <CommentsList comments={comments} />
      </div>
    </div>
  );
};
