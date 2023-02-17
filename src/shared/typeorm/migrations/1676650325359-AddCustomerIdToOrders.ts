import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCustomerIdToOrders1676650325359 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'customer_id',
                type: 'uuid',
                isNullable: true //Para clientes que nao existem mais
            })
        )

        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                name: 'OrdersCustomer',
                columnNames: ['customer_id'],
                referencedTableName: 'customers',
                referencedColumnNames: ['id'],
                onDelete:'SET NULL' //Ao remover um cliente, seu id fica nulo
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'OrdersCustomer');
        await queryRunner.dropColumn('orders', 'customer_id');
    }

}
