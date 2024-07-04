import { AppDataSource } from "../../app-data-source.js"
import { StatusSchema } from "../../schema/status.js"
import { Validator } from "../../validator/validator.js"

export class StoreStatusController {
    async store(req, res) {
        try {
            const body = req.body
            if (Validator.validateVazio(body.status)
            ) {
                return res.status(400).json({ message: "Algum campo está vazio!" })
            }
            const statusDto = {
                status: body.status,
            }
            const statusRepository = AppDataSource.getRepository(StatusSchema)
            const result = await statusRepository.save(statusDto)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}