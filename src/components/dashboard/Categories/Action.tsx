'use client'

import { useRouter } from 'next/navigation'
import { ClearOutlined, PlusOutlined } from "@ant-design/icons"
import Button from "antd/es/button"
import { FC } from "react"
import { useActivePath } from '@/hooks/useActivePath'

type ActionProps = {
  selectedRowKeys: React.Key[]
}
const Action: FC<ActionProps> = (props) => {
  const router = useRouter()
  const checkActivePath = useActivePath()
  const href = '/dashboard/categories/form'
  return (
    <div className="flex gap-5 justify-end fixed right-4 top-1.5 w-fit">
      <RemoveAllCategories selectedRowKeys={props.selectedRowKeys} />
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
}
const RemoveAllCategories: FC<RemoveAllCategoriesProps> = (props) => {
  return (<>
    <Button danger shape="circle" icon={<ClearOutlined />}
      className={`border-0 bg-transparent shadow-none -rotate-12 ${!props.selectedRowKeys?.length ? '' : 'hover:rotate-12 hover:border'}`}
      onClick={() => {
        console.log('props.selectedRowKeys', props.selectedRowKeys)
      }}
      disabled={!props.selectedRowKeys?.length}
    />
  </>)
}