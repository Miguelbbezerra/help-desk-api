import { AppDataSource } from "../../app-data-source.js"
import { NotificationSchema } from "../../schema/notifications.js"

export class ListNotificationController {
    async list(req, res) {
        try {
            const queryParams = req.query
            const notificationRepository = AppDataSource.getRepository(NotificationSchema)
            const result = await notificationRepository.createQueryBuilder('notification')
            .where(queryParams)
            .getMany()
            return res.json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}