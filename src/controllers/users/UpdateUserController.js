import { AppDataSource } from "../../app-data-source.js"
import { UserSchema } from "../../schema/users.js"

export class UpdateUserController {
    async update(req, res) {
        try {
            const body = req.body
            const id = req.params.id
            const userRepository = AppDataSource.getRepository(UserSchema)
            const result = await userRepository.update(id, { ...body })
            if (result.affected === 1) {
                const user = await userRepository.findOne({
                    where: {
                        id: id,
                    },
                })
                return res.status(201).json(user)
            } else {
                res.status(400).json({ message: "Erro ao atualizar o usuário" })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}