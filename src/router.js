import { ListCategoryController } from "./controllers/categories/ListCategoryController.js"
import { ListChatController } from "./controllers/chats/ListChatController.js"
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

    // ROUTES OF CHATS
    //LIST
    router.get('/chat', (req, res) => {
        const listChatController = new ListChatController()
        return listChatController.list(req, res)
    })

    //STORE

    //UPDATE

    //DELETE

    // ROUTES OF CHATS

    // ----------------------------
    
    // ROUTES OF CATEGORY
    //LIST
    router.get('/category', (req, res) => {
        const listCategoryController = new ListCategoryController()
        return listCategoryController.list(req, res)
    })

    //STORE

    //UPDATE

    //DELETE

    // ROUTES OF CATEGORY

    // ----------------------------

    return router
}