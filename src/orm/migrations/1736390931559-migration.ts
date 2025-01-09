import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736390931559 implements MigrationInterface {
    name = 'Migration1736390931559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`cover\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`cover\``);
    }

}