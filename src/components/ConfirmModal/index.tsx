'use client'

import Modal from "antd/es/modal/Modal"
import { FC, ReactNode, useEffect, useState } from "react"

type ConfirmModalProp = {
  title?: string | ReactNode
  content?: string | ReactNode
  isModalOpen: boolean
  actionParams: any
  actionMethod: (arg: any) => void
  setIsConfirmModalOpen: (arg: boolean) => void
}

const ConfirmModal: FC<ConfirmModalProp> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(props.isModalOpen)
  }, [props.isModalOpen])

  const handleOK = () => {
    props.actionMethod(props.actionParams)
    props.setIsConfirmModalOpen(false)
  }

  return (
    <>
      <Modal title={props.title} open={isModalOpen}
        onOk={handleOK}
        onCancel={() => props.setIsConfirmModalOpen(false)}
      >
        {props.content}
      </Modal>
    </>
  )
}

export default ConfirmModal