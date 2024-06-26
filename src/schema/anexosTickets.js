import { EntitySchema } from "typeorm";

export const AnexosTicketSchema = new EntitySchema({
    name: "AnexosTickets",
    tableName: "anexos_tickets",
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        img: {
            type: 'text',
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
        },
        ticketId: {
            name: 'ticketId',
            type: 'int',
            nullable: false
        }
    },
    relations: {
        ticket: {
            type: 'many-to-one',
            target: 'Tickets',
            JoinColumn: {name:'ticketId'},
            nullable: false
        },
    }
})