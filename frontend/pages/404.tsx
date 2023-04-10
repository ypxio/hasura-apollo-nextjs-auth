import { Button, Result } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

const Custom404 = () => {
  const router = useRouter()
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh'
      }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => router.back()}>
            Back Home
          </Button>
        }
      />
    </div>
  )
}

export default Custom404