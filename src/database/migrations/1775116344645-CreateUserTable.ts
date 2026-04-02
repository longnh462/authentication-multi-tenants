import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1775116344645 implements MigrationInterface {
    name = 'CreateUserTable1775116344645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "user_email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_65d72a4b8a5fcdad6edee8563b0" UNIQUE ("user_email")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "hashed_password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "first_login" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_active" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "company_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9e70b5f9d7095018e86970c7874" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9e70b5f9d7095018e86970c7874"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "company_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_login"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hashed_password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_65d72a4b8a5fcdad6edee8563b0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_email"`);
    }

}
