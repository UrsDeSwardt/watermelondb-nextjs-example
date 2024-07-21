import { Model, Query } from "@nozbe/watermelondb";
import type { Associations } from "@nozbe/watermelondb/Model";
import {
  field,
  text,
  date,
  readonly,
  children,
  writer,
} from "@nozbe/watermelondb/decorators";

export class Post extends Model {
  static table = "posts";
  static associations: Associations = {
    comments: { type: "has_many", foreignKey: "post_id" },
  };

  @text("title") title!: string;
  @text("subtitle") subtitle?: string;
  @text("body") body!: string;

  @readonly @date("created_at") createdAt?: Date;
  @readonly @date("updated_at") updatedAt?: Date;

  @children("comments") comments!: Query<Comment>;
}

export class Comment extends Model {
  static table = "comments";
  static associations: Associations = {
    posts: { type: "belongs_to", key: "post_id" },
  };

  @text("body") body!: string;
  @field("is_spam") isSpam!: boolean;

  @writer async markAsSpam() {
    await this.update((comment) => {
      comment.isSpam = true;
    });
  }
}
