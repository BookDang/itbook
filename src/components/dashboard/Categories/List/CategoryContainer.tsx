'use client'

import Empty from "antd/es/empty"
import { FC, ReactNode, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CategoryService from "@/services/categoryService"
import EmptyData from "@/components/dashboard/Categories/List/EmptyData"
import Categories from "@/components/dashboard/Categories/List/Categoies"
import { Category as CategoryDB } from "@/types/categorytypes"
import { toggleLoading } from "@/store/features/loading/actions"
import Action from "@/components/dashboard/Categories/Action"
import { AppDispatch, RootState } from "@/store/store"
import { fetchCategories } from "@/store/features/category/actions"

type ContainerCategoriesProp = {}

const CategoryContainer: FC<ContainerCategoriesProp> = (): ReactNode => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const categoriesStore = useSelector((state: RootState) => state.category)

  useEffect(() => {
    dispatch(toggleLoading(true))
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    setTimeout(() => {
      dispatch(toggleLoading(false))
    }, 150);
  }, [categoriesStore])

  return (
    <>
      <Action selectedRowKeys={selectedRowKeys} />
      <div className="wrap-list-categories h-full relative">
        {
          (categoriesStore.categories?.length === 0 || categoriesStore.error) ?
            <EmptyData>
              <Empty />
            </EmptyData> : (
              <Categories categories={categoriesStore.categories}
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