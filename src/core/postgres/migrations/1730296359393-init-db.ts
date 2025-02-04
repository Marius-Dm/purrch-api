import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1730296359393 implements MigrationInterface {
  name = 'InitDb1730296359393';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hashtags"
       (
           "id"  uuid                   NOT NULL DEFAULT uuid_generate_v4(),
           "tag" character varying(100) NOT NULL,
           CONSTRAINT "UQ_0b4ef8e83392129fb3373fdb3af" UNIQUE ("tag"),
           CONSTRAINT "PK_994c5bf9151587560db430018c5" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `CREATE TABLE "purr_hashtags"
       (
           "purr_id"    uuid NOT NULL,
           "hashtag_id" uuid NOT NULL,
           CONSTRAINT "PK_fc2d358da2453b15f42091741f4" PRIMARY KEY ("purr_id", "hashtag_id")
       )`,
    );
    await queryRunner.query(
      `CREATE TABLE "purrs_likes"
       (
           "id"       uuid      NOT NULL DEFAULT uuid_generate_v4(),
           "user_id"  uuid      NOT NULL,
           "purr_id"  uuid      NOT NULL,
           "liked_at" TIMESTAMP NOT NULL DEFAULT now(),
           CONSTRAINT "PK_1d7e80f9d65fff669891687ebe1" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `CREATE TABLE "messages"
       (
           "id"          uuid      NOT NULL DEFAULT uuid_generate_v4(),
           "sent_at"     TIMESTAMP NOT NULL DEFAULT now(),
           "updated_at"  TIMESTAMP NOT NULL DEFAULT now(),
           "deleted_at"  TIMESTAMP,
           "sender_id"   uuid      NOT NULL,
           "receiver_id" uuid      NOT NULL,
           "is_read"     boolean   NOT NULL DEFAULT false,
           "senderId"    uuid,
           "receiverId"  uuid,
           CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."notifications_type_enum" AS ENUM('LIKE', 'COMMENT', 'REPURR', 'NEW_FOLLOWER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "notifications"
       (
           "id"              uuid                               NOT NULL DEFAULT uuid_generate_v4(),
           "created_at"      TIMESTAMP                          NOT NULL DEFAULT now(),
           "deleted_at"      TIMESTAMP,
           "user_id"         uuid                               NOT NULL,
           "related_user_id" uuid                               NOT NULL,
           "purr_id"         uuid,
           "message_id"      uuid,
           "type"            "public"."notifications_type_enum" NOT NULL,
           "is_read"         boolean                            NOT NULL DEFAULT false,
           CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `CREATE TABLE "purrs"
       (
           "id"               uuid      NOT NULL DEFAULT uuid_generate_v4(),
           "created_at"       TIMESTAMP NOT NULL DEFAULT now(),
           "updated_at"       TIMESTAMP NOT NULL DEFAULT now(),
           "deleted_at"       TIMESTAMP,
           "user_id"          uuid      NOT NULL,
           "orignal_purr_id"  uuid,
           "content"          text,
           "media_url"        character varying(255),
           "original_purr_id" uuid,
           CONSTRAINT "PK_da5218d42af2f69a71f78c141b0" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `CREATE TABLE "followers"
       (
           "follower_id" uuid      NOT NULL,
           "followed_at" TIMESTAMP NOT NULL DEFAULT now(),
           "followed_id" uuid      NOT NULL,
           CONSTRAINT "PK_2acb62ccefb9b3c638b744b5461" PRIMARY KEY ("follower_id", "followed_id")
       )`,
    );
    await queryRunner.query(
      `CREATE TABLE "users"
       (
           "id"                uuid                   NOT NULL DEFAULT uuid_generate_v4(),
           "created_at"        TIMESTAMP              NOT NULL DEFAULT now(),
           "updated_at"        TIMESTAMP              NOT NULL DEFAULT now(),
           "deleted_at"        TIMESTAMP,
           "username"          character varying(50)  NOT NULL,
           "display_name"      character varying(50)  NOT NULL,
           "birth_date"        date                   NOT NULL,
           "email"             character varying(100) NOT NULL,
           "password"          character varying(255) NOT NULL,
           "bio"               text,
           "profile_image_url" character varying(255),
           "cover_image_url"   character varying(255),
           CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
           CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
           CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `ALTER TABLE "purr_hashtags"
          ADD CONSTRAINT "FK_df9cd3e3ca09b8a38e589f48fb5" FOREIGN KEY ("hashtag_id") REFERENCES "hashtags" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purr_hashtags"
          ADD CONSTRAINT "FK_3a9e40b8676f5296c98ae9d198f" FOREIGN KEY ("purr_id") REFERENCES "purrs" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purrs_likes"
          ADD CONSTRAINT "FK_ac971ea8a0a800b132fdf8da48a" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purrs_likes"
          ADD CONSTRAINT "FK_2902007e0cbef39bdfed3db1d80" FOREIGN KEY ("purr_id") REFERENCES "purrs" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages"
          ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages"
          ADD CONSTRAINT "FK_acf951a58e3b9611dd96ce89042" FOREIGN KEY ("receiverId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications"
          ADD CONSTRAINT "FK_9a8a82462cab47c73d25f49261f" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications"
          ADD CONSTRAINT "FK_e9e4444e24f0577125255c492a2" FOREIGN KEY ("related_user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications"
          ADD CONSTRAINT "FK_da9256150a60f161d8000b1e19c" FOREIGN KEY ("purr_id") REFERENCES "purrs" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications"
          ADD CONSTRAINT "FK_14569f8a49ebb2ed92e9f8ba01c" FOREIGN KEY ("message_id") REFERENCES "messages" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purrs"
          ADD CONSTRAINT "FK_a86b425879848435467ac7bdd26" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purrs"
          ADD CONSTRAINT "FK_ee64a2089e3da5d1d7732465642" FOREIGN KEY ("original_purr_id") REFERENCES "purrs" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "followers"
          ADD CONSTRAINT "FK_e11d02e2a1197cfb61759da5a87" FOREIGN KEY ("follower_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "followers"
          ADD CONSTRAINT "FK_c1b303b5d04e9978ab52f46005a" FOREIGN KEY ("followed_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "followers"
          DROP CONSTRAINT "FK_c1b303b5d04e9978ab52f46005a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "followers"
          DROP CONSTRAINT "FK_e11d02e2a1197cfb61759da5a87"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purrs"
          DROP CONSTRAINT "FK_ee64a2089e3da5d1d7732465642"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purrs"
          DROP CONSTRAINT "FK_a86b425879848435467ac7bdd26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications"
          DROP CONSTRAINT "FK_14569f8a49ebb2ed92e9f8ba01c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications"
          DROP CONSTRAINT "FK_da9256150a60f161d8000b1e19c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications"
          DROP CONSTRAINT "FK_e9e4444e24f0577125255c492a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notifications"
          DROP CONSTRAINT "FK_9a8a82462cab47c73d25f49261f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages"
          DROP CONSTRAINT "FK_acf951a58e3b9611dd96ce89042"`,
    );
    await queryRunner.query(
      `ALTER TABLE "messages"
          DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purrs_likes"
          DROP CONSTRAINT "FK_2902007e0cbef39bdfed3db1d80"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purrs_likes"
          DROP CONSTRAINT "FK_ac971ea8a0a800b132fdf8da48a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purr_hashtags"
          DROP CONSTRAINT "FK_3a9e40b8676f5296c98ae9d198f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purr_hashtags"
          DROP CONSTRAINT "FK_df9cd3e3ca09b8a38e589f48fb5"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "followers"`);
    await queryRunner.query(`DROP TABLE "purrs"`);
    await queryRunner.query(`DROP TABLE "notifications"`);
    await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(`DROP TABLE "purrs_likes"`);
    await queryRunner.query(`DROP TABLE "purr_hashtags"`);
    await queryRunner.query(`DROP TABLE "hashtags"`);
  }
}
