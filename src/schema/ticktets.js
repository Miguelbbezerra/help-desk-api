import { EntitySchema } from "typeorm";

export const TicketSchema = new EntitySchema({
    name: "Tickets",
    tableName: "tickets",
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        title: {
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        body: {
            type: 'text',
            nullable: false,
        },
        status: {
            type: 'int',
            nullable: false
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
        },
        userId: {
            name: 'userId',
            type: 'int',
            nullable: false
        },
        categoryId: {
            name: 'categoryId',
            type: 'int',
            nullable: false
        },
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'Users',
            JoinColumn: {name:'userId'},
            nullable: false
        },
        status: {
            type: 'many-to-one',
            target: 'Status',
            joinColumn: {name:'status'},
            nullable: false
        },
        category: {
            type: 'many-to-one',
            target: 'Categories',
            joinColumn: {name:'categoryId'},
            nullable: false
        },
        chats: {
            type: 'one-to-many',
            target: 'Chats',
            inverseSide: 'tickets'
        },
        anexosTickets: {
            type: 'one-to-many',
            target: 'AnexosTickets',
            inverseSide: 'tickets'
        },
    }
})