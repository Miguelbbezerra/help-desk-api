import { AppDataSource } from "../../app-data-source.js"
import { ChatSchema } from "../../schema/chats.js"
import { Validator } from "../../validator/validator.js"

export class StoreChatController {
    async store(req, res) {
        try {
            const body = req.body

            if (Validator.validateVazio(body.message)
                || Validator.validateVazio(body.ticketId)
                || Validator.validateVazio(body.userId)
            ) {
                return res.status(400).json({ message: "Algum campo está vazio!" })
            }
            
            const chatDto = {
                message: body.message,
                ticketId: body.ticketId,
                userId: body.userId
            }
            const chatRepository = AppDataSource.getRepository(ChatSchema)
            const result = await chatRepository.save(chatDto)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}