import { useRouter } from 'next/router'
import React from 'react'
import ContentWrapper from '../../../components/common/ContentWrapper'
import LayoutComponent from '../../../components/common/Layout'
import ActionButtonAreaUserComponent from '../../../modules/user/components/ActionButtonAreaUserComponent'
import UserView from '../../../modules/user/views/UserView'
import { UserProvider } from '../../../contexts/UserContext'

const OrganizationNewPage = () => {
  const router = useRouter()
  return (
    <ContentWrapper
      pageHeader={{
        title: 'Buat Akun',
        breadcrumb: {
          routes: [
            { path: '', breadcrumbName: 'Pengaturan' },
            { path: '/settings/organization', breadcrumbName: 'Manajemen Akun' },
            { path: '', breadcrumbName: 'Buat Akun' },
          ]
        },
        extra: <ActionButtonAreaUserComponent />,
        onBack: () => router.back()
      }}
    >
      <UserView />
    </ContentWrapper>
  )
}

OrganizationNewPage.getLayout = (page: React.ReactElement) => {
  return (
    <LayoutComponent title="Buat Akun">
      <UserProvider mode="create">
        {page}
      </UserProvider>
    </LayoutComponent>
  )
}

export default OrganizationNewPage