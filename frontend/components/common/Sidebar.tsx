import { Badge, Layout, Menu, MenuProps, Space, Typography } from 'antd'
import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import {
  FileOutlined,
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  RetweetOutlined,
  InboxOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/router'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Sidebar = () => {
  const router = useRouter()
  const { data } = useAuthContext()
  const isAdmin = data.auth?.user?.is_admin || false
  const items: MenuItem[] = React.useMemo(() => {
    return [
      getItem('Dashboard', '/dashboard', <DashboardOutlined />),
      getItem(isAdmin ? 'Manage users' : 'Users', '/settings/user', <UserOutlined />),
    ]
  }, [isAdmin])
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <Menu
        onClick={val => router.push(val.key)}
        selectedKeys={[router.asPath]}
        defaultSelectedKeys={[router.asPath || '/dashboard']}
        mode="inline"
        items={items}
        style={{
          height: '100%',
          border: 0,
          borderBottom: '1px solid rgb(240,240,240)'
        }}
      />
    </Sider>
  )
}

export default Sidebar