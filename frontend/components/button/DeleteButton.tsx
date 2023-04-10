import { Modal, Button, ButtonProps, ModalFuncProps } from 'antd'
import React from 'react'
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons'

const { confirm } = Modal

type Props = {
  onOk?: (...args: any[]) => Promise<any>
  busy?: boolean
} & ButtonProps

const DeleteButton = (props: Props) => {
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
  return (
    <Button
      {...buttonProps}
      danger
      icon={<DeleteOutlined />}
      onClick={() => {
        const modal = confirm({
          title: 'Apakah Anda yakin menghapus data ini?',
          icon: <ExclamationCircleOutlined />,
          content: 'Data akan dihapus dari sistem setelah Anda menekan tombol Hapus',
          okText: 'Hapus',
          cancelText: 'Batal',
          okButtonProps: { danger: true },
          onOk,
          onCancel: () => {},
        })
        setModalInstance(modal)
      }}
    >
      Hapus
    </Button>
  )
}

export default DeleteButton