import { Modules } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { CreateNotificationDTO, INotificationModuleService } from "@medusajs/framework/types"

export const sendNotificationStep = createStep(
    "send-notification",
    async (data: CreateNotificationDTO[], { container }) => {
        const notificationModuleService = container.resolve(
            Modules.NOTIFICATION
        ) as INotificationModuleService
        const notification = await notificationModuleService.createNotifications(data)
        return new StepResponse(notification)
    }
)
