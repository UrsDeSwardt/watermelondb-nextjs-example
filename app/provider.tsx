"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import { Database } from "@nozbe/watermelondb";
import schema from "@/db/schema";
import { Post, Comment } from "@/db/models";
import { DatabaseProvider } from "@nozbe/watermelondb/react";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";

const CustomeDatabaseProvider = ({ children }: PropsWithChildren) => {
  const [database, setDatabase] = useState<Database | null>(null);

  useEffect(() => {
    (async () => {
      const adapter = new LokiJSAdapter({
        useWebWorker: false,
        useIncrementalIndexedDB: true,
        dbName: "reab",
        schema,
      });

      const db = new Database({
        adapter,
        modelClasses: [Post, Comment],
      });

      setDatabase(db);
    })();
  }, []);

  return (
    database && (
      <DatabaseProvider database={database}>{children}</DatabaseProvider>
    )
  );
};

export default CustomeDatabaseProvider;
