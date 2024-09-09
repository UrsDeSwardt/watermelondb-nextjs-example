import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "post",
      columns: [
        { name: "title", type: "string" },
        { name: "content", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "comment",
      columns: [
        { name: "content", type: "string" },
        { name: "post_id", type: "string", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
