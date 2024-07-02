import { AppDataSource } from "../../app-data-source.js"
import { UserSchema } from "../../schema/users.js"
import { Validator } from "../../validator/validator.js"

export class UpdateUserController {
    async update(req, res) {
        try {
            const body = req.body
            const id = req.params.id

            //// VALIDATORS
            if (Validator.validateVazio(body.password)) {
                if (Validator.validateVazio(body.email)
                    || Validator.validateVazio(body.phone)
                    || Validator.validateVazio(body.dateBirth)
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

                if (!Validator.validateData(body.dateBirth)) {
                    return res.status(400).json({ message: "DATA DE NASCIMENTO inválida!" })
                }
            } else {
                if (!Validator.validatePassword(body.password)) {
                    return res.status(400).json({ message: "SENHA inválida!" })
                }

                const salt = 12;
                const hashPassword = await bcrypt.hash(body.senha, salt);
                body.senha = hashPassword;  // Atualiza o campo senha com o hash
            }
            //// VALIDATORS

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