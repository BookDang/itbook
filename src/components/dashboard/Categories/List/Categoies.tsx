// import { Category } from "@prisma/client"
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table"
import _ from "lodash"
import { FC, memo, useMemo, useState } from "react"
import { Button, notification } from "antd"
import { CiEdit, CiTrash } from "react-icons/ci"
import { IoWarningOutline } from "react-icons/io5"
import Link from 'next/link'
import { NotificationType } from "@/types/antdtypes"
import { Category as CategoryDB } from "@/types/categorytypes"
import ConfirmModal from "@/components/ConfirmModal"
import Modal from "antd"
import CategoryService from "@/services/categoryService"
import { openNotification } from "@/helpers/notification.helper"
import { STATUS } from "@/constants/statusContants"

type TablePaginationPosition = NonNullable<TablePaginationConfig['position']>[number]

type DataType = CategoryDB & {
  key: number
}

type CategoryProp = {
  categories: CategoryDB[]
}

const Categories: FC<CategoryProp> = memo((props) => {
  const [api, contextHolder] = notification.useNotification()
  const onHandleMapcategories = useMemo(
    () => (
      categories: CategoryDB[]): DataType[] => _.map(categories, (item: CategoryDB) => {
        let childrenItems: any = null
        if (item?.children?.length) {
          childrenItems = onHandleMapcategories(item.children)
        }
        return {
          ..._.cloneDeep(item),
          key: item.id,
          children: childrenItems,
        }
      }
      ), [])

  const [bottom] = useState<TablePaginationPosition>('bottomRight')
  const [categories, setCategories] = useState<DataType[]>(onHandleMapcategories(props.categories))
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false)
  const [actionParams, setActionParams] = useState(null)
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
          <div className="flex gap-3">
            <Link href={`/dashboard/categories/form?categoryId=` + record.id}>  
              <Button shape="circle" icon={<CiEdit className="text-red-700" />}/>
            </Link>
            <Button shape="circle" icon={<CiTrash className="text-red-700" />}
              onClick={() => onShowConfirmModal(record)}
            />
          </div>
        )
      }
    ]
  }, [])

  const onHandleDeleting = (record: any) => {
    CategoryService.deleleCategory(record.id)
      .then((res) => {
        if (res) {
          openNotification(api, 'Category is deleted!', STATUS.SUCCESS as NotificationType)
          setCategories(_.filter(categories, (item) => 
            item.id !== record.id
          ))
        } else {
          openNotification(api, 'Category is not deleted!', STATUS.ERROR as NotificationType)
        }
      })
      .finally(() => {
        setIsConfirmModalOpen(false)
      })
  }

  const onShowConfirmModal = (record: any) => {
    setActionParams(record)
    setIsConfirmModalOpen(true)
  }

  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={categories}
        pagination={{ size: "small", position: [bottom], defaultCurrent: 1, showQuickJumper: true }}
      />
      <ConfirmModal
        isModalOpen={isConfirmModalOpen}
        actionParams={actionParams}
        actionMethod={onHandleDeleting}
        setIsConfirmModalOpen={setIsConfirmModalOpen}
        content="Are you sure to delete this category?"
        title={
          <div className="flex items-center">
            <IoWarningOutline className="text-yellow-800 w-4 h-4" />
            Delete the task
          </div>
        }
      />
    </>
  )
})

export default Categories