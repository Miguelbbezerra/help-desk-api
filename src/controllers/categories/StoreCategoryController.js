import { AppDataSource } from "../../app-data-source.js"
import { CategorySchema } from "../../schema/categories.js"

export class StoreCategoryController {
    async store(req, res) {
        try {
            const body = req.body
            const categoryDto = {
                category: body.category,
            }
            const categoryRepository = AppDataSource.getRepository(CategorySchema)
            const result = await categoryRepository.save(categoryDto)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}