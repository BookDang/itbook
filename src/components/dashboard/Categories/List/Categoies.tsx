// import { Category } from "@prisma/client"
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table"
import _ from "lodash"
import { FC, memo, useMemo, useState } from "react"
import { Button } from "antd"
import { CiTrash } from "react-icons/ci"
import { Category as CategoryDB } from "@/types/categorytypes"

type TablePaginationPosition = NonNullable<TablePaginationConfig['position']>[number]

type DataType = CategoryDB & {
  key: number
}

type CategoryProp = {
  categories: CategoryDB[]
}

const Categories: FC<CategoryProp> = memo((props) => {
  const onHandleMapcategories = (categories: CategoryDB[]): DataType[] => _.map(categories, (item: CategoryDB) => {
    let childrenItems: any = null
    if (item?.children?.length) {
      childrenItems = onHandleMapcategories(item.children)
    }
    return {
      ..._.cloneDeep(item),
      key: item.id,
      children: childrenItems,
    }
  })

  const [bottom] = useState<TablePaginationPosition>('bottomRight')
  const [categories] = useState<DataType[]>(onHandleMapcategories(props.categories))
  
  const columns: ColumnsType<DataType> = useMemo(() => {
    return [
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
        dataIndex: 'parentName',
        key: 'parentName',
      },
      {
        title: 'Actions',
        key: 'action',
        width: 100,
        render: (text: any, record: any) => (
          <Button shape="circle" icon={<CiTrash className="text-red-700" />}
            onClick={() => onHandleDeleting(record)}
          />
        )
      }
    ]
  }, [])

  const onHandleDeleting = (record: any) => {
    console.log('Deleting', record)
  }

  return (
    <Table
      columns={columns}
      dataSource={categories}
      pagination={{ size: "small", position: [bottom], defaultCurrent: 1, showQuickJumper: true }}
    />
  )
})

export default Categories