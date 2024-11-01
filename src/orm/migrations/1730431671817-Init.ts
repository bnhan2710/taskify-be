import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1730431671817 implements MigrationInterface {
    name = 'Init1730431671817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`checklists\` CHANGE \`dueDate\` \`dueDate\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE \`checklists\` CHANGE \`dueDate\` \`dueDate\` timestamp NOT NULL`);
    }

}
