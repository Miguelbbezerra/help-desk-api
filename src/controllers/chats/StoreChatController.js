import { AppDataSource } from "../../app-data-source.js"
import { ChatSchema } from "../../schema/chats.js"

export class StoreChatController {
    async store(req, res) {
        try {
            const body = req.body
            const chatDto = {
                mesage: body.mesage,
                ticketId: body.ticketId
            }
            const chatRepository = AppDataSource.getRepository(ChatSchema)
            const result = await chatRepository.save(chatDto)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}