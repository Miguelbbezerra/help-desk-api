///////////////////////////////////// LIST
import { ListAnexosTicketsController } from "./controllers/anexosTickets/ListAnexosTicketsController.js"
import { ListCategoryController } from "./controllers/categories/ListCategoryController.js"
import { ListChatController } from "./controllers/chats/ListChatController.js"
import { ListTicketController } from "./controllers/tickets/ListTicketController.js"
import { ListUserController } from "./controllers/users/ListUserController.js"
///////////////////////////////////// LIST
import { StoreTicketController } from "./controllers/tickets/StoreTicketController.js"
import { StoreUserController } from "./controllers/users/StoreUserController.js"
import { StoreCategoryController } from "./controllers/categories/StoreCategoryController.js"
import { StoreChatController } from "./controllers/chats/StoreChatController.js"
import { StoreAnexosTicketsController, uploadMiddleware } from "./controllers/anexosTickets/StoreAnexosTicketsController.js"

export const router = (express) => {
    const router = express.Router()

    // ROUTES OF USERS
    //LIST
    router.get('/user', (req, res) => {
        const listUserController = new ListUserController()
        return listUserController.list(req, res)
    })

    //STORE
    router.post('/user', (req, res) => {
        const storeUserController = new StoreUserController()
        return storeUserController.store(req, res)
    })

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
    router.post('/ticket', (req, res) => {
        const storeTicketController = new StoreTicketController()
        return storeTicketController.store(req, res)
    })

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
    router.post('/chat', (req, res) => {
        const storeChatController = new StoreChatController()
        return storeChatController.store(req, res)
    })

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
    router.post('/category', (req, res) => {
        const storeCategoryController = new StoreCategoryController()
        return storeCategoryController.store(req, res)
    })

    //UPDATE

    //DELETE

    // ROUTES OF CATEGORY

    // ----------------------------

    // ROUTES OF ANEXOS TICKETS
    //LIST
    router.get('/anexosticket', (req, res) => {
        const listAnexosTicketsController = new ListAnexosTicketsController()
        return listAnexosTicketsController.list(req, res)
    })

    //STORE
    router.post('/anexosticket', uploadMiddleware, (req, res) => {
        const storeAnexosTicketsController = new StoreAnexosTicketsController()
        return storeAnexosTicketsController.store(req, res)
    })

    //DELETE

    // ROUTES OF ANEXOS TICKETS

    // ----------------------------

    return router
}