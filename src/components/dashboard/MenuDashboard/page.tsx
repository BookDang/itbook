"use client"

import { FC, ReactNode, useEffect, useState } from "react"
import Menu, { MenuProps } from "antd/es/menu/menu"
import { GiBookshelf } from "react-icons/gi"
import { BiCategory } from "react-icons/bi"
import Icon from '@ant-design/icons';
import _ from "lodash"
import Link from "next/link"
import { usePathname } from "next/navigation"

type MenuDashboardProp = {}

const MenuDashboard: FC<MenuDashboardProp> = () => {
  const [currentMenuItem, setCurrentMenuItem] = useState('0')

  const pathname = usePathname()
  useEffect(() => {
    const itemMenu = _.find(menuItems, (item) => item.href === pathname)
    if (itemMenu?.position) {
      setCurrentMenuItem(itemMenu?.position)
    }
  }, [pathname])

  const onClickMenuItem: MenuProps['onClick'] = (e) => {
    setCurrentMenuItem(e.key)
  };
  return (
    <div className="left-mennu">
      <Menu
        style={{
          width: '100%', height: 'calc(100vh - 48px)',
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
const menuItems = [
  { href: '/dashboard/books', label: 'Books', icon: GiBookshelf, position: '1' },
  { href: '/dashboard/categories', label: 'Categories', icon: BiCategory, position: '2' },
]
const MenuItemList: [ReactNode, string | number, ReactNode][] = _.map(menuItems, (item) => {
  return [
    <Link key={item.position} href={item.href}>{item.label}</Link>,
    item.position,
    <Icon key={item.position} component={item.icon} />
  ]
})
const items: MenuProps['items'] = _.map(MenuItemList, (item) => {
  return getItem(item[0], item[1], item[2])
})