import { FC } from "react"
import CategoryForm from "@/components/dashboard/Categories/Form/page"

export const metadata = {
  title: 'Category | Dashboard',
}

type CategoryProp = {}

const Category: FC<CategoryProp> = () => {
  return (
    <>
      <div className="border border-solid border-gray-300 rounded p-2 pt-7 add-new-category">
        <CategoryForm />
      </div>
    </>
  )
}

export default Category