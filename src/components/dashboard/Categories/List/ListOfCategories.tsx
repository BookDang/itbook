'use client'

import Empty from "antd/es/empty"
import { ColumnsType } from "antd/es/table"
import { FC, ReactNode, useEffect, useState } from "react"
import type { Category } from '@prisma/client'
import CategoryService from "@/services/categoryService"
import Spin from "antd/es/spin"

type ListOfCategoriesProp = {}

const ListOfCategories: FC<ListOfCategoriesProp> = (): ReactNode => {
  const columns: ColumnsType<Category> = [{}]
  const [categories, setCategories] = useState<Category[] | null>(null)

  useEffect(() => {
    CategoryService.getCategories()
      .then((res) => {
        setCategories(res)
      })
      .finally(() => {

      })
  }, [])

  return (
    <div className="wrap-list-categories h-[calc(100vh_-_80px)] relative">
      {
        categories === null ?
          <EmptyData>
            <Spin size="large" />
          </EmptyData>
          : categories?.length === 0 ?
            <EmptyData>
              <Empty />
            </EmptyData> : ''
      }
    </div>
  )
}

export default ListOfCategories

type EmptyDataProp = {
  children: ReactNode
}
const EmptyData: FC<EmptyDataProp> = ({ children }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  )
}