import { AppDataSource } from "../../app-data-source.js"
import { NotificationSchema } from "../../schema/notifications.js"

export class UpdateNotificationController {
    async update(req, res) {
        try {
            const id = req.params.id
            const body = req.body
            const notificationRepository = AppDataSource.getRepository(NotificationSchema)
            const result = await notificationRepository.update(id, { ...body })
            if (result.affected === 1) {
                const notification = await notificationRepository.find({
                    where: {
                        id: id
                    }
                })
                res.status(201).json(notification)
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}