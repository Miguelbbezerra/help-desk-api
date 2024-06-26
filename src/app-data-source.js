import { DataSource } from "typeorm";
import { UserSchema } from "./schema/users.js";
import { TicketSchema } from "./schema/ticktets.js";
import { ChatSchema } from "./schema/chats.js"
import { CategorySchema } from "./schema/categories.js"
import { AnexosTicketSchema } from "./schema/anexosTickets.js"

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'helpdesk',
    synchronize: true,
    metadataTableName: 'meta_data_custom',
    relationLoadStrategy: 'join',
    logging: true,
    entities: [ UserSchema, TicketSchema, ChatSchema, CategorySchema, AnexosTicketSchema],
    migrations: [],
    subscribers: [],
})