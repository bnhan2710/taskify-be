import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1734012746054 implements MigrationInterface {
  name = 'Migration1734012746054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`card_member\` (\`card_id\` varchar(36) NOT NULL, \`member_id\` varchar(36) NOT NULL, INDEX \`IDX_f266088d7a0a99be601e3eee69\` (\`card_id\`), INDEX \`IDX_23692c5709119e68a84e71c956\` (\`member_id\`), PRIMARY KEY (\`card_id\`, \`member_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'unknown'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`card_member\` ADD CONSTRAINT \`FK_f266088d7a0a99be601e3eee697\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`card_member\` ADD CONSTRAINT \`FK_23692c5709119e68a84e71c9560\` FOREIGN KEY (\`member_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`card_member\` DROP FOREIGN KEY \`FK_23692c5709119e68a84e71c9560\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`card_member\` DROP FOREIGN KEY \`FK_f266088d7a0a99be601e3eee697\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` enum ('Male', 'Female', 'Unknown') NOT NULL DEFAULT 'Unknown'`,
    );
    await queryRunner.query(`DROP INDEX \`IDX_23692c5709119e68a84e71c956\` ON \`card_member\``);
    await queryRunner.query(`DROP INDEX \`IDX_f266088d7a0a99be601e3eee69\` ON \`card_member\``);
    await queryRunner.query(`DROP TABLE \`card_member\``);
  }
}
