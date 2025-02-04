import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTablesForUserPurrsImages1737709860313 implements MigrationInterface {
  name = 'AddTablesForUserPurrsImages1737709860313';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "purrs_image"
                             (
                                 "id"             uuid                   NOT NULL DEFAULT uuid_generate_v4(),
                                 "purr_id"        uuid                   NOT NULL,
                                 "name"           character varying(255) NOT NULL,
                                 "url"            character varying(255) NOT NULL,
                                 "thumbnail_name" character varying(255) NOT NULL,
                                 "thumbnail_url"  character varying(255) NOT NULL,
                                 CONSTRAINT "PK_2ef88ff6b96163632b34be53a3e" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "users_image"
                             (
                                 "id"          uuid                   NOT NULL DEFAULT uuid_generate_v4(),
                                 "user_id"     uuid                   NOT NULL,
                                 "name"        character varying(200) NOT NULL,
                                 "avatar_name" character varying(200) NOT NULL,
                                 "url"         character varying(300) NOT NULL,
                                 "avatar_url"  character varying(300) NOT NULL,
                                 "is_main"     boolean                NOT NULL DEFAULT false,
                                 CONSTRAINT "PK_b1aae736b7c5d6925efa8563527" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "users_cover_image"
                             (
                                 "id"            uuid                   NOT NULL DEFAULT uuid_generate_v4(),
                                 "user_id"       uuid                   NOT NULL,
                                 "name"          character varying(255) NOT NULL,
                                 "url"           character varying(255) NOT NULL,
                                 "avatar_name"   character varying(255) NOT NULL,
                                 "thumbnail_url" character varying(255) NOT NULL,
                                 CONSTRAINT "PK_2fb7d5bcb04e812502e886d2a17" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "purrs"
        DROP COLUMN "orignal_purr_id"`);
    await queryRunner.query(`ALTER TABLE "purrs"
        DROP COLUMN "media_url"`);
    await queryRunner.query(`ALTER TABLE "users"
        DROP COLUMN "profile_image_url"`);
    await queryRunner.query(`ALTER TABLE "users"
        DROP COLUMN "cover_image_url"`);
    await queryRunner.query(`ALTER TABLE "users"
        ADD "is_email_confirmed" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "purrs_image"
        ADD CONSTRAINT "FK_852ca9c279dd8e145fe2cfa3863" FOREIGN KEY ("purr_id") REFERENCES "purrs" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "users_image"
        ADD CONSTRAINT "FK_20d4d19f84b5ffcc7026c2ddf55" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "users_cover_image"
        ADD CONSTRAINT "FK_f4fc88cac0593c10b0bdd0369f7" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users_cover_image"
        DROP CONSTRAINT "FK_f4fc88cac0593c10b0bdd0369f7"`);
    await queryRunner.query(`ALTER TABLE "users_image"
        DROP CONSTRAINT "FK_20d4d19f84b5ffcc7026c2ddf55"`);
    await queryRunner.query(`ALTER TABLE "purrs_image"
        DROP CONSTRAINT "FK_852ca9c279dd8e145fe2cfa3863"`);
    await queryRunner.query(`ALTER TABLE "users"
        DROP COLUMN "is_email_confirmed"`);
    await queryRunner.query(`ALTER TABLE "users"
        ADD "cover_image_url" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "users"
        ADD "profile_image_url" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "purrs"
        ADD "media_url" character varying(255)`);
    await queryRunner.query(`ALTER TABLE "purrs"
        ADD "orignal_purr_id" uuid`);
    await queryRunner.query(`DROP TABLE "users_cover_image"`);
    await queryRunner.query(`DROP TABLE "users_image"`);
    await queryRunner.query(`DROP TABLE "purrs_image"`);
  }

}
