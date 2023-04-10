import { Button, ButtonProps } from 'antd'
import React from 'react'

const CancelButton = (props: ButtonProps) => {
  return (
    <Button {...props}>
      Batal
    </Button>
  )
}

export default CancelButton