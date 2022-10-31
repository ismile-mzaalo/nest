import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProfile1667035835079 implements MigrationInterface {
    name = 'CreateProfile1667035835079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("profileId" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL, "hobby" text array NOT NULL, CONSTRAINT "PK_61a193410d652adedb69f7ad680" PRIMARY KEY ("profileId"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profileProfileId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_6165464d8ea80b128d7c2cb12db" UNIQUE ("profileProfileId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6165464d8ea80b128d7c2cb12db" FOREIGN KEY ("profileProfileId") REFERENCES "profile"("profileId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6165464d8ea80b128d7c2cb12db"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_6165464d8ea80b128d7c2cb12db"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileProfileId"`);
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
