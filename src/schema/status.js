import { EntitySchema } from "typeorm";

export const StatusSchema = new EntitySchema({
    name: "Status",
    tableName: "status",
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        status: {
            type: 'varchar',
            length: 50,
            nullable: false,
        },
        createdAt: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP'  // Define também o valor padrão para atualização
        },
        active: {
            type: 'int',
            nullable: false,
            default: 1
        }
    },
    relations: {
        tickets: {
            type: 'one-to-many',
            target: 'Tickets',
            inverseSide: 'status'
        }
    }
})