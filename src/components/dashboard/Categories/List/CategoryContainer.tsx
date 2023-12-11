'use client'

import Empty from "antd/es/empty"
import { FC, ReactNode, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import CategoryService from "@/services/categoryService"
import EmptyData from "@/components/dashboard/Categories/List/EmptyData"
import Categories from "@/components/dashboard/Categories/List/Categoies"
import { Category as CategoryDB } from "@/types/categorytypes"
import { toggleLoading } from "@/store/features/loading/actions"

type ContainerCategoriesProp = {}

const CategoryContainer: FC<ContainerCategoriesProp> = (): ReactNode => {
  const [categories, setCategories] = useState<CategoryDB[]>([])
  const dispatch = useDispatch()
  
  useEffect(() => {
    CategoryService.getCategories()
      .then((res) => {
        setCategories(res)
      })
      .finally(() => {
        dispatch(toggleLoading(false))
      })
  }, [])

  return (
    <div className="wrap-list-categories h-full relative">
      {
        categories?.length === 0 ?
          <EmptyData>
            <Empty />
          </EmptyData> : (
            <Categories categories={categories} />
          )
      }
    </div>
  )
}

export default CategoryContainer