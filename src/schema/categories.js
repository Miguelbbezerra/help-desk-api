import { EntitySchema } from "typeorm";

export const CategorySchema = new EntitySchema({
    name: "Categories",
    tableName: "categories",
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        category: {
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
            inverseSide: 'category'
        }
    }
})