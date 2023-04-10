import { message, Space } from 'antd'
import produce from 'immer'
import { useRouter } from 'next/router'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import CancelButton from '../../../components/button/CancelButton'
import CreateButton from '../../../components/button/CreateButton'
import DeleteButton from '../../../components/button/DeleteButton'
import EditButton from '../../../components/button/EditButton'
import SaveButton from '../../../components/button/SaveButton'
import { UserUpsertMutation } from '../../../graphql/types'
import { useAuthContext } from '../../../contexts/AuthContext'
import { useUserContext } from '../../../contexts/UserContext'

const ActionButtonAreaUserComponent = () => {
  const router = useRouter()
  const { data: { auth }} = useAuthContext()
  const { state, setState, data, action } = useUserContext()
  const { formState, reset } = useFormContext()
  const { idle, busy } = state
  const { mode } = data
  const { isValid } = formState
  const disabled = busy || (mode === 'update' && idle) || !isValid
  const toggle = () => {
    setState(prev => (
      produce(prev, draft => {
        draft.idle = !prev.idle
      })
    ))
    reset()
  }
  const save = async () => {
    try {
      message.loading({ content: 'Menyimpan data. Mohon tunggu...', key: 'message' })
      const { result } = await action.save() as UserUpsertMutation
      message.success({ content: 'Data sukses disimpan!', key: 'message' })
      if (mode === 'create') {
        message.loading({ content: 'Mohon tunggu, mengarahkan ke halaman detail...', key: 'message' })
        router.push(router.pathname.replace('new', result?.id))
      }
    } catch (e) {
      message.error({ content: `Mohon maaf, kendala terjadi di sistem pada saat menyimpan data: ${e as string}`, key: 'message' })
    }
  }
  const remove = async () => {
    try {
      message.loading({ content: 'Menghapus data. Mohon tunggu...', key: 'message' })
      await action.remove()
      message.success({ content: 'Data sukses dihapus!', key: 'message' })
      router.push(router.pathname.replace('/[id]', ''))
    } catch (e) {
      message.error({ content: `Mohon maaf, kendala terjadi di sistem pada saat menghapus data: ${e as string}`, key: 'message' })
    }
  }
  if (!auth?.user?.is_admin) return null
  return (
    <Space>
      {mode === 'read' && (
        <CreateButton />
      )}
      {mode === 'create' && (
        <SaveButton
          onOk={save}
          busy={busy}
          disabled={disabled}
        />
      )}
      {mode === 'update' && (
        idle ? (
          <>
            <DeleteButton
              onOk={remove}
              busy={busy}
              disabled={busy}
            />
            <EditButton
              disabled={busy}
              onClick={toggle}
            />
          </>
        ) : (
          <>
            <CancelButton onClick={toggle} />
            <SaveButton
              onOk={save}
              busy={busy}
              disabled={disabled}
            />
          </>
        )
      )}
    </Space>
  )
}

export default ActionButtonAreaUserComponent