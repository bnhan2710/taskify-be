import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1731776743624 implements MigrationInterface {
    name = 'Init1731776743624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`boards\` ADD \`listOrderIds\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`boards\` ADD \`owner_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE \`boards\` ADD CONSTRAINT \`FK_a20a7418b96eda28e1318408472\` FOREIGN KEY (\`owner_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`boards\` DROP FOREIGN KEY \`FK_a20a7418b96eda28e1318408472\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE \`boards\` DROP COLUMN \`owner_id\``);
        await queryRunner.query(`ALTER TABLE \`boards\` DROP COLUMN \`listOrderIds\``);
    }

}
