import { MigrationInterface, QueryRunner } from "typeorm";

export class profileId1667207412207 implements MigrationInterface {
    name = 'profileId1667207412207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6165464d8ea80b128d7c2cb12db"`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "profileId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME CONSTRAINT "PK_61a193410d652adedb69f7ad680" TO "PK_3dd8bfc97e4a77c70971591bdcb"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "profileProfileId" TO "profileId"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_6165464d8ea80b128d7c2cb12db" TO "UQ_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_b1bda35cdb9a2c1b777f5541d87" TO "UQ_6165464d8ea80b128d7c2cb12db"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "profileId" TO "profileProfileId"`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" TO "PK_61a193410d652adedb69f7ad680"`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "id" TO "profileId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6165464d8ea80b128d7c2cb12db" FOREIGN KEY ("profileProfileId") REFERENCES "profile"("profileId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
