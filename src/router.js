///////////////////////////////////// LIST
import { ListAnexosTicketsController } from "./controllers/anexosTickets/ListAnexosTicketsController.js"
import { ListCategoryController } from "./controllers/categories/ListCategoryController.js"
import { ListStatusController } from "./controllers/status/ListStatusController.js"
import { ListChatController } from "./controllers/chats/ListChatController.js"
import { ListTicketController } from "./controllers/tickets/ListTicketController.js"
import { ListUserController } from "./controllers/users/ListUserController.js"
import { ListNotificationController } from "./controllers/notifications/ListNotificationController.js"
///////////////////////////////////// 

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

///////////////////////////////////// LOGIN
import LoginController from "./controllers/login/LoginController.js"
///////////////////////////////////// LOGIN

import auth from "./middleware/auth.js"
import jwt from 'jsonwebtoken'

export const router = (express) => {
    const router = express.Router()

    //LOGIN
    router.post("/login", (req, res) => {
        const loginController = new LoginController()

        return loginController.login(req, res)
    })
    //LOGIN

    //VERIFICAR TOKEN 
    router.post('/validate-token', (req, res) => {
        const token = req.body.token

        if (!token) {
            return res.status(400).json({ valid: false, message: 'Token is required' });
        }
        try {
            const decoded = jwt.verify(token, 'secret')
            return res.json({ valid: true, decoded });
        } catch (error) {
            return res.status(401).json({ valid: false, message: 'Invalid token' });
        }
    })
    //VERIFICAR TOKEN 

    // ROUTES OF USERS
    //LIST
    router.get('/user', auth, (req, res) => {
        const listUserController = new ListUserController()
        return listUserController.list(req, res)
    })

    //STORE
    router.post('/user', auth, (req, res) => {
        const storeUserController = new StoreUserController()
        return storeUserController.store(req, res)
    })

    //UPDATE
    router.put('/user/:id', auth, (req, res) => {
        const updateUserController = new UpdateUserController()
        return updateUserController.update(req, res)
    })

    // ROUTES OF USERS

    // ----------------------------

    // ROUTES OF TICKTES
    //LIST
    router.get('/ticket', auth, (req, res) => {
        const listTicketControler = new ListTicketController()
        return listTicketControler.list(req, res)
    })

    //STORE
    router.post('/ticket', auth, (req, res) => {
        const storeTicketController = new StoreTicketController()
        return storeTicketController.store(req, res)
    })

    //UPDATE
    router.put('/ticket/:id', auth, (req, res) => {
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
    router.get('/category', auth, (req, res) => {
        const listCategoryController = new ListCategoryController()
        return listCategoryController.list(req, res)
    })

    //STORE
    router.post('/category', auth, (req, res) => {
        const storeCategoryController = new StoreCategoryController()
        return storeCategoryController.store(req, res)
    })

    //UPDATE
    router.put('/category/:id', auth, (req, res) => {
        const updateCategoryController = new UpdateCategoryController()
        return updateCategoryController.update(req, res)
    })

    // ROUTES OF CATEGORY

    // ----------------------------

    // ROUTES OF STATUS
    //LIST
    router.get('/status', auth, (req, res) => {
        const listStatusController = new ListStatusController()
        return listStatusController.list(req, res)
    })

    //STORE
    router.post('/status', auth, (req, res) => {
        const storeStatusController = new StoreStatusController()
        return storeStatusController.store(req, res)
    })

    //UPDATE
    router.put('/status/:id', auth, (req, res) => {
        const updateStatusController = new UpdateStatusController()
        return updateStatusController.update(req, res)
    })

    // ROUTES OF Status

    // ----------------------------

    // ROUTES OF ANEXOS TICKETS
    //LIST
    router.get('/anexosticket', auth, (req, res) => {
        const listAnexosTicketsController = new ListAnexosTicketsController()
        return listAnexosTicketsController.list(req, res)
    })

    //STORE
    router.post('/anexosticket', uploadMiddleware, auth, (req, res) => {
        const storeAnexosTicketsController = new StoreAnexosTicketsController()
        return storeAnexosTicketsController.store(req, res)
    })

    //DELETE
    router.put('/anexosticket/:id', auth, (req, res) => {
        const deleteAnexosTicketsController = new DeleteAnexosTicketsController()
        return deleteAnexosTicketsController.delete(req, res)
    })
    // ROUTES OF ANEXOS TICKETS

    // ----------------------------

    // ROUTES OF NOTIFICATION
    router.get('/notification', auth, (req, res) => {
        const listNoticationController = new ListNotificationController()
        return listNoticationController.list(req, res)
    })
    router.post('/notification', auth, (req, res) => {
        const storeNoticationController = new StoreNotificationController()
        return storeNoticationController.store(req, res)
    })
    router.put('/notification/:id', auth, (req, res) => {
        const updateNoticationController = new UpdateNotificationController()
        return updateNoticationController.update(req, res)
    })
    // ROUTES OF NOTIFICATION
    return router
}