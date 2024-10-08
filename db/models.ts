import { Model, Query } from "@nozbe/watermelondb";
import type { Associations } from "@nozbe/watermelondb/Model";
import {
  field,
  text,
  date,
  readonly,
  children,
  writer,
  relation,
} from "@nozbe/watermelondb/decorators";

export class Post extends Model {
  static table = "post";
  static associations: Associations = {
    comments: { type: "has_many", foreignKey: "post_id" },
  };

  @text("title") title!: string;
  @text("content") content!: string;

  @readonly @date("created_at") createdAt?: Date;
  @readonly @date("updated_at") updatedAt?: Date;

  @children("comment") comments!: Query<Comment>;

  @writer async delete() {
    await this.markAsDeleted();
  }
}

export class Comment extends Model {
  static table = "comment";
  static associations: Associations = {
    post: { type: "belongs_to", key: "post_id" },
  };

  @text("content") content!: string;
  @field("is_spam") isSpam!: boolean;

  @readonly @date("created_at") createdAt?: Date;
  @readonly @date("updated_at") updatedAt?: Date;

  @relation("post", "post_id") post!: any;

  @writer async markAsSpam() {
    await this.update((comment) => {
      comment.isSpam = true;
    });
  }

  @writer async delete() {
    await this.markAsDeleted();
  }
}
