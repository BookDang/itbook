import { STATUS } from "@/constants/statusContants"
import { NotificationInstance } from "antd/es/notification/interface"

export const openNotification = (api: NotificationInstance, message: string, notifiType: string) => {
  const placement = 'topLeft'
  if (notifiType === STATUS.SUCCESS) {
    api.success({
      message,
      placement,
    })
  } else if (notifiType === STATUS.ERROR) {
    api.error({
      message,
      placement,
    })
  }
}