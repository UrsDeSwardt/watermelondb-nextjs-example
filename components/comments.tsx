"use client";
import { withObservables } from "@nozbe/watermelondb/react";
import { Comment } from "@/db/models";

const CommentsList = ({ comments }: { comments: Comment[] }) => (
  <div>
    {comments.map((comment, i) => (
      <button
        key={i}
        style={{ marginInline: 10 }}
        onClick={() => comment.delete()}
      >
        {comment.content}
      </button>
    ))}
  </div>
);

export default withObservables(["comments"], ({ comments }) => ({
  comments,
}))(CommentsList);
