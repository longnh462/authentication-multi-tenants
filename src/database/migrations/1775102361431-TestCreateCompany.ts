import { MigrationInterface, QueryRunner } from "typeorm";

export class TestCreateCompany1775102361431 implements MigrationInterface {
    name = 'TestCreateCompany1775102361431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying, "user_id" uuid NOT NULL, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying, "company_id" uuid NOT NULL, "company_code" character varying NOT NULL, "company_name" character varying NOT NULL, "company_email" character varying NOT NULL, "address" character varying NOT NULL, "phone_number" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_36826616f09507b27f1ff71a6c2" UNIQUE ("company_code"), CONSTRAINT "PK_b7f9888ba8bd654c4860ddfcb3a" PRIMARY KEY ("company_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
