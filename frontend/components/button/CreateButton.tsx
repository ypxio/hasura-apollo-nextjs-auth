import { Button, ButtonProps } from 'antd'
import { useRouter } from 'next/router'
import { PlusOutlined } from '@ant-design/icons'
import React from 'react'

const CreateButton = (props?: ButtonProps) => {
  const router = useRouter()
  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => router.push(`${router.pathname}/new`)}
      {...props}
    >
      Tambah
    </Button>
  )
}

export default CreateButton