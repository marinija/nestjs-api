import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsernameToUsers1694436065053 implements MigrationInterface {
  name = 'AddUsernameToUsers1694436065053';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
  }
}
