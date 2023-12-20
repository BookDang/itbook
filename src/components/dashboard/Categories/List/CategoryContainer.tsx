'use client'

import Empty from "antd/es/empty"
import { FC, ReactNode, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import CategoryService from "@/services/categoryService"
import EmptyData from "@/components/dashboard/Categories/List/EmptyData"
import Categories from "@/components/dashboard/Categories/List/Categoies"
import { Category as CategoryDB } from "@/types/categorytypes"
import { toggleLoading } from "@/store/features/loading/actions"
import Action from "@/components/dashboard/Categories/Action"

type ContainerCategoriesProp = {}

const CategoryContainer: FC<ContainerCategoriesProp> = (): ReactNode => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [categories, setCategories] = useState<CategoryDB[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = () => {
    CategoryService.getCategories()
      .then((res) => {
        setCategories(res)
      })
      .finally(() => {
        dispatch(toggleLoading(false))
      })
  }

  return (
    <>
      <Action selectedRowKeys={selectedRowKeys} getCategories={getCategories} />
      <div className="wrap-list-categories h-full relative">
        {
          categories?.length === 0 ?
            <EmptyData>
              <Empty />
            </EmptyData> : (
              <Categories categories={categories} getCategories={getCategories} 
                setSelectedRowKeys={setSelectedRowKeys}
                selectedRowKeys={selectedRowKeys}
              />
            )
        }
      </div>
    </>
  )
}

export default CategoryContainer