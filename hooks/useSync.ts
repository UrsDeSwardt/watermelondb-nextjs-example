import {
  synchronize,
  SyncPullArgs,
  SyncPullResult,
} from "@nozbe/watermelondb/sync";
import { useDatabase } from "@nozbe/watermelondb/react";
import { useState } from "react";

const BASE_URL = "http://localhost:8000/sync";

const useSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const database = useDatabase();

  const sync = async () => {
    if (isSyncing) {
      console.info("Sync already in progress");
      return;
    }

    console.info("Syncing...");

    setIsSyncing(true);
    try {
      await synchronize({
        database,
        pullChanges: async ({ lastPulledAt }) => {
          const response = await fetch(
            `${BASE_URL}?last_pulled_at=${lastPulledAt || 0}`
          );

          if (!response.ok) {
            throw new Error(await response.text());
          }

          const { changes, timestamp } = await response.json();
          return { changes, timestamp } as SyncPullResult;
        },
        pushChanges: async ({ changes, lastPulledAt }) => {
          const response = await fetch(
            `${BASE_URL}?last_pulled_at=${lastPulledAt}`,
            {
              method: "POST",
              body: JSON.stringify(changes),
            }
          );
          if (!response.ok) {
            throw new Error(await response.text());
          }
        },
      });
    } catch (e) {
      console.log(e);
    }

    setIsSyncing(false);
  };

  return { isSyncing, sync };
};

export default useSync;
