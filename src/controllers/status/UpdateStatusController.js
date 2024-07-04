import { AppDataSource } from "../../app-data-source.js"
import { StatusSchema } from "../../schema/status.js"
import { Validator } from "../../validator/validator.js"

export class UpdateStatusController {
    async update(req, res) {
        try {
            const body = req.body
            const id = req.params.id

            if (Validator.validateVazio(body.status)
            ) {
                return res.status(400).json({ message: "Algum campo está vazio!" })
            }
            
            const statusRepository = AppDataSource.getRepository(StatusSchema)
            const result = await statusRepository.update(id, { ...body })
            if (result.affected === 1) {
                const status = await statusRepository.find({
                    where: {
                        id: id
                    }
                })
                return res.status(400).json(status)
            } else {
                res.status(400).json({ message: "Erro ao atualizar a status" })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}