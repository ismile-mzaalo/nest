import { MigrationInterface, QueryRunner } from "typeorm";

export class secondMigration1665393754954 implements MigrationInterface {
    name = 'secondMigration1665393754954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "postId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME CONSTRAINT "PK_cdc670193be6ca43f590dbabcee" TO "PK_2829ac61eff60fcec60d7274b9e"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" RENAME CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" TO "PK_cdc670193be6ca43f590dbabcee"`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "id" TO "postId"`);
    }

}
