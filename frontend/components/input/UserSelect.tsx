import React from 'react'
import { Select, SelectProps } from 'antd'
import { InputMaybe, User_Bool_Exp, useUsersQuery } from '../../graphql/types'

const { Option } = Select

const UserSelect = (
  props: SelectProps & { where?: InputMaybe<User_Bool_Exp[]> },
  ref?: React.Ref<any> | undefined
) => {
  const { data, loading, error } = useUsersQuery({
    fetchPolicy: 'network-only',
    variables: {
      where: {
        _and: [
          {
            deleted_at: { _is_null: true }
          },
          {
            is_admin: { _eq: false }
          },
          ...(props.where || [])
        ]
      }
    }
  })
  const placeholder = React.useMemo(() => {
    if (data?.items.length === 0) return 'Tidak ada pengguna'
    return !!error ? `Error: ${error.message}` : (props.placeholder || 'Pilih pengguna')
  }, [error, props.placeholder, data])
  const disabled = props.disabled || loading || !!error || data?.items.length === 0
  return (
    <Select
      {...props}
      ref={ref}
      disabled={disabled}
      placeholder={placeholder}
      showSearch
      optionFilterProp="children"
      filterOption={(input, option) => {
        console.log({ option })
        return (option?.children?.join('') as string).toLowerCase().includes(input.toLowerCase())
      }}
    >
      {data?.items.map(item => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))}
    </Select>
  )
}

export default React.forwardRef(UserSelect)