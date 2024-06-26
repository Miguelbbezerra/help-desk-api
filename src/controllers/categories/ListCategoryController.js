import { AppDataSource } from "../../app-data-source.js"
import { CategorySchema } from "../../schema/categories.js"

export class ListCategoryController {
    async list(req, res) {
        try {
            const categoryRepository = AppDataSource.getRepository(CategorySchema)
            const category = await categoryRepository.find()
            return res.json(category)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}