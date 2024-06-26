import { AppDataSource } from "../../app-data-source.js"
import { UserSchema } from "../../schema/users.js"

export class ListUserController {
    async list(req, res) {
        try {
            const userRepository = AppDataSource.getRepository(UserSchema)
            const user = await userRepository.find()
            return res.json(user)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}