"use client"

import { FC, ReactNode } from "react"
import { usePathname } from "next/navigation"
import Breadcrumb from "antd/es/breadcrumb/Breadcrumb"
import Link from "next/link"

type BreadcrumbDashBoardProp = {}
const BreadcrumbDashBoard: FC<BreadcrumbDashBoardProp> = () => {
  const pathUrl = usePathname()
  const pathURLArray = pathUrl.split('/')
  const items: {title: string | ReactNode}[] = []
  pathURLArray.forEach((element, index) => {
    if (element && index > 0) {
      items.push({title: <span className="capitalize">{element}</span>})
    }
  });
  return (
    <Breadcrumb
      items={items}
      className="mb-3"
    />
  )
}

export default BreadcrumbDashBoard