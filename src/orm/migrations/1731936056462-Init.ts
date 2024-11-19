import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1731936056462 implements MigrationInterface {
    name = 'Init1731936056462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachments\` CHANGE \`attachName\` \`attachName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`attachments\` CHANGE \`cloudinaryPublicId\` \`cloudinaryPublicId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`attachments\` CHANGE \`fileType\` \`fileType\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE \`attachments\` CHANGE \`fileType\` \`fileType\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attachments\` CHANGE \`cloudinaryPublicId\` \`cloudinaryPublicId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`attachments\` CHANGE \`attachName\` \`attachName\` varchar(255) NOT NULL`);
    }

}
