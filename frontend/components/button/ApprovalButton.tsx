import { Modal, Button, ButtonProps, ModalFuncProps, message } from 'antd'
import React from 'react'
import { CheckOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons'

const { confirm } = Modal

type Props = {
  onOk?: (...args: any[]) => Promise<any>
  busy?: boolean
} & ButtonProps

const ApprovalButton = (props: Props) => {
  const { onOk, busy, ...buttonProps } = props
  const [modalInstance, setModalInstance] = React.useState<{
    destroy: () => void;
    update: (props: ModalFuncProps) => void;
  }>()
  React.useEffect(() => {
    modalInstance?.update({
      cancelButtonProps: {
        disabled: busy
      }
    })
  }, [busy, modalInstance])
  const onClick = React.useCallback(() => {
    const modal = confirm({
      title: 'Apakah Anda yakin untuk menyetujui?',
      icon: <ExclamationCircleOutlined />,
      content: 'Data yang telah disetujui tidak dapat dibatalkan',
      okText: 'Setujui',
      cancelText: 'Batal',
      onOk,
      onCancel: () => {}
    });
    setModalInstance(modal)
  }, [onOk])
  return (
    <Button
      {...buttonProps}
      type="primary"
      icon={<CheckOutlined />}
      onClick={onClick}
    >
      Setujui
    </Button>
  )
}

export default ApprovalButton