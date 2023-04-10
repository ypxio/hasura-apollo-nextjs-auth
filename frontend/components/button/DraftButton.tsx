import { Button, ButtonProps } from 'antd'
import { useRouter } from 'next/router'
import { SaveOutlined } from '@ant-design/icons'
import React from 'react'

const DraftButton = (props?: ButtonProps) => {
  return (
    <Button
      icon={<SaveOutlined />}
      type="primary"
      ghost
      {...props}
    >
      Simpan sebagai draft
    </Button>
  )
}

export default DraftButton