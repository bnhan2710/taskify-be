import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736344456971 implements MigrationInterface {
  name = 'Migration1736344456971';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`boards\` ADD \`type\` varchar(255) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`,
    );
    await queryRunner.query(`ALTER TABLE \`boards\` DROP COLUMN \`type\``);
  }
}
