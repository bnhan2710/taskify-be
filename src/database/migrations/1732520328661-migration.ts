import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1732520328661 implements MigrationInterface {
  name = 'Migration1732520328661';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`activity_logs\` DROP FOREIGN KEY \`FK_2ad3edecce5e2a5b737705381a9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`activity_logs\` DROP FOREIGN KEY \`FK_e6d0e84bad894d929e1c66d1d1c\``,
    );
    await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP COLUMN \`description\``);
    await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP COLUMN \`boardId\``);
    await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP COLUMN \`cardId\``);
    await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD \`action\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD \`board_id\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD \`card_id\` varchar(36) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`activity_logs\` ADD CONSTRAINT \`FK_4f71ed80744bfcecc70e685b0f6\` FOREIGN KEY (\`board_id\`) REFERENCES \`boards\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`activity_logs\` ADD CONSTRAINT \`FK_bb058e807a55be27c7ede7a385a\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`activity_logs\` DROP FOREIGN KEY \`FK_bb058e807a55be27c7ede7a385a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`activity_logs\` DROP FOREIGN KEY \`FK_4f71ed80744bfcecc70e685b0f6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`,
    );
    await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP COLUMN \`card_id\``);
    await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP COLUMN \`board_id\``);
    await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP COLUMN \`action\``);
    await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD \`cardId\` varchar(36) NULL`);
    await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD \`boardId\` varchar(36) NULL`);
    await queryRunner.query(
      `ALTER TABLE \`activity_logs\` ADD \`description\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`activity_logs\` ADD CONSTRAINT \`FK_e6d0e84bad894d929e1c66d1d1c\` FOREIGN KEY (\`boardId\`) REFERENCES \`boards\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`activity_logs\` ADD CONSTRAINT \`FK_2ad3edecce5e2a5b737705381a9\` FOREIGN KEY (\`cardId\`) REFERENCES \`cards\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
