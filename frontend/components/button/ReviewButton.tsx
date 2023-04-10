import { Modal, Button, ButtonProps, ModalFuncProps, Space, Typography, Radio, Switch } from 'antd'
import React from 'react'
import { ExclamationCircleOutlined, AuditOutlined } from '@ant-design/icons'
import Input from 'antd/lib/input/Input'
import TextArea from 'antd/lib/input/TextArea'

const { confirm } = Modal

const defaultCancelButtonProps: ButtonProps = {
  danger: true,
}

const defaultOkButtonProps: ButtonProps = {
  ghost: true,
}

type Props = {
  onReview?: (approve: boolean, message?: string) => Promise<boolean | void>
  busy?: boolean
} & ButtonProps

type ContentProps = {
  disabled?: boolean
  onChange?: (message: string) => void
}

const Content = (props: ContentProps) => {
  const [text, setText] = React.useState('')
  const onChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setText(val)
    props.onChange?.(val)
  }, [setText, props])
  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Typography.Text>
        Anda dapat melengkapi tinjauan dengan catatan
      </Typography.Text>
      <TextArea
        placeholder="Tuliskan catatan tinjauan disini..."
        value={text}
        onChange={onChange}
        disabled={props.disabled}
      />
    </Space>
  )
}


const ReviewButton = (props: Props) => {
  const { onReview, busy, ...buttonProps } = props
  const [rejected, setRejected] = React.useState(false)
  const [modalInstance, setModalInstance] = React.useState<{
    destroy: () => void;
    update: (props: ModalFuncProps) => void;
  }>()
  React.useEffect(() => {
    modalInstance?.update(
      !rejected ? {
        maskClosable: !busy,
        cancelButtonProps: {
          ...defaultCancelButtonProps,
          disabled: busy
        }
      } : {
        maskClosable: !busy,
        okButtonProps: {
          ...defaultOkButtonProps,
          disabled: busy
        }
      }
    )
  }, [busy, modalInstance])
  return (
    <Button
      {...buttonProps}
      type="primary"
      ghost
      icon={<AuditOutlined />}
      onClick={() => {
        const modal = confirm({
          title: 'Tinjau data',
          width: '50vw',
          maskClosable: true,
          icon: null,
          content: (
            <Content
              onChange={val => {
                modal.update({
                  onOk: async () => {
                    setRejected(false)
                    await onReview?.(true, val)
                  },
                  onCancel: async (e) => {
                    if (e.triggerCancel) return
                    setRejected(true)
                    await onReview?.(false, val)
                  }
                })
              }}
            />
          ),
          okText: 'Setujui',
          cancelText: 'Tolak',
          onOk: async () => {
            setRejected(false)
            await onReview?.(true)
          },
          onCancel: async (e) => {
            if (e.triggerCancel) return
            setRejected(true)
            await onReview?.(false)
          },
          okButtonProps: defaultOkButtonProps,
          cancelButtonProps: defaultCancelButtonProps,
        })
        setModalInstance(modal)
      }}
    >
      Tinjau
    </Button>
  )
}

export default ReviewButton