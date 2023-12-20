'use client'

import { useRouter } from 'next/navigation'
import { ClearOutlined, PlusOutlined } from "@ant-design/icons"
import notification from 'antd/es/notification'
import { NotificationType } from '@/types/antdtypes'
import Button from "antd/es/button"
import { FC, useState } from "react"
import { useDispatch } from 'react-redux'
import { useActivePath } from '@/hooks/useActivePath'
import ConfirmModal from '@/components/ConfirmModal'
import { IoWarningOutline } from 'react-icons/io5'
import { toggleLoading } from '@/store/features/loading/actions'
import CategoryService from '@/services/categoryService'
import { openNotification } from "@/helpers/notification.helper"
import { STATUS } from '@/constants/statusContants'

type ActionProps = {
  selectedRowKeys: React.Key[]
  getCategories: () => void
}
const Action: FC<ActionProps> = (props) => {
  const router = useRouter()
  const checkActivePath = useActivePath()
  const href = '/dashboard/categories/form'
  return (
    <div className="flex gap-5 justify-end fixed right-4 top-1.5 w-fit">
      <RemoveAllCategories selectedRowKeys={props.selectedRowKeys} getCategories={props.getCategories} />
      <Button shape="circle" icon={<PlusOutlined />}
        onClick={() => router.push(href)}
        className={`border-0 bg-transparent shadow-none ${checkActivePath(href) ? '' : 'hover:rotate-90 hover:border'}`}
        disabled={checkActivePath(href)}
      />
    </div>
  )
}

export default Action

type RemoveAllCategoriesProps = {
  selectedRowKeys: React.Key[]
  getCategories: () => void
}
const RemoveAllCategories: FC<RemoveAllCategoriesProps> = (props) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [api, contextHolder] = notification.useNotification()

  const onHandleDeletingAll = () => {
    dispatch(toggleLoading(true))
    CategoryService.deleleCategorys(props.selectedRowKeys as number[])
      .then((res) => {
        if (res.count) {
          CategoryService.getCategories()
            .then(() => {
              props.getCategories()
            })
          openNotification(api, '', STATUS.SUCCESS as NotificationType)
        } else {
          openNotification(api, '', STATUS.ERROR as NotificationType)
          dispatch(toggleLoading(false))
        }
      })
  }

  const onShowConfirmModal = () => {
    setIsConfirmModalOpen(true)
  }

  return (<>
    <Button danger shape="circle" icon={<ClearOutlined />}
      className={`border-0 bg-transparent shadow-none -rotate-12 ${!props.selectedRowKeys?.length ? '' : 'hover:rotate-12 hover:border'}`}
      onClick={() => {
        onShowConfirmModal()
      }}
      disabled={!props.selectedRowKeys?.length}
    />
    <ConfirmModal
      isModalOpen={isConfirmModalOpen}
      actionParams={''}
      actionMethod={onHandleDeletingAll}
      setIsConfirmModalOpen={setIsConfirmModalOpen}
      content="Are you sure to delete all categories?"
      title={
        <div className="flex items-center">
          <IoWarningOutline className="text-red-600 w-4 h-4" />
          <span className='ml-1'> Delete all categories</span>
        </div>
      }
    />
  </>)
}