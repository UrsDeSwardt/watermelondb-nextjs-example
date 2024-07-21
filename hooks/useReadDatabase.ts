import { Observable } from "@nozbe/watermelondb/utils/rx";
import { useEffect, useState } from "react";
import { Post, Comment } from "@/db/models";
import { useDatabase } from "@nozbe/watermelondb/react";
import { Q } from "@nozbe/watermelondb";

const defaultObservable = <T>(): Observable<T[]> =>
  new Observable<T[]>((observer) => {
    observer.next([]);
  });

export const useGetPosts = () => {
  const database = useDatabase();
  const [posts, setPosts] = useState<Observable<Post[]>>(defaultObservable);

  useEffect(() => {
    setPosts(database.get<Post>(Post.table).query().observe());
  }, [database]);

  return posts;
};
export const useGetComments = (postId: string) => {
  const database = useDatabase();
  const [comments, setComments] =
    useState<Observable<Comment[]>>(defaultObservable);

  useEffect(() => {
    setComments(
      database
        .get<Comment>(Comment.table)
        .query(Q.where("post_id", postId))
        .observe()
    );
  }, [database, postId]);

  return comments;
};
