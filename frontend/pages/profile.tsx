import { Alert } from 'antd'
import React from 'react'
import ContentWrapper from '../components/common/ContentWrapper'
import LayoutComponent from '../components/common/Layout'
import { useAuthContext } from '../contexts/AuthContext'

const ProfilePage = () => {
  const { data } = useAuthContext()
  return (
    <ContentWrapper
      pageHeader={{
        title: 'Profil Akun'
      }}
    >
      <Alert
        type="info"
        message={
          <pre>
            {JSON.stringify(data.auth, null, 2)}
          </pre>
        }
      />
    </ContentWrapper>
  )
}

ProfilePage.getLayout = (page: React.ReactElement) => {
  return (
    <LayoutComponent title="Dokumen">
      {page}
    </LayoutComponent>
  )
}

export default ProfilePage