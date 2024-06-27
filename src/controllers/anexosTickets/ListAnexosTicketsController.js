import { AppDataSource } from "../../app-data-source.js";
import { AnexosTicketSchema } from "../../schema/anexosTickets.js";

export class ListAnexosTicketsController {
    async list(req, res) {
        try {
            const anexosTicketsRepository = AppDataSource.getRepository(AnexosTicketSchema)
            const anexosTickets = await anexosTicketsRepository.find()
            res.json(anexosTickets)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}