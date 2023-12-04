import { FC } from "react"
import ListOfCategories from "@/components/dashboard/Categories/List/CategoryContainer"

export const metadata = {
  title: 'Category | Dashboard',
}

type CategoryProp = {}

const Category: FC<CategoryProp> = () => {
  return (
    <>
      <ListOfCategories />
    </>
  )
}

export default Category