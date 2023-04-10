import { Button, ButtonProps } from 'antd'
import React from 'react'
import { EditOutlined } from '@ant-design/icons'

const EditButton = (props: ButtonProps) => {
  return (
    <Button {...props} icon={<EditOutlined />}>
      Ubah
    </Button>
  )
}

export default EditButton