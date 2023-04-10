import { PageHeader, PageHeaderProps, Space, Spin } from 'antd'
import React from 'react'

type Props = {
  pageHeader?: PageHeaderProps
  children: React.ReactNode
  loading?: boolean
}

const ContentWrapper = (props: Props) => {
  return (
    <Spin spinning={!!props.loading}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '92.5vh'
        }}
      >
        {props.pageHeader && (
          <PageHeader
            {...props.pageHeader}
            style={{
              padding: 24,
              borderBottom: '1px solid rgb(240,240,240)',
              paddingBottom: 16,
              paddingTop: props.pageHeader.breadcrumb ? 24 : 16,
            }}
          />
        )}
        <div
          style={{
            padding: 24,
            overflowY: 'scroll',
            height: '100%',
          }}
        >
          {props.children}
        </div>
      </div>
    </Spin>
  )
}

export default ContentWrapper