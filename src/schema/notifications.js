import { EntitySchema } from "typeorm";

export const NotificationSchema = new EntitySchema({
    name: 'Notifications',
    tableName: 'notifications',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        type: {
            type: 'varchar',
            nullable: false
        },
        viewed: {
            type: 'boolean',
            default: false,

        },
        data: {
            type: 'simple-json',
            nullable: true
        },
        createdAt: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
        }
    }
})