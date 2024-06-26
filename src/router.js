import { ListTicketController } from "./controllers/tickets/ListTicketController.js"
import { ListUserController } from "./controllers/users/ListUserController.js"

export const router = (express) => {
    const router = express.Router()

    // ROUTES OF USERS
    //LIST
    router.get('/user', (req, res) => {
        const listUserController = new ListUserController()
        return listUserController.list(req, res)
    })

    //STORE

    //UPDATE

    //DELETE

    // ROUTES OF USERS

    // ----------------------------

    // ROUTES OF TICKTES
    //LIST
    router.get('/ticket', (req, res) => {
        const listTicketControler = new ListTicketController()
        return listTicketControler.list(req, res)
    })

    //STORE

    //UPDATE

    //DELETE

    // ROUTES OF TICKTES

    // ----------------------------

    return router
}