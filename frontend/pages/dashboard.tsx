import React from 'react'
import LayoutComponent from '../components/common/Layout'
import ContentWrapper from '../components/common/ContentWrapper'

const DashboardPage = () => {
  return (
    <ContentWrapper pageHeader={{ title: 'Dashboard'}}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ullam nulla, iste modi exercitationem eligendi quas deleniti blanditiis dicta tempore illo iusto, harum tenetur quisquam alias natus, nemo minima delectus.
    </ContentWrapper>
  )
}

DashboardPage.getLayout = (page: React.ReactElement) => {
  return (
    <LayoutComponent title="Dashboard">
      {page}
    </LayoutComponent>
  )
}

export default DashboardPage