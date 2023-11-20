"use client"

import { FC } from "react"
import CategoryForm from "@/components/dashboard/Books/Form/Category/page"

type CategoryProp = {}

const Category: FC<CategoryProp> = () => {
  return (
    <>
      <div className="border border-solid border-gray-500 rounded p-2 pt-7 add-new-category">
        <CategoryForm />
      </div>
    </>
  )
}

export default Category