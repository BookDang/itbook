'use client'

import { useRouter } from 'next/navigation'
import { PlusOutlined } from "@ant-design/icons"
import Button from "antd/es/button"
import { FC } from "react"
import { useActivePath } from '@/hooks/useActivePath'

type ActionProps = {}
const Action: FC<ActionProps> = () => {
  const router = useRouter()
  const checkActivePath = useActivePath()
  const href = '/dashboard/categories/form'
  return (
    <div className="flex gap-5 justify-end fixed right-4 w-fit">
      <Button shape="circle" icon={<PlusOutlined />}
        onClick={() => router.push(href)}
        className={`border-0 bg-transparent shadow-none ${checkActivePath(href) ? '' : 'hover:rotate-90 hover:border'}`}
        disabled={checkActivePath(href)}
      />
    </div>
  )
}

export default Action