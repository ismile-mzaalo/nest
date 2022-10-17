import { MigrationInterface, QueryRunner } from "typeorm";

export class Post1665730347672 implements MigrationInterface {
    name = 'Post1665730347672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "id" TO "postId"`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" TO "PK_cdc670193be6ca43f590dbabcee"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" RENAME CONSTRAINT "PK_cdc670193be6ca43f590dbabcee" TO "PK_2829ac61eff60fcec60d7274b9e"`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "postId" TO "id"`);
    }

}
