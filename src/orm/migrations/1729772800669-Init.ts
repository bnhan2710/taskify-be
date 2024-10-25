import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1729772800669 implements MigrationInterface {
    name = 'Init1729772800669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`type\` enum ('refreshToken', 'accessToken', 'resetPassword') NOT NULL, \`expires\` datetime NULL, \`isBlacklisted\` tinyint NOT NULL DEFAULT 0, \`user_id\` int NULL, UNIQUE INDEX \`IDX_6a8ca5961656d13c16c04079dd\` (\`token\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`boards\` ADD \`workspaceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE \`boards\` ADD CONSTRAINT \`FK_f13eef6b2a45019e1df9cfe9963\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspaces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tokens\` ADD CONSTRAINT \`FK_8769073e38c365f315426554ca5\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tokens\` DROP FOREIGN KEY \`FK_8769073e38c365f315426554ca5\``);
        await queryRunner.query(`ALTER TABLE \`boards\` DROP FOREIGN KEY \`FK_f13eef6b2a45019e1df9cfe9963\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE \`boards\` DROP COLUMN \`workspaceId\``);
        await queryRunner.query(`DROP INDEX \`IDX_6a8ca5961656d13c16c04079dd\` ON \`tokens\``);
        await queryRunner.query(`DROP TABLE \`tokens\``);
    }

}
