import { Spin } from 'antd'
import React from 'react'
import { useUserContext } from '../../../contexts/UserContext'
import UserForm from '../components/UserForm'

const UserView = () => {
  const { state, data } = useUserContext()
  const { idle, busy } = state
  const { mode } = data
  const disabled = (mode === 'create' && busy) || (mode === 'update' && idle)
  return (
    <Spin spinning={busy}>
      <UserForm disabled={disabled} />
    </Spin>
  )
}

export default UserView