import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1731934559028 implements MigrationInterface {
    name = 'Init1731934559028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachments\` DROP COLUMN \`cloudinaryUrl\``);
        await queryRunner.query(`ALTER TABLE \`attachments\` DROP COLUMN \`fileName\``);
        await queryRunner.query(`ALTER TABLE \`attachments\` ADD \`attachName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attachments\` ADD \`URL\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attachments\` ADD \`isLink\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE \`attachments\` DROP COLUMN \`isLink\``);
        await queryRunner.query(`ALTER TABLE \`attachments\` DROP COLUMN \`URL\``);
        await queryRunner.query(`ALTER TABLE \`attachments\` DROP COLUMN \`attachName\``);
        await queryRunner.query(`ALTER TABLE \`attachments\` ADD \`fileName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attachments\` ADD \`cloudinaryUrl\` varchar(255) NOT NULL`);
    }

}
