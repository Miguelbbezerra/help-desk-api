import { AppDataSource } from "../../app-data-source.js"
import { UserSchema } from "../../schema/users.js"
import bcrypt from 'bcrypt'

export class StoreUserController {
    async store(req, res) {
        try {
            const body = req.body
            const salt = 12
            const hashPassword = await bcrypt.hash(body.password, salt)
            const userDto = {
                email: body.email,
                phone: body.phone,
                dateBirth: body.dateBirth,
                password: hashPassword,
                fullName: body.fullName,
                adress: body.adress,
                level: body.level
            }

            const userRepository = AppDataSource.getRepository(UserSchema)
            const result = await userRepository.save(userDto)
            res.status(201).json(result)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}