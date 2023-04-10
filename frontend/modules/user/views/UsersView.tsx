import React from 'react'
import { Input, Table, Tag } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table'
import { useRouter } from 'next/router'
import { Auth, Order_By, UserFieldsFragment, useUsersQuery } from '../../../graphql/types'
import dayjs from '../../../utils/ext-dayjs'

const pageSize = 10

const UsersView = () => {
  const router = useRouter()
  const [current, setCurrent] = React.useState<number | undefined>(1)
  const columns: ColumnsType<UserFieldsFragment> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name'
    },
    {
      key: 'username',
      dataIndex: 'auth',
      title: 'Username',
      render: (val: Auth) => val?.username || '-'
    },
  ]
  const offset = React.useMemo(() => {
    if (!current) return 0
    return (current - 1) * pageSize
  }, [current])
  const { data, loading } = useUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: pageSize,
      offset,
      order_by: {
        created_at: 'desc' as Order_By
      },
      where: {
        deleted_at: { _is_null: true }
      }
    }
  })
  const total: number = React.useMemo(() => {
    return data?.items_aggregate?.aggregate?.count || 0
  }, [data])
  const onChange = (
    pagination: TablePaginationConfig,
  ) => {
    const { current } = pagination
    setCurrent(current)
  }
  return (
    <Table
      <UserFieldsFragment>
      bordered
      columns={columns}
      dataSource={data?.items}
      loading={loading}
      rowKey="id"
      onRow={(record) => {
        return {
          onClick: () => router.push(`${router.pathname}/${record.id}`),
        };
      }}
      pagination={{
        pageSize,
        current,
        total,
        showSizeChanger: false
      }}
      onChange={onChange}
    />
  )
}

export default UsersView