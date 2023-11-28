import { NotificationType } from "@/types/antdtypes"
import { NotificationInstance, NotificationPlacement } from "antd/es/notification/interface"

export const openNotification = (
  api: NotificationInstance, 
  message: string, 
  notifiType: NotificationType
) => {
  const placement: NotificationPlacement = "topRight"
  api[notifiType]({
    message,
    placement,
  })
}
