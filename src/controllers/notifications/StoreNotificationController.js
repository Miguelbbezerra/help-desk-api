import { AppDataSource } from "../../app-data-source.js"
import { NotificationSchema } from "../../schema/notifications.js"

export class StoreNotificationController {
    async store(req, res) {
        try {
            const body = req.body
            const notificationRepository = AppDataSource.getRepository(NotificationSchema)
            const result = await notificationRepository.save(body)
            return res.status(201).json(result)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}