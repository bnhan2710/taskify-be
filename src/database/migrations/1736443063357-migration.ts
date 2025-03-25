import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736443063357 implements MigrationInterface {
    name = 'Migration1736443063357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`fullName\` \`displayName\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`displayName\` \`fullName\` varchar(50) NULL`);
    }

}
