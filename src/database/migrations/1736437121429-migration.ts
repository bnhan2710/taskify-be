import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736437121429 implements MigrationInterface {
  name = 'Migration1736437121429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`comments\` CHANGE \`text\` \`content\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`comments\` DROP COLUMN \`content\``);
    await queryRunner.query(`ALTER TABLE \`comments\` ADD \`content\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`cover\``);
    await queryRunner.query(`ALTER TABLE \`cards\` ADD \`cover\` text NULL`);
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`,
    );
    await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`cover\``);
    await queryRunner.query(`ALTER TABLE \`cards\` ADD \`cover\` varchar(255) NULL`);
    await queryRunner.query(`ALTER TABLE \`comments\` DROP COLUMN \`content\``);
    await queryRunner.query(`ALTER TABLE \`comments\` ADD \`content\` varchar(255) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`comments\` CHANGE \`content\` \`text\` varchar(255) NOT NULL`,
    );
  }
}
