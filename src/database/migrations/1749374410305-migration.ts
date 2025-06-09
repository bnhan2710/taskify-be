import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749374410305 implements MigrationInterface {
    name = 'Migration1749374410305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP COLUMN \`action\``);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD \`type\` enum ('board_updated', 'board_deleted', 'board_closed', 'board_reopened', 'board_member_added', 'board_member_removed', 'list_created', 'list_updated', 'list_deleted', 'card_created', 'card_updated', 'card_deleted', 'checklist_created', 'checklist_deleted', 'checklist_item_checked', 'checklist_item_unchecked') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD \`list_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD CONSTRAINT \`FK_3268046473bf6d1dd5afc564c56\` FOREIGN KEY (\`list_id\`) REFERENCES \`lists\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP FOREIGN KEY \`FK_3268046473bf6d1dd5afc564c56\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP COLUMN \`list_id\``);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD \`action\` varchar(255) NOT NULL`);
    }

}
