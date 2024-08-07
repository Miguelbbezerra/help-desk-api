import { DataSource } from "typeorm";
import { UserSchema } from "./schema/users.js";
import { TicketSchema } from "./schema/ticktets.js";
import { ChatSchema } from "./schema/chats.js"
import { CategorySchema } from "./schema/categories.js"
import { AnexosTicketSchema } from "./schema/anexosTickets.js"
import { StatusSchema } from "./schema/status.js";
import { NotificationSchema } from "./schema/notifications.js";

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
    entities: [
        UserSchema,
        TicketSchema,
        ChatSchema,
        CategorySchema,
        StatusSchema,
        AnexosTicketSchema,
        NotificationSchema
    ],
    migrations: [],
    subscribers: [],
})


