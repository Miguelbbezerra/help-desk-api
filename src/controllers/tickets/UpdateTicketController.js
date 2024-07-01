import { AppDataSource } from "../../app-data-source.js"
import { TicketSchema } from "../../schema/ticktets.js"

export class UpdateTicketController {
    async update(req, res) {
        try {
            const body = req.body
            const id = req.params.id
            const ticketRepository = AppDataSource.getRepository(TicketSchema)
            const result = await ticketRepository.update(id, { ...body })
            if (result.affected === 1) {
                const ticket = await ticketRepository.find({
                    where: {
                        id: id
                    }
                })
                return res.status(201).json(ticket)
            } else {
                return res.status(400).json({ message: "Erro ao atualizar ticket" })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}