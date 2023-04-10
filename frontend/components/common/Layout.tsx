import * as React from 'react'
import { Layout, Menu, Breadcrumb, MenuProps, Card, Space, Tag, Typography, PageHeaderProps, PageHeader, Divider, Tooltip, Dropdown, Button, Alert, AlertProps } from 'antd'
import Image from 'next/image'
import {
  FileOutlined,
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
  RetweetOutlined
} from '@ant-design/icons'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { faker } from '@faker-js/faker'
import { useAuthContext } from '../../contexts/AuthContext'
import { ErrorBoundary } from 'react-error-boundary'
import { callbackify } from 'util'
import Sidebar from './Sidebar'

faker.setLocale('id_ID')

interface Props {
  children: React.ReactNode
  title?: string
}

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

const LayoutComponent = (props: Props) => {
  const router = useRouter()
  const { data } = useAuthContext()
  const isAdmin = data.auth?.user?.is_admin || false
  const name = data.auth?.user?.name || 'N/A'
  const username = data.auth?.username || 'N/A'
  const items: MenuItem[] = React.useMemo(() => {
    return [
      getItem('Dasbor', '/dashboard', <DashboardOutlined />),
      getItem('Surat masuk', '/dashboard', <FileOutlined />),
      getItem('Konsep surat', '/dashboard', <FileOutlined />),
      getItem('Dokumen surat', '/docs', <FileOutlined />, [
        getItem(isAdmin ? 'Semua surat' : 'Data surat', '/docs/master', <FileOutlined />),
        getItem('Tambah surat', '/docs/new'),
        isAdmin ? null : getItem('Surat masuk', '/docs/inbox'),
        // isAdmin ? null : getItem('Surat keluar', '/docs/outbox'),
        isAdmin ? null : getItem('Konsep surat', '/docs/concept'),
      ]),
      // isAdmin ? null : getItem('Konsep surat', '/docs/concept', <FileOutlined />),
      getItem('Profil akun', '/profile', <UserOutlined />),
      getItem(isAdmin ? 'Pengaturan' : 'Informasi', '/settings', <SettingOutlined />, [
        getItem(isAdmin ? 'Manajemen akun' : 'Pengguna', '/settings/user'),
        getItem('Manajemen kategori', '/settings/category'),
        getItem(isAdmin ? 'Manajemen instansi' : 'Instansi', '/settings/organization'),
      ]),
    ]
  }, [isAdmin])
  const [collapsed, setCollapsed] = React.useState(false)
  const title = props.title ? [props.title, 'MYAPP'] : ['MYAPP']
  return (
    <>
      <Head>
        <title>{title.join(' | ')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout style={{ height: '100vh' }}>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Typography.Text strong style={{ color: 'yellow' }}>
              MYAPP
            </Typography.Text>
          </div>
          <Space>
            <Typography.Text style={{ color: 'grey' }}>
              {`${name} (${username})`}
              {/* {data.auth?.user?.name} ({data.auth?.username}) - {organizationSwitcherData.organization?.name || 'N/A'} */}
            </Typography.Text>
            {/* <Divider type="vertical" style={{ borderColor: 'grey' }} />
            <Link href="/auth/signout">
              <Tooltip title="Keluar" placement="bottomRight">
                <LogoutOutlined style={{ color: 'white', cursor: 'pointer' }}/>
              </Tooltip>
            </Link> */}
            <Dropdown
              overlay={
                <Menu
                  items={[
                    {
                      label: 'Logout',
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      onClick: () => router.push('/auth/signout')
                    },
                  ]}
                />
              }
              trigger={['click']}
            >
              {/* <a onClick={e => e.preventDefault()}> */}
                <DownOutlined style={{ color: 'white', cursor: 'pointer' }} />
              {/* </a> */}
            </Dropdown>
          </Space>
        </Header>
        
        <Layout>
          {/* <Sider
            theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
          >
            <Menu
              onClick={val => router.push(val.key)}
              selectedKeys={[router.asPath]}
              defaultSelectedKeys={[router.asPath || '/dashboard']}
              // defaultOpenKeys={[`/${router.pathname.split('/')[1]}`]}
              defaultOpenKeys={['/docs', '/settings']}
              mode="inline"
              items={items}
              style={{
                height: '100%',
                border: 0,
                borderBottom: '1px solid rgb(240,240,240)'
              }}
            />
          </Sider> */}
          <Sidebar />
          
          <Content 
            style={{
              background: 'white',
              borderLeft: '1px solid rgb(240,240,240)',
              overflowY: 'hidden',
              height: '100%'
            }}
          >
            <ErrorBoundary
              FallbackComponent={val => {
                return (
                  <div style={{ padding: 24 }}>
                    <Alert
                      type="error"
                      message={(val.error.message as string) || 'Unknown error'}
                    />
                  </div>
                )
              }}
            >

              {props.children}
            </ErrorBoundary>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default LayoutComponent