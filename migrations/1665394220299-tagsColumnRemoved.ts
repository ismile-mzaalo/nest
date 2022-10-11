import { MigrationInterface, QueryRunner } from "typeorm";

export class tagsColumnRemoved1665394220299 implements MigrationInterface {
    name = 'tagsColumnRemoved1665394220299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "tags"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "tags" character varying`);
    }

}
