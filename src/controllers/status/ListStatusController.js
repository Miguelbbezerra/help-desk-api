import { AppDataSource } from "../../app-data-source.js"
import { StatusSchema } from "../../schema/status.js"

export class ListStatusController {
    async list(req, res) {
        try {
            const queryParams = req.query
            const statusRepository = AppDataSource.getRepository(StatusSchema)
            const status = await statusRepository.createQueryBuilder('status')
            .where(queryParams)
            .getMany()
            return res.json(status)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}