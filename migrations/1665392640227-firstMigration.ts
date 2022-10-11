import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1665392640227 implements MigrationInterface {
    name = 'firstMigration1665392640227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "postId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "PK_cdc670193be6ca43f590dbabcee" PRIMARY KEY ("postId")`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "tags" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "PK_cdc670193be6ca43f590dbabcee"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")`);
    }

}
