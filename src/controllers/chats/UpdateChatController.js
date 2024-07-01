import { AppDataSource } from "../../app-data-source.js"
import { ChatSchema } from "../../schema/chats.js"

export class UpdateChatController {
    async update(req, res) {
        try {
            const body = req.body
            const id = req.params.id
            const chatRepository = AppDataSource.getRepository(ChatSchema)
            const result = await chatRepository.update(id, { ...body })
            if (result.affected === 1) {
                const chat = await chatRepository.find({
                    where: {
                        id: id
                    }
                })
                return res.status(201).json(chat)
            } else {
                res.status(400).json({ message: "Erro ao atualizar o chat" })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}