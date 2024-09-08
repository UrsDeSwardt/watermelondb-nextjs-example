import { synchronize } from "@nozbe/watermelondb/sync";
import { useDatabase } from "@nozbe/watermelondb/react";
import { useState } from "react";

const BASE_URL = "http://127.0.0.1:8000/sync";

const useSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const database = useDatabase();

  const sync = async () => {
    setIsSyncing(true);

    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await fetch(
          `${BASE_URL}?last_pulled_at=${lastPulledAt || 0}`
          //   {
          //     method: "GET",
          //   }
        );
        if (!response.ok) {
          throw new Error(await response.text());
        }

        const { changes, timestamp } = await response.json();
        return { changes, timestamp };
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
      //   migrationsEnabledAtVersion: 1,
    });

    setIsSyncing(false);
  };

  return { isSyncing, sync };
};

export default useSync;
