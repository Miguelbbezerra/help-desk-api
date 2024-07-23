import { AppDataSource } from "../../app-data-source.js"
import { CategorySchema } from "../../schema/categories.js"
import { Validator } from "../../validator/validator.js"

export class UpdateCategoryController {
    async update(req, res) {
        try {
            const body = req.body
            const id = req.params.id
            const isActivePresent = body.hasOwnProperty('active')

            if (!isActivePresent) {
                if (Validator.validateVazio(body.category)
                ) {
                    return res.status(400).json({ message: "Algum campo está vazio!" })
                }
            }

            const categoryRepository = AppDataSource.getRepository(CategorySchema)
            const result = await categoryRepository.update(id, body)
            if (result.affected === 1) {
                const category = await categoryRepository.find({
                    where: {
                        id: id
                    }
                })
                return res.status(400).json(category)
            } else {
                res.status(400).json({ message: "Erro ao atualizar a categoria" })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}