import { FC } from "react"
import CategoryForm from "@/components/dashboard/Categories/Form/page"
import ListOfCategories from "@/components/dashboard/Categories/List/ListOfCategories"

export const metadata = {
  title: 'Category | Dashboard',
}

type CategoryProp = {}

const Category: FC<CategoryProp> = () => {
  return (
    <>
      <div className="border border-solid border-gray-300 rounded p-2 add-new-category">
        {/* <CategoryForm /> */}
        <ListOfCategories />
      </div>
    </>
  )
}

export default Category