import { AppDataSource } from "../../app-data-source.js";
import { TicketSchema } from "../../schema/ticktets.js";

export class ListTicketController {
    async list(req, res) {
        try {
            const ticketRepository = AppDataSource.getRepository(TicketSchema)
            const ticket = await ticketRepository.find()
            return res.json(ticket)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}