import { Alert, Button, Modal } from 'antd'
import React from 'react'

type Props = {
  data?: Object
  label?: string
}

const DebugButton = (props: Props) => {
  const [open, setOpen] = React.useState(false)
  const toggle = () => setOpen(prev => !prev)
  return (
    <>
      <Button onClick={toggle}>
        {props.label || '</>'}
      </Button>
      <Modal
        centered
        title={props.label || '</>'}
        visible={open}
        onCancel={toggle}
        onOk={toggle}
        width="100%"
      >
        <Alert
          type="info"
          message={
            <pre style={{ height: 400, overflow: 'scroll' }}>
              {JSON.stringify(props.data, null, 2)}
            </pre>
          }
        />
      </Modal>
    </>
  )
}

export default DebugButton