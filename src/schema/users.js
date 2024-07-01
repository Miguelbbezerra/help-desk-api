import { EntitySchema } from "typeorm";

export const UserSchema = new EntitySchema({
    name: "Users",
    tableName: "users",
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        email: {
            type: 'varchar',
            length: 150,
            nullable: false,
            unique: true
        },
        phone: {
            type: 'varchar',
            length: 20,
            nullable: false,
            unique: true
        },
        dateBirth: {
            type: 'date',
            nullable: false
        },
        password: {
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        fullName: {
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        adress: {
            type: 'varchar',
            length: 255,
            nullable: false
        },
        level: {
            type: 'varchar',
            length: 20,
            nullable: false
        },
        createdAt: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP'
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
            inverseSide: 'users'
        },
    }
})