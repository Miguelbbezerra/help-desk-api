import { AppDataSource } from "../../app-data-source.js"
import { UserSchema } from "../../schema/users.js"
import { Validator } from "../../validator/validator.js"
import bcrypt from 'bcrypt'

export class StoreUserController {
    async store(req, res) {
        try {
            const body = req.body
            const salt = 12
            //// VALIDATORS
            if (Validator.validateVazio(body.email)
                || Validator.validateVazio(body.phone)
                || Validator.validateVazio(body.dateBirth)
                || Validator.validateVazio(body.password)
                || Validator.validateVazio(body.fullName)
                || Validator.validateVazio(body.adress)
                || Validator.validateVazio(body.level)) {
                return res.status(400).json({ message: "Algum campo está vazio!" })
            }

            if (!Validator.validateEmail(body.email)) {
                return res.status(400).json({ message: "EMAIL inválido!" })
            }

            if (!Validator.validatePhoneNumber(body.phone)) {
                return res.status(400).json({ message: "TELEFONE inválido!" })
            }

            if (!Validator.validatePassword(body.password)) {
                return res.status(400).json({ message: "SENHA inválida!" })
            }

            if (!Validator.validateData(body.dateBirth)) {
                return res.status(400).json({ message: "DATA DE NASCIMENTO inválida!" })
            }
            //// VALIDATORS
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
            res.status(500).json({ message: error.message })
        }
    }
}