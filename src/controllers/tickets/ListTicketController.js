import { AppDataSource } from "../../app-data-source.js";
import { TicketSchema } from "../../schema/ticktets.js";

export class ListTicketController {
    async list(req, res) {
        try {
            const { search, ...queryParams } = req.query
            const ticketRepository = AppDataSource.getRepository(TicketSchema)
            let queryBuilder = ticketRepository.createQueryBuilder('ticket')
                .leftJoinAndSelect("ticket.status", "status")
                .leftJoinAndSelect("ticket.category", "categories")
                .leftJoinAndSelect("ticket.user", "users")
                .orderBy('ticket.id', 'DESC')
            if (search && search !== "" && search !== null) {
                queryBuilder = queryBuilder.where(
                    `ticket.title LIKE :search OR ticket.body LIKE :search OR status.status LIKE :search OR categories.category LIKE :search`,
                    { search: `%${search}%` }
                );
            }

            for (const [key, value] of Object.entries(queryParams)) {
                if (value !== undefined && value !== null && value !== '') {
                    queryBuilder = queryBuilder.andWhere(`ticket.${key} = :${key}`, { [key]: value });
                }
            }

            const ticket = await queryBuilder.getMany()
            return res.json(ticket)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}