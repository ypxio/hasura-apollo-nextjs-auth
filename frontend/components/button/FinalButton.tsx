import { Modal, Button, ButtonProps, ModalFuncProps } from 'antd'
import React from 'react'
import { CheckOutlined } from '@ant-design/icons'

const { confirm } = Modal

type Props = {
  onOk?: (...args: any[]) => Promise<any>
  busy?: boolean
} & ButtonProps

const FinalButton = (props: Props) => {
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
      type="primary"
      ghost
      icon={<CheckOutlined />}
      onClick={() => {
        const modal = confirm({
          title: 'Apakah Anda yakin akan memfinalisasi surat ini?',
          content: 'Nomor surat akan digenerate secara otomatis oleh sistem setelah Anda menekan tombol Finalisasi',
          okText: 'Finalisasi',
          cancelText: 'Batal',
          onOk,
          onCancel: () => {},
        })
        setModalInstance(modal)
      }}
    >
      Finalisasi
    </Button>
  )
}

export default FinalButton