import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserTableAndCreateSessionTable1775123709860 implements MigrationInterface {
    name = 'AlterUserTableAndCreateSessionTable1775123709860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userUserId" uuid NOT NULL, "companyCompanyId" uuid NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_576572ccc423bf023f4d6c164d" ON "session" ("userUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc5807fce9706b75185def6f79" ON "session" ("companyCompanyId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_65d72a4b8a5fcdad6edee8563b0"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "uq_user_email_company" UNIQUE ("user_email", "company_id")`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_576572ccc423bf023f4d6c164d9" FOREIGN KEY ("userUserId") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_dc5807fce9706b75185def6f795" FOREIGN KEY ("companyCompanyId") REFERENCES "company"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_dc5807fce9706b75185def6f795"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_576572ccc423bf023f4d6c164d9"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "uq_user_email_company"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_65d72a4b8a5fcdad6edee8563b0" UNIQUE ("user_email")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc5807fce9706b75185def6f79"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_576572ccc423bf023f4d6c164d"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
