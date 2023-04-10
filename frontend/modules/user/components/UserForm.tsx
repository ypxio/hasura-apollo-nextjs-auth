import { Col, Form, Input, Row } from 'antd'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useUserContext } from '../../../contexts/UserContext'

type Props = {
  disabled?: boolean
}

const UserForm = (props: Props) => {
  const { disabled } = props
  const { control } = useFormContext()
  const { data } = useUserContext()
  return (
    <Form layout="vertical">
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={12}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Wajib diisi',
            }}
            render={({ field, fieldState: { error }}) => (
              <Form.Item
                required
                label="Nama"
                validateStatus={error?.message ? 'error' : undefined}
                help={error?.message}
              >
                <Input
                  {...field}
                  disabled={disabled}
                  placeholder="Nama"
                />
              </Form.Item>
            )}
          />
        </Col>
        <Col xs={24} sm={12}>
          <Controller
            control={control}
            name="auth.data.username"
            render={({ field, fieldState: { error }}) => (
              <Form.Item
                label="Username"
              >
                <Input disabled={disabled || data.mode === 'update'} {...field} />
              </Form.Item>
            )}
          />
          {data.mode === 'create' && <Controller
            control={control}
            name="auth.data.password"
            render={({ field, fieldState: { error }}) => (
              <Form.Item
                label="Kata sandi"
              >
                <Input {...field} />
              </Form.Item>
            )}
          />}
        </Col>
      </Row>
    </Form>
  )
}

export default UserForm