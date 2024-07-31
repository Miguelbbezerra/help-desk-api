import { AppDataSource } from "../../app-data-source.js"
import { UserSchema } from "../../schema/users.js"
import { Validator } from "../../validator/validator.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class LoginController {
    async login(req, res) {
        try {
            const body = req.body

            if (Validator.validateVazio(body.email) || Validator.validateVazio(body.password)) {
                return res.status(400).json({ message: "Algum campo está vazio!" })
            }

            const userRepository = AppDataSource.getRepository(UserSchema)
            const user = await userRepository.findOne({
                where: {
                    email: body.email,
                    active: 1
                }
            })
            const resultCompare = await bcrypt.compare(body.password, user.password)
            if (resultCompare) {
                const Bearer = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: {
                        id: user.id, fullName: user.fullName, email: user.email, level: user.level
                    }
                }, 'secret')
                res.status(200).json({ message: "Usuário Logado", token: Bearer })
            } else {
                res.status(401).json({ message: "Não foi possível realizar login" })
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}