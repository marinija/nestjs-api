import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1694099575324 implements MigrationInterface {
  name = 'SeedDb1694099575324';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nesjs')`,
    );

    await queryRunner.query(
      // password is 123
      `INSERT INTO (username, email, password) VALUES ('davor', 'davor@gmail.com', '$2b$10$equ/ruzTWVjg3QnWhQvmqeTicqxDIBDEgjYeZyniL1BwFZGdyrT5G')`,
    );

    await queryRunner.query(
      `INSERT INTO (slug, title, description, body, "tagList", "authodId") VALUES ('first-article', 'First Article', 'First article description', 'First article body', 'coffee,dragons', '2'), ('second-article', 'First Article 1', 'First article description 1', 'First article body 1', 'coffee,dragons', '2'), ('third-article', 'First Article 2', 'First article description 2', 'First article body 2', 'coffee,dragons', '2')`,
    );
  }

  public async down(): Promise<void> {}
}
