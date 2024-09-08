import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "posts",
      columns: [
        { name: "title", type: "string" },
        { name: "subtitle", type: "string", isOptional: true },
        { name: "content", type: "string" },
      ],
    }),
    tableSchema({
      name: "comments",
      columns: [
        { name: "content", type: "string" },
        { name: "post_id", type: "string", isIndexed: true },
      ],
    }),
  ],
});
