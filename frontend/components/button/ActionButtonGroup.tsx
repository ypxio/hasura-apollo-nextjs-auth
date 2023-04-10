import { Button, Space } from 'antd'
import React from 'react'
import ApprovalButton from './ApprovalButton'
import CancelButton from './CancelButton'
import CreateButton from './CreateButton'
import DeleteButton from './DeleteButton'
import DraftButton from './DraftButton'
import EditButton from './EditButton'
import PublishButton from './PublishButton'
import ReviewButton from './ReviewButton'
import SaveButton from './SaveButton'
import FinalButton from './FinalButton'

type OnChangeProps = {
  idle: boolean
}

type Props = {
  mode: 'read' | 'create' | 'update' | 'approval' | 'publish' | 'updraft' | 'review' | 'final' | 'finish'
  busy?: boolean
  disabled?: boolean
  idle?: boolean
  action?: {
    onSave?: () => Promise<boolean>
    onDraft?: () => Promise<boolean>
    onPublish?: () => Promise<boolean>
    onRemove?: () => Promise<boolean>
    onApprove?: () => Promise<boolean>
    onFinal?: () => Promise<boolean>
    onReview?: (approve: boolean, message?: string) => Promise<boolean | void>
    onCreate?: () => Promise<void>
  }
  onChange?: (props: OnChangeProps) => void
}

const ActionButtonGroup = (props: Props) => {
  const [idle, setIdle] = React.useState(true)
  const { mode, busy, disabled, action } = props
  const onClickToggle = () => {
    setIdle(prev => !prev)
    props.onChange?.({ idle: !idle })
  }
  React.useEffect(() => {
    props.idle && setIdle(props.idle)
  }, [props.idle])
  return (
    <Space>
      {mode === 'read' && (
        <CreateButton
          loading={busy}
          disabled={props.disabled}
          onClick={action?.onCreate}
        />
      )}
      {mode === 'create' && (
        <SaveButton
          onOk={action?.onSave}
          busy={busy}
          disabled={disabled}
        />
      )}
      {mode === 'publish' && (
        <>
          <DraftButton
            onClick={action?.onDraft}
            loading={busy}
          />
          <PublishButton
            onOk={action?.onPublish}
            busy={busy}
            disabled={disabled}
          />
        </>
      )}
      {mode === 'updraft' && (
        idle ? (
          <>
            <DeleteButton
              onOk={action?.onRemove}
              busy={busy}
              disabled={busy || disabled}
            />
            <EditButton
              disabled={busy || disabled}
              onClick={onClickToggle}
            />
          </>
        ) : (
          <>
            {!busy && <CancelButton onClick={onClickToggle} />}
            <DraftButton
              onClick={action?.onDraft}
              loading={busy}
            />
            <PublishButton
              onOk={action?.onPublish}
              busy={busy}
              disabled={disabled}
            />
          </>
        )
      )}
      {mode === 'final' && (
        // idle ? (
        //   <>
        //     <DeleteButton
        //       onOk={action?.onRemove}
        //       busy={busy}
        //       disabled={busy || disabled}
        //     />
        //     <EditButton
        //       disabled={busy || disabled}
        //       onClick={onClickToggle}
        //     />
        //   </>
        // ) : (
        //   <>
        //     {!busy && <CancelButton onClick={onClickToggle} />}
        //     <FinalButton
        //       loading={busy}
        //       disabled={props.disabled}
        //       onOk={action?.onFinal}
        //     />
        //   </>
        // )
        <>
          <FinalButton
            loading={busy}
            disabled={props.disabled}
            onOk={action?.onFinal}
          />
        </>
      )}
      {mode === 'finish' && (null)}
      {mode === 'update' && (
        idle ? (
          <>
            <DeleteButton
              onOk={action?.onRemove}
              busy={busy}
              disabled={busy || disabled}
            />
            <EditButton
              disabled={busy || disabled}
              onClick={onClickToggle}
            />
          </>
        ) : (
          <>
            {!busy && <CancelButton onClick={onClickToggle} />}
            <SaveButton
              onOk={action?.onSave}
              busy={busy}
              disabled={disabled}
            />
          </>
        )
      )}
      {mode === 'approval' && (
        idle ? (
          <>
            <ApprovalButton
              onOk={action?.onApprove}
              busy={busy}
              disabled={busy || disabled}
            />
            <EditButton
              disabled={busy || disabled}
              onClick={onClickToggle}
            />
          </>
        ) : (
          <>
            {!busy && <CancelButton onClick={onClickToggle} />}
            <SaveButton
              onOk={action?.onSave}
              busy={busy}
              disabled={disabled}
            />
          </>
        )
      )}
      {mode === 'review' && (
        idle ? (
          <>
            <ReviewButton
              onReview={action?.onReview}
              busy={busy}
              disabled={busy || disabled}
            />
            <EditButton
              disabled={busy || disabled}
              onClick={onClickToggle}
            />
          </>
        ) : (
          <>
            {!busy && <CancelButton onClick={onClickToggle} />}
            <SaveButton
              onOk={action?.onSave}
              busy={busy}
              disabled={disabled}
            />
          </>
        )
      )}
    </Space>
  )
}

export default ActionButtonGroup