import { ListUserController } from "./controllers/users/ListUserController.js"

export const router = (express) => {
    const router = express.Router()

    // ROTAS DE USUARIO
    router.get('/user', (req, res) => {
        const listUserController = new ListUserController()
        return listUserController.list(req, res)
    })

    return router
}