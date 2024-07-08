import { AppDataSource } from "../../app-data-source.js";
import { TicketSchema } from "../../schema/ticktets.js";

export class ListTicketController {
    async list(req, res) {
        try {
            const queryParams = req.query
            const ticketRepository = AppDataSource.getRepository(TicketSchema)
            const ticket = await ticketRepository.createQueryBuilder('ticket')
            .leftJoinAndSelect("ticket.status", "status")
            .leftJoinAndSelect("ticket.category", "categories")
            .leftJoinAndSelect("ticket.user", "users")
            .where(queryParams)
            .getMany()
            return res.json(ticket)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}