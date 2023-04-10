import React from "react";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Card, Form, Input, Button, message, Space, Typography } from "antd";
import { getErrorMessage } from "../../lib/form";
import { setJwtToken, setRefreshToken } from "../../lib/auth";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";

type Values = { username: string, password: string }

const LoginMutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(params: { username: $username, password: $password }) {
      jwt
      refreshToken
			isAdmin
    }
  }
`;

function SignInPage() {
  const {
		control,
		handleSubmit,
		formState: { isValid }
	} = useForm<Values>({
		mode: 'all',
		reValidateMode: 'onChange'
  })
  const router = useRouter()
  const [login, { called, loading, error: mutationError }] = useMutation(LoginMutation)
  const onFinish = async () => {
		handleSubmit(async (values) => {
			try {
				const { data, errors } = await login({
					variables: values,
				})
        if (data) {
          message.success('Sukses login!')
          setJwtToken(data.login.jwt)
          setRefreshToken(data.login.refreshToken)
          router.push('/dashboard')
        }
			} catch (error) {
				message.error(getErrorMessage(error))
			}
		})()
  }
  React.useEffect(() => {
    setJwtToken('')
    setRefreshToken('')
  }, [])
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
			<Card title="Login" style={{ width: 500 }}>
        <Form
					layout="vertical"
					autoComplete="off"
					onFinish={onFinish}
				>
					<Controller
						name="username"
						control={control}
						rules={{
							required: 'Field wajib diisi'
						}}
						render={({ field, fieldState: { error }}) => (
							<Form.Item
								required
								validateStatus={error?.message ? 'error' : undefined}
								help={error?.message}
							>
								<Input disabled={loading || (called && !mutationError)} placeholder="Username" {...field} />
							</Form.Item>
						)}
					/>
					<Controller
						name="password"
						control={control}
						rules={{
							required: 'Field wajib diisi'
						}}
						render={({ field, fieldState: { error }}) => (
							<Form.Item
								required
								validateStatus={error?.message ? 'error' : undefined}
								help={error?.message}
							>
								<Input.Password disabled={loading || (called && !mutationError)} placeholder="Kata sandi" {...field} />
							</Form.Item>
						)}
					/>
					<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
						<Button
							block
							disabled={!isValid || loading || (called && !mutationError)}
							type="primary"
							htmlType="submit"
						>
							Login
						</Button>
						{/* <div style={{ textAlign: 'center' }}>
							<Typography.Text>
								Belum punya akun? <Link href="/auth/signup"><Typography.Link>Daftar</Typography.Link></Link>
							</Typography.Text>
						</div> */}
					</Space>
				</Form>
			</Card>
		</div>
  );
};

export default SignInPage;
