// import { Category } from "@prisma/client"
import Table, { TablePaginationConfig } from "antd/es/table"
import _ from "lodash"
import { FC, memo, useState } from "react"
import { Category as CategoryDB } from "@/types/categorytypes"

const columns = [
  {
    title: 'Category name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
    key: 'slug',
  },
  {
    title: 'Parent',
    dataIndex: 'successorName',
    key: 'successorName',
  },
]

type TablePaginationPosition = NonNullable<TablePaginationConfig['position']>[number]
type CategoryProp = {
  categories: CategoryDB[]
}
type DataType = {
  key: number
  name: string
  slug: string
  successorId: number
  successorName: string
}

const Categories: FC<CategoryProp> = memo((props) => {
  const [bottom] = useState<TablePaginationPosition>('bottomRight')
  const [categories] = useState<DataType[]>(
    _.map(props.categories, (item) => {
      return {
        key: item.id,
        name: item.name,
        slug: item.slug,
        successorName: item?.predecessor?.name || '',
        successorId: item.successorId || 0,
      }
    })
  )

  return (
    <Table columns={columns}
      pagination={{ size:"small", position: [bottom], defaultCurrent: 1, showQuickJumper: true }}
      dataSource={categories}
    />
  )
})

export default Categories