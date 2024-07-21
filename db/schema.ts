import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "posts",
      columns: [
        { name: "title", type: "string" },
        { name: "subtitle", type: "string", isOptional: true },
        { name: "body", type: "string" },
      ],
    }),
    tableSchema({
      name: "comments",
      columns: [
        { name: "body", type: "string" },
        { name: "post_id", type: "string", isIndexed: true },
      ],
    }),
  ],
});
