import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1730689598758 implements MigrationInterface {
    name = 'Init1730689598758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachments\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`attachments\` ADD \`cloudinaryUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attachments\` ADD \`cloudinaryPublicId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attachments\` ADD \`uploadAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE \`attachments\` DROP COLUMN \`uploadAt\``);
        await queryRunner.query(`ALTER TABLE \`attachments\` DROP COLUMN \`cloudinaryPublicId\``);
        await queryRunner.query(`ALTER TABLE \`attachments\` DROP COLUMN \`cloudinaryUrl\``);
        await queryRunner.query(`ALTER TABLE \`attachments\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
