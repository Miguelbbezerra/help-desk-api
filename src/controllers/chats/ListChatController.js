import { AppDataSource } from "../../app-data-source.js";
import { ChatSchema } from "../../schema/chats.js";

export class ListChatController {
    async list(req, res) {
        try {
            const queryParams = req.query
            const chatRepository = AppDataSource.getRepository(ChatSchema)
            const chat = await chatRepository.createQueryBuilder('chat')
            .leftJoinAndSelect("chat.ticket", "tickets")
            .leftJoinAndSelect("chat.user", "users")
            .where(queryParams)
            .getMany()
            return res.json(chat)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}