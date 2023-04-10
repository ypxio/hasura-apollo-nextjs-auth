import { Alert } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import ContentWrapper from '../../../components/common/ContentWrapper'
import LayoutComponent from '../../../components/common/Layout'
import ActionButtonAreaUserComponent from '../../../modules/user/components/ActionButtonAreaUserComponent'
import UserView from '../../../modules/user/views/UserView'
import { UserProvider } from '../../../contexts/UserContext'

const UserPage = () => {
  const router = useRouter()
  return (
    <UserProvider mode="update">
      <ContentWrapper
        pageHeader={{
          title: 'User detail',
          breadcrumb: {
            routes: [
              { path: '', breadcrumbName: 'Settings' },
              { path: '/settings/organization', breadcrumbName: 'User management' },
              { path: '', breadcrumbName: 'User detail' },
            ]
          },
          extra: <ActionButtonAreaUserComponent />,
          onBack: () => router.back()
        }}
      >
        <UserView />
      </ContentWrapper>
    </UserProvider>
  )
}

UserPage.getLayout = (page: React.ReactElement) => {
  return (
    <LayoutComponent title="User detail">
      {page}
    </LayoutComponent>
  )
}

export default UserPage