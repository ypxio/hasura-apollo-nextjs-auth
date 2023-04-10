import { Modal, Button, ButtonProps, ModalFuncProps, message } from 'antd'
import React from 'react'
import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons'

const { confirm } = Modal

type Props = {
  onOk?: (...args: any[]) => Promise<any>
  busy?: boolean
} & ButtonProps

const PublishButton = (props: Props) => {
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
      title: 'Apakah Anda yakin untuk menerbitkan data ini?',
      icon: <ExclamationCircleOutlined />,
      content: 'Data akan terbiat setelah Anda menekan tombol Terbitkan',
      okText: 'Terbitkan',
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
      Terbitkan
    </Button>
  )
}

export default PublishButton