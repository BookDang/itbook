'use client'

import Empty from "antd/es/empty"
import { FC, ReactNode, useEffect, useState } from "react"
import CategoryService from "@/services/categoryService"
import Spin from "antd/es/spin"
import EmptyData from "@/components/dashboard/Categories/List/EmptyData"
import Categories from "@/components/dashboard/Categories/List/Categoies"
import { Category as CategoryDB } from "@/types/categorytypes"

type ContainerCategoriesProp = {}

const CategoryContainer: FC<ContainerCategoriesProp> = (): ReactNode => {
  const [categories, setCategories] = useState<CategoryDB[] | null>(null)

  useEffect(() => {
    CategoryService.getCategories()
      .then((res) => {
        setCategories(res)
      })
      .finally(() => { })
  }, [])

  return (
    <div className="wrap-list-categories h-full relative">
      {
        categories === null ?
          <EmptyData>
            <Spin size="large" />
          </EmptyData>
          : categories?.length === 0 ?
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