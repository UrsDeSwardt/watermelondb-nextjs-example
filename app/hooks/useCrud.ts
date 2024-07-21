import { Observable } from "@nozbe/watermelondb/utils/rx";
import { useEffect, useState } from "react";
import { Post } from "@/db/models";
import { useDatabase } from "@nozbe/watermelondb/react";

const defaultPostObservable = new Observable<Post[]>((observer) => {
  observer.next([]);
});

export const useGetPosts = () => {
  const database = useDatabase();
  const [posts, setPosts] = useState<Observable<Post[]>>(defaultPostObservable);

  useEffect(() => {
    setPosts(database.get<Post>(Post.table).query().observe());
  }, []);

  return posts;
};
