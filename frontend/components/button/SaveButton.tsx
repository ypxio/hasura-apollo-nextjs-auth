import { Modal, Button, ButtonProps, ModalFuncProps, message } from 'antd'
import React from 'react'
import { ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons'

const { confirm } = Modal

type Props = {
  onOk?: (...args: any[]) => Promise<any>
  busy?: boolean
} & ButtonProps

const SaveButton = (props: Props) => {
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
      title: 'Apakah Anda yakin untuk menyimpan data?',
      icon: <ExclamationCircleOutlined />,
      content: 'Data akan tersimpan setelah Anda menekan tombol Simpan',
      okText: 'Simpan',
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
      icon={<SaveOutlined />}
      onClick={onClick}
    >
      Simpan
    </Button>
  )
}

export default SaveButton