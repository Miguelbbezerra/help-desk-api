import { AppDataSource } from "../../app-data-source.js"
import { TicketSchema } from "../../schema/ticktets.js"

export class StoreTicketController {
    async store(req, res) {
        try {
            const body = req.body
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
            res.status(500).json({message: error.message})
        }
    }
}