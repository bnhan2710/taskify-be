import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1732110547848 implements MigrationInterface {
    name = 'Init1732110547848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_e0d58e922daf1775d69a9965ad0\``);
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`cardId\` \`card_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_93d9a3773334ccc328e38cec696\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_93d9a3773334ccc328e38cec696\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`card_id\` \`cardId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_e0d58e922daf1775d69a9965ad0\` FOREIGN KEY (\`cardId\`) REFERENCES \`cards\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
