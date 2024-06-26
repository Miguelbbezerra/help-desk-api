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
            type: String,
            length: 150,
            nullable: false,
            unique: true
        },
        phone: {
            type: String,
            length: 20,
            nullable: false,
            unique: true
        },
        dateBirth: {
            type: 'date',
            nullable: false
        },
        password: {
            type: String,
            length: 255,
            nullable: false,
        },
        fullName: {
            type: String,
            length: 255,
            nullable: false,
        },
        adress: {
            type: String,
            length: 255,
            nullable: false
        },
        createdAt: {
            type: 'timestamp',
            createDate: true,
            default: () => "CURRENT_TIMESTAMP"
        },
        active: {
            type: 'int',
            nullable: false,
            default: 1
        }
    }
})