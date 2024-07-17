///////////////////////////////////// LIST
import { ListAnexosTicketsController } from "./controllers/anexosTickets/ListAnexosTicketsController.js"
import { ListCategoryController } from "./controllers/categories/ListCategoryController.js"
import { ListStatusController } from "./controllers/status/ListStatusController.js"
import { ListChatController } from "./controllers/chats/ListChatController.js"
import { ListTicketController } from "./controllers/tickets/ListTicketController.js"
import { ListUserController } from "./controllers/users/ListUserController.js"
import { ListNotificationController } from "./controllers/notifications/ListNotificationController.js"
///////////////////////////////////// LIST
///////////////////////////////////// STORE
import { StoreTicketController } from "./controllers/tickets/StoreTicketController.js"
import { StoreUserController } from "./controllers/users/StoreUserController.js"
import { StoreCategoryController } from "./controllers/categories/StoreCategoryController.js"
import { StoreStatusController } from "./controllers/status/StoreStatusController.js"
import { StoreChatController } from "./controllers/chats/StoreChatController.js"
import { StoreAnexosTicketsController, uploadMiddleware } from "./controllers/anexosTickets/StoreAnexosTicketsController.js"
import { StoreNotificationController } from "./controllers/notifications/StoreNotificationController.js"
///////////////////////////////////// STORE
///////////////////////////////////// UPDATE AND DELETE
import { UpdateUserController } from "./controllers/users/UpdateUserController.js"
import { UpdateTicketController } from "./controllers/tickets/UpdateTicketController.js"
import { UpdateChatController } from "./controllers/chats/UpdateChatController.js"
import { UpdateCategoryController } from "./controllers/categories/UpdateCategoryController.js"
import { UpdateStatusController } from "./controllers/status/UpdateStatusController.js"
import { UpdateNotificationController } from "./controllers/notifications/UpdateNotificationController.js"
import { DeleteAnexosTicketsController } from "./controllers/anexosTickets/DeleteAnexosTicketsController.js"
///////////////////////////////////// UPDATE AND DELETE

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
    router.put('/user/:id', (req, res) => {
        const updateUserController = new UpdateUserController()
        return updateUserController.update(req, res)
    })

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
    router.put('/ticket/:id', (req, res) => {
        const updateTicketController = new UpdateTicketController()
        return updateTicketController.update(req, res)
    })

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
    router.put('/chat/:id', (req, res) => {
        const updateChatController = new UpdateChatController()
        return updateChatController.update(req, res)
    })

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
    router.put('/category/:id', (req, res) => {
        const updateCategoryController = new UpdateCategoryController()
        return updateCategoryController.update(req, res)
    })

    // ROUTES OF CATEGORY

    // ----------------------------

    // ROUTES OF STATUS
    //LIST
    router.get('/status', (req, res) => {
        const listStatusController = new ListStatusController()
        return listStatusController.list(req, res)
    })

    //STORE
    router.post('/status', (req, res) => {
        const storeStatusController = new StoreStatusController()
        return storeStatusController.store(req, res)
    })

    //UPDATE
    router.put('/status/:id', (req, res) => {
        const updateStatusController = new UpdateStatusController()
        return updateStatusController.update(req, res)
    })

    // ROUTES OF Status

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
    router.put('/anexosticket/:id', (req, res) => {
        const deleteAnexosTicketsController = new DeleteAnexosTicketsController()
        return deleteAnexosTicketsController.delete(req, res)
    })
    // ROUTES OF ANEXOS TICKETS

    // ----------------------------

    // ROUTES OF NOTIFICATION
    router.get('/notification', (req, res) => {
        const listNoticationController = new ListNotificationController()
        return listNoticationController.list(req, res)
    })
    router.post('/notification', (req, res) => {
        const storeNoticationController = new StoreNotificationController()
        return storeNoticationController.list(req, res)
    })
    router.put('/notification/:id', (req, res) => {
        const updateNoticationController = new UpdateNotificationController()
        return updateNoticationController.list(req, res)
    })
    // ROUTES OF NOTIFICATION
    return router
}