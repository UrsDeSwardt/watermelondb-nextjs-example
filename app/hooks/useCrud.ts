import { Observable } from "@nozbe/watermelondb/utils/rx";
import { useEffect, useState } from "react";

import { database } from "@/db/database";
import { Post } from "@/db/models";

const defaultPostObservable = new Observable<Post[]>((observer) => {
  observer.next([]);
});

export const useGetPosts = () => {
  const [posts, setPosts] = useState<Observable<Post[]>>(defaultPostObservable);

  useEffect(() => {
    setPosts(database.get<Post>(Post.table).query().observe());
  }, []);

  return posts;
};
