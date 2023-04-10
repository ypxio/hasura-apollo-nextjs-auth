import { useQuery } from '@apollo/client'
import { Table, TablePaginationConfig, TableProps } from 'antd'
import { DocumentNode } from 'graphql'
import { useRouter } from 'next/router'
import React from 'react'
import { InputMaybe, Order_By } from '../graphql/types'

export type TableType = {
  schema: Record<string, any>
  bool: Record<string, any>
  order?: Record<string, any>
}

type Props<T extends TableType> = {
  node: DocumentNode
  where?: InputMaybe<T['bool']> 
  tableProps?: TableProps<T['schema']>
  current?: number
  order_by?: T['order']
}

const pageSize = 5

const DefaultTable = <T extends TableType>({
  node,
  where,
  tableProps,
  order_by,
  current: currentProps
}: Props<T>) => {
  const router = useRouter()
  const [current, setCurrent] = React.useState<number | undefined>(currentProps)
  React.useEffect(() => {
    currentProps && setCurrent(currentProps)
  }, [currentProps])
  const offset = React.useMemo(() => {
    if (!current) return 0
    return (current - 1) * pageSize
  }, [current])
  const { data, loading, error } = useQuery(node,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        limit: pageSize,
        offset,
        order_by: order_by || {
          created_at: 'desc' as Order_By
        },
        where
      }
    }
  )
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
    <Table<T['schema']>
      bordered
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
      {...tableProps}
    />
  )
}

export default DefaultTable