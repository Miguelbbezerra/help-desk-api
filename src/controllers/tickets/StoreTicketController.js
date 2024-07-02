import { AppDataSource } from "../../app-data-source.js"
import { TicketSchema } from "../../schema/ticktets.js"
import { Validator } from "../../validator/validator.js"

export class StoreTicketController {
    async store(req, res) {
        try {
            const body = req.body

            if (Validator.validateVazio(body.title)
                || Validator.validateVazio(body.body)
                || Validator.validateVazio(body.status)
                || Validator.validateVazio(body.userId)
                || Validator.validateVazio(body.categoryId)
            ) {
                return res.status(400).json({ message: "Algum campo está vazio!" })
            }

            const ticketDto = {
                title: body.title,
                body: body.body,
                status: body.status,
                userId: body.userId,
                categoryId: body.categoryId
            }
            const ticketRepository = AppDataSource.getRepository(TicketSchema)
            const result = await ticketRepository.save(ticketDto)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}