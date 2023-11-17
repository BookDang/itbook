import { FC } from "react"
import Menu, { MenuProps } from "antd/es/menu/menu"
import { GiBookshelf } from "react-icons/gi"
import { BiCategory } from "react-icons/bi"

type MenuDashboardProp = {}

const MenuDashboard: FC<MenuDashboardProp> = () => {
  return (
    <div>
      <Menu
        style={{ 
          width: 'calc(100%)', height: 'calc(100vh - 48px)', 
          borderInlineEnd: 'none', borderBottom: '1px solid #f2f2f2'
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        items={items}
      />
    </div>
  )
}

export default MenuDashboard

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Books', '1', <GiBookshelf />),
  getItem('Categories', '2', <BiCategory />),
];