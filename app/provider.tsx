"use client";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Database } from "@nozbe/watermelondb";
// import { database } from "./db/database";

// import { Database } from "@nozbe/watermelondb";
// import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import schema from "@/db/schema";
import { Post, Comment } from "@/db/models";
import { DatabaseProvider } from "@nozbe/watermelondb/react";

const CustomeDatabaseProvider = ({ children }: PropsWithChildren) => {
  const [db, setDb] = useState<Database | null>(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      const { default: LokiJSAdapter } = await import(
        "@nozbe/watermelondb/adapters/lokijs"
      );

      const adapter = new LokiJSAdapter({
        useWebWorker: false,
        useIncrementalIndexedDB: true,
        dbName: "reab",
        schema,
      });

      const database = new Database({
        adapter,
        modelClasses: [Post, Comment], // ⬅️ You'll add Models to Watermelon here
      });

      setDb(database);
    };

    initializeDatabase();
  }, []);

  return db ? (
    <DatabaseProvider database={db}>{children}</DatabaseProvider>
  ) : (
    <>loading db</>
  );
};

export default CustomeDatabaseProvider;
