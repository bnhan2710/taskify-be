import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1730378329295 implements MigrationInterface {
    name = 'Init1730378329295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_8e71fba12a609e08cf311fde6d9\``);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`listId\` \`list_id\` int NULL`);
        await queryRunner.query(`CREATE TABLE \`checklists\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`dueDate\` timestamp NOT NULL, \`isDone\` tinyint NOT NULL DEFAULT 0, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`card_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE \`checklists\` ADD CONSTRAINT \`FK_99530035e78ff28767b53f6031f\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_2d636e34938aee366ba98cf1fe9\` FOREIGN KEY (\`list_id\`) REFERENCES \`lists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_2d636e34938aee366ba98cf1fe9\``);
        await queryRunner.query(`ALTER TABLE \`checklists\` DROP FOREIGN KEY \`FK_99530035e78ff28767b53f6031f\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`DROP TABLE \`checklists\``);
        await queryRunner.query(`ALTER TABLE \`cards\` CHANGE \`list_id\` \`listId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_8e71fba12a609e08cf311fde6d9\` FOREIGN KEY (\`listId\`) REFERENCES \`lists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
