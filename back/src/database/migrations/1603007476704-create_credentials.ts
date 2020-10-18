import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCredentials1603007476704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'credentials',
            columns: [
                {
                    name: "id",
                    type: "integer",
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "username",
                    isUnique: true,
                    type: "text"
                },
                {
                    name: "password",
                    type: "text"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('credentials');
    }
}
