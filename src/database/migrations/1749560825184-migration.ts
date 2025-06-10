import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749560825184 implements MigrationInterface {
    name = 'Migration1749560825184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP FOREIGN KEY \`FK_3268046473bf6d1dd5afc564c56\``);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP FOREIGN KEY \`FK_bb058e807a55be27c7ede7a385a\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD CONSTRAINT \`FK_3268046473bf6d1dd5afc564c56\` FOREIGN KEY (\`list_id\`) REFERENCES \`lists\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD CONSTRAINT \`FK_bb058e807a55be27c7ede7a385a\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP FOREIGN KEY \`FK_bb058e807a55be27c7ede7a385a\``);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP FOREIGN KEY \`FK_3268046473bf6d1dd5afc564c56\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD CONSTRAINT \`FK_bb058e807a55be27c7ede7a385a\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD CONSTRAINT \`FK_3268046473bf6d1dd5afc564c56\` FOREIGN KEY (\`list_id\`) REFERENCES \`lists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
