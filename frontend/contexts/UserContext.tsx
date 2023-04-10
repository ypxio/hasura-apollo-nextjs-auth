import produce from 'immer'
import { useRouter } from 'next/router'
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { UserUpsertMutation, useAuthInsertMutation, User_Insert_Input, useUserQuery, useUserUpsertMutation } from '../graphql/types'
import { getErrorMessage } from '../lib/form'
import namor from 'namor'

type Mode = 'create' | 'update' | 'read'

interface Props {
  children?: React.ReactNode
  mode: Mode
}

type SaveResult = UserUpsertMutation | null | undefined

type ContextType = {
  setState: React.Dispatch<React.SetStateAction<ContextType['state']>>
  state: {
    idle: boolean
    busy: boolean
  }
  data: {
    mode: Mode
  }
  action: {
    save: () => Promise<SaveResult>
    remove: () => Promise<boolean | string>
  }
}

const initialValues: ContextType = {
  setState: () => {},
  state: {
    idle: true,
    busy: false
  },
  data: {
    mode: 'read',
  },
  action: {
    save: async () => null,
    remove: async () => false,
  }
}

const context = React.createContext<ContextType>(initialValues)

export const useUserContext = () => {
  const store = React.useContext(context)
  if (!store) {
    throw new Error(
      'Cannot use `useUserContext` outside of a UserProvider'
    )
  }
  return store
};

const defaultPassword = '12345678'

const Store = (props: Props) => {
  const router = useRouter()
  const [state, setState] = React.useState<ContextType['state']>(initialValues.state)
  const { mode } = props
  const [hashedPassword, setHashedPassword] = React.useState('')
  const form = useForm<User_Insert_Input>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      auth: {
        data: {
          username: namor.generate({ words: 3 }),
          password: defaultPassword
        }
      }
    }
  })
  const values = form.getValues()
  React.useEffect(() => {
    (async () => {
      const hashResult = await fetch('/api/hash', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: defaultPassword })
      })
      const { hash } = await hashResult.json()
      setHashedPassword(hash)
    })()
  }, [])
  const [
    upsertUser,
    upsertUserStatus
  ] = useUserUpsertMutation({
    refetchQueries: ['User']
  })
  const [
    insertAuth,
    insertAuthStatus
  ] = useAuthInsertMutation()
  const { data, loading } = useUserQuery({
    fetchPolicy: 'network-only',
    variables: {
      id: router.query.id,
    },
    skip: !router.query.id
  })
  React.useEffect(() => {
    if (data) {
      form.reset({
        id: data.item?.id,
        name: data.item?.name,
        level: data.item?.level,
        auth: {
          data: {
            username: data?.item?.auth?.username
          }
        },
      })
    }
  }, [data, form])
  React.useEffect(() => {
    setState(prev => (
      produce(prev, draft => {
        draft.busy = loading
      })
    ))
  }, [loading])
  const remove = async () => {
    return new Promise<boolean | string>(async (resolve, reject) => {
      setState(prev => (
        produce(prev, draft => {
          draft.busy = true
        })
      ))
      try {
        await upsertUser({
          variables: {
            object: {
              id: router.query.id,
              name: values.name,
              deleted_at: new Date()
            }
          }
        })
        resolve(true)
      } catch (error) {
        setState(prev => (
          produce(prev, draft => {
            draft.idle = true
            draft.busy = false
          })
        ))
        reject(getErrorMessage(error))
      }
    })
  }
  const save = async () => {
    return new Promise<SaveResult>(async (resolve, reject) => {
      setState(prev => (
        produce(prev, draft => {
          draft.busy = true
        })
      ))
      form.handleSubmit(async (values) => {
        try {
          const { auth, ...userValues } = values
          const { data } = await upsertUser({
            variables: {
              object: {
                ...userValues,
                status: 1
              }
            }
          })
          if (mode === 'create') {
            const hashResult = await fetch('/api/hash', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ text: auth?.data.password })
            })
            const { hash: password } = await hashResult.json()
            await insertAuth({
              variables: {
                object: {
                  username: auth?.data.username,
                  password,
                  user_id: data?.result?.id
                }
              }
            })
          }
          setState(prev => (
            produce(prev, draft => {
              draft.idle = true
              draft.busy = mode === 'create'
            })
          ))
          resolve(data as UserUpsertMutation)
        } catch (error) {
          setState(prev => (
            produce(prev, draft => {
              draft.idle = true
              draft.busy = false
            })
          ))
          reject(getErrorMessage(error))
        }
      })()
    })
  }
  React.useEffect(() => {
    setState(prev => (
      produce(prev, draft => {
        draft.idle = true
      })
    ))
  }, [mode])
  return {
    state,
    setState,
    data: {
      mode,
      form,
    },
    action: {
      save,
      remove
    }
  }
}

export const UserProvider = (props: Props) => {
  const storeValues = Store(props)
  return (
    <FormProvider {...storeValues.data.form}>
      <context.Provider value={storeValues} {...props} />
    </FormProvider>
  )
}