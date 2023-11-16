import Breadcrumb from "antd/es/breadcrumb/Breadcrumb"
import { FC } from "react"

type BreadcrumbDashBoardProp = {}
const BreadcrumbDashBoard: FC<BreadcrumbDashBoardProp> = () => {
  return (
    <Breadcrumb
      items={[
        {
          title: 'Dashboard',
        },
        {
          title: <a href="">Books</a>,
        },
        {
          title: 'Add a new book',
        },
      ]}
    />
  )
}

export default BreadcrumbDashBoard