"use client";
import { useDatabase } from "@nozbe/watermelondb/react";
import { Post, Comment } from "@/db/models";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import { Database } from "@nozbe/watermelondb";
import useSync from "@/hooks/useSync";

// Method 1 to access the database:
const CreatePostButton = () => {
  const database = useDatabase();
  const handleClick = async () => {
    await database.write(async () => {
      await database.get<Post>(Post.table).create((post) => {
        post.title = "A post";
        post.content = "Click me to delete me!";
      });
    });
  };

  return (
    <button style={{ color: "green" }} onClick={handleClick}>
      Create a post
    </button>
  );
};

// Method 2 to access the database:
const CreateCommentButton = withDatabase(
  ({ database, post }: { database: Database; post: Post }) => {
    const handleClick = async () => {
      await database.write(async () => {
        await database.get<Comment>(Comment.table).create((comment) => {
          comment.content = "A comment";
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

const SyncButton = () => {
  const { sync, isSyncing } = useSync();

  return (
    <button style={{ color: "black" }} onClick={sync}>
      {isSyncing ? "Syncing..." : "Click to sync"}
    </button>
  );
};

export { CreatePostButton, CreateCommentButton, SyncButton };
