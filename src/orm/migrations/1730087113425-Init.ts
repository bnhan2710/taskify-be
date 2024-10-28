import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1730087113425 implements MigrationInterface {
    name = 'Init1730087113425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_48ce552495d14eae9b187bb671\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attachments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fileName\` varchar(255) NOT NULL, \`fileType\` varchar(50) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`cardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`cardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`activity_logs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`boardId\` int NULL, \`cardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cards\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`listId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lists\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`boardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`boards\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`workspaceId\` int NULL, UNIQUE INDEX \`IDX_6b45ec5000153a58830b253ea0\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`type\` enum ('refreshToken', 'accessToken', 'resetPassword') NOT NULL, \`expires\` datetime NULL, \`isBlacklisted\` tinyint NOT NULL DEFAULT 0, \`user_id\` int NULL, UNIQUE INDEX \`IDX_6a8ca5961656d13c16c04079dd\` (\`token\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(100) NOT NULL, \`fullName\` varchar(50) NULL, \`age\` int NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown', \`avatar\` varchar(255) NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspaces\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_permissions\` (\`role_id\` int NOT NULL, \`permission_id\` int NOT NULL, INDEX \`IDX_178199805b901ccd220ab7740e\` (\`role_id\`), INDEX \`IDX_17022daf3f885f7d35423e9971\` (\`permission_id\`), PRIMARY KEY (\`role_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board_users\` (\`board_id\` int NOT NULL, \`user_id\` int NOT NULL, INDEX \`IDX_0a6290ddee553805cef29fe923\` (\`board_id\`), INDEX \`IDX_2c8f2a9119429d5358e608f9c4\` (\`user_id\`), PRIMARY KEY (\`board_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_roles\` (\`user_id\` int NOT NULL, \`role_id\` int NOT NULL, INDEX \`IDX_87b8888186ca9769c960e92687\` (\`user_id\`), INDEX \`IDX_b23c65e50a758245a33ee35fda\` (\`role_id\`), PRIMARY KEY (\`user_id\`, \`role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workspace_users\` (\`workspace_id\` int NOT NULL, \`user_id\` int NOT NULL, INDEX \`IDX_fcf62799ed815343a7703a53f1\` (\`workspace_id\`), INDEX \`IDX_b463ff02bbb1014cd4f2b603be\` (\`user_id\`), PRIMARY KEY (\`workspace_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`attachments\` ADD CONSTRAINT \`FK_51fb93b632faa631184219b3ed7\` FOREIGN KEY (\`cardId\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_e0d58e922daf1775d69a9965ad0\` FOREIGN KEY (\`cardId\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD CONSTRAINT \`FK_597e6df96098895bf19d4b5ea45\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD CONSTRAINT \`FK_e6d0e84bad894d929e1c66d1d1c\` FOREIGN KEY (\`boardId\`) REFERENCES \`boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` ADD CONSTRAINT \`FK_2ad3edecce5e2a5b737705381a9\` FOREIGN KEY (\`cardId\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_8e71fba12a609e08cf311fde6d9\` FOREIGN KEY (\`listId\`) REFERENCES \`lists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lists\` ADD CONSTRAINT \`FK_05460f5df61d54daeaf96c54c00\` FOREIGN KEY (\`boardId\`) REFERENCES \`boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`boards\` ADD CONSTRAINT \`FK_f13eef6b2a45019e1df9cfe9963\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspaces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tokens\` ADD CONSTRAINT \`FK_8769073e38c365f315426554ca5\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspaces\` ADD CONSTRAINT \`FK_78512d762073bf8cb3fc88714c1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_178199805b901ccd220ab7740ec\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` ADD CONSTRAINT \`FK_17022daf3f885f7d35423e9971e\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board_users\` ADD CONSTRAINT \`FK_0a6290ddee553805cef29fe9232\` FOREIGN KEY (\`board_id\`) REFERENCES \`boards\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`board_users\` ADD CONSTRAINT \`FK_2c8f2a9119429d5358e608f9c41\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_87b8888186ca9769c960e926870\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_b23c65e50a758245a33ee35fda1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`workspace_users\` ADD CONSTRAINT \`FK_fcf62799ed815343a7703a53f1b\` FOREIGN KEY (\`workspace_id\`) REFERENCES \`workspaces\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`workspace_users\` ADD CONSTRAINT \`FK_b463ff02bbb1014cd4f2b603be0\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`workspace_users\` DROP FOREIGN KEY \`FK_b463ff02bbb1014cd4f2b603be0\``);
        await queryRunner.query(`ALTER TABLE \`workspace_users\` DROP FOREIGN KEY \`FK_fcf62799ed815343a7703a53f1b\``);
        await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_b23c65e50a758245a33ee35fda1\``);
        await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_87b8888186ca9769c960e926870\``);
        await queryRunner.query(`ALTER TABLE \`board_users\` DROP FOREIGN KEY \`FK_2c8f2a9119429d5358e608f9c41\``);
        await queryRunner.query(`ALTER TABLE \`board_users\` DROP FOREIGN KEY \`FK_0a6290ddee553805cef29fe9232\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_17022daf3f885f7d35423e9971e\``);
        await queryRunner.query(`ALTER TABLE \`role_permissions\` DROP FOREIGN KEY \`FK_178199805b901ccd220ab7740ec\``);
        await queryRunner.query(`ALTER TABLE \`workspaces\` DROP FOREIGN KEY \`FK_78512d762073bf8cb3fc88714c1\``);
        await queryRunner.query(`ALTER TABLE \`tokens\` DROP FOREIGN KEY \`FK_8769073e38c365f315426554ca5\``);
        await queryRunner.query(`ALTER TABLE \`boards\` DROP FOREIGN KEY \`FK_f13eef6b2a45019e1df9cfe9963\``);
        await queryRunner.query(`ALTER TABLE \`lists\` DROP FOREIGN KEY \`FK_05460f5df61d54daeaf96c54c00\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_8e71fba12a609e08cf311fde6d9\``);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP FOREIGN KEY \`FK_2ad3edecce5e2a5b737705381a9\``);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP FOREIGN KEY \`FK_e6d0e84bad894d929e1c66d1d1c\``);
        await queryRunner.query(`ALTER TABLE \`activity_logs\` DROP FOREIGN KEY \`FK_597e6df96098895bf19d4b5ea45\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_e0d58e922daf1775d69a9965ad0\``);
        await queryRunner.query(`ALTER TABLE \`attachments\` DROP FOREIGN KEY \`FK_51fb93b632faa631184219b3ed7\``);
        await queryRunner.query(`DROP INDEX \`IDX_b463ff02bbb1014cd4f2b603be\` ON \`workspace_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fcf62799ed815343a7703a53f1\` ON \`workspace_users\``);
        await queryRunner.query(`DROP TABLE \`workspace_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_b23c65e50a758245a33ee35fda\` ON \`user_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_87b8888186ca9769c960e92687\` ON \`user_roles\``);
        await queryRunner.query(`DROP TABLE \`user_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_2c8f2a9119429d5358e608f9c4\` ON \`board_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a6290ddee553805cef29fe923\` ON \`board_users\``);
        await queryRunner.query(`DROP TABLE \`board_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_17022daf3f885f7d35423e9971\` ON \`role_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_178199805b901ccd220ab7740e\` ON \`role_permissions\``);
        await queryRunner.query(`DROP TABLE \`role_permissions\``);
        await queryRunner.query(`DROP TABLE \`workspaces\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_6a8ca5961656d13c16c04079dd\` ON \`tokens\``);
        await queryRunner.query(`DROP TABLE \`tokens\``);
        await queryRunner.query(`DROP INDEX \`IDX_6b45ec5000153a58830b253ea0\` ON \`boards\``);
        await queryRunner.query(`DROP TABLE \`boards\``);
        await queryRunner.query(`DROP TABLE \`lists\``);
        await queryRunner.query(`DROP TABLE \`cards\``);
        await queryRunner.query(`DROP TABLE \`activity_logs\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP TABLE \`attachments\``);
        await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_48ce552495d14eae9b187bb671\` ON \`permissions\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
    }

}
