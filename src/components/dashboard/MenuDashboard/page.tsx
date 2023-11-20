"use client"

import { FC, ReactNode, useState } from "react"
import Menu, { MenuProps } from "antd/es/menu/menu"
import { GiBookshelf } from "react-icons/gi"
import { BiCategory } from "react-icons/bi"
import _ from "lodash"
import Link from "next/link"

type MenuDashboardProp = {}

const MenuDashboard: FC<MenuDashboardProp> = () => {
  const [currentMenuItem, setCurrentMenuItem] = useState('1')
  const onClickMenuItem: MenuProps['onClick'] = (e) => {
    console.log('e', e);
    setCurrentMenuItem(e.key);
  };
  return (
    <div className="left-mennu">
      <Menu
        style={{ 
          width: '100%', height: 'calc(100vh - 65px)', 
          borderInlineEnd: 'none', borderBottom: '1px solid #f2f2f2'
        }}
        mode="inline"
        theme="light"
        items={items}
        selectedKeys={[currentMenuItem]}
        onClick={onClickMenuItem}
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
const MenuItemList: [ReactNode, string | number, ReactNode][] = [
  [<Link href="/dashboard/books">Books</Link>, '1', <GiBookshelf />],
  [<Link href="/dashboard/categories">Categories</Link>, '2', <BiCategory />],
]
const items: MenuProps['items'] = _.map(MenuItemList, (item) => {
  return getItem(item[0], item[1], item[2])
})