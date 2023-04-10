import { Button, Form, Input, Space, Typography } from 'antd'
import type { NextPage } from 'next'
import Link from 'next/link'
import LayoutComponent from '../components/common/Layout'

const IndexPage = () => {
  return <></> 
}

IndexPage.getLayout = (page: React.ReactElement) => {
  return (
    <LayoutComponent title="Index">
      {page}
    </LayoutComponent>
  )
}

export default IndexPage
