import React from 'react'
import ContentWrapper from '../../../components/common/ContentWrapper'
import LayoutComponent from '../../../components/common/Layout'
import ActionButtonAreaUserComponent from '../../../modules/user/components/ActionButtonAreaUserComponent'
import UsersView from '../../../modules/user/views/UsersView'
import { UserProvider } from '../../../contexts/UserContext'

const OrganizationsPage = () => {
  return (
    <ContentWrapper
      pageHeader={{
        title: 'Users',
        breadcrumb: {
          routes: [
            { path: '', breadcrumbName: 'Settings' },
            { path: '', breadcrumbName: 'Users' },
          ]
        },
        extra: <ActionButtonAreaUserComponent />,
      }}
    >
      <UsersView />
    </ContentWrapper>
  )
}

OrganizationsPage.getLayout = (page: React.ReactElement) => {
  return (
    <LayoutComponent title="Manajemen Akun">
      <UserProvider mode="read">
        {page}
      </UserProvider>
    </LayoutComponent>
  )
}

export default OrganizationsPage