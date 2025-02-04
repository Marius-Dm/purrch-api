import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAttachmentTable1732018197222 implements MigrationInterface {
  name = 'AddAttachmentTable1732018197222';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "attachments"
                             (
                                 "id"         uuid                  NOT NULL DEFAULT uuid_generate_v4(),
                                 "message_id" uuid                  NOT NULL,
                                 "file_url"   text                  NOT NULL,
                                 "file_type"  character varying(50) NOT NULL,
                                 "created_at" TIMESTAMP             NOT NULL DEFAULT now(),
                                 "deleted_at" TIMESTAMP,
                                 CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "attachments"
        ADD CONSTRAINT "FK_623e10eec51ada466c5038979e3" FOREIGN KEY ("message_id") REFERENCES "messages" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "attachments"
        DROP CONSTRAINT "FK_623e10eec51ada466c5038979e3"`);
    await queryRunner.query(`DROP TABLE "attachments"`);
  }

}
