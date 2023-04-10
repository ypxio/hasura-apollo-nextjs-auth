import React from "react";
import { gql, useMutation } from "@apollo/client";
import { getErrorMessage } from "../../lib/form";
import { Button, Card, Form, Input, message, Space, Typography } from "antd";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";

type Values = { username: string, name: string, password: string }

const SignUpMutation = gql`
  mutation SignUpMutation($name: String!, $username: String!, $password: String!, $is_admin: Boolean) {
    signup(params: { name: $name, username: $username, password: $password, is_admin: $is_admin }) {
      ok
    }
  }
`

function SignUpPage() {
	const {
		control,
		handleSubmit,
		reset,
		formState: { isValid }
	} = useForm<Values>({
		mode: 'all',
		reValidateMode: 'onChange'
  })
	React.useEffect(() => {
		reset()
	}, [reset])
	const router = useRouter()
  const [signUp, { loading }] = useMutation(SignUpMutation);
  const onFinish = async () => {
		handleSubmit(async (values) => {
			try {
				await signUp({
					variables: {
						...values,
						is_admin: router.query.admin ? true : false
					},
				})
				message.success('Sukses melakukan pendaftaran!')
				reset()
			} catch (error) {
				message.error(getErrorMessage(error))
			}
		})()
  }
  return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
			<Card title="Signup" style={{ width: 500 }}>
				<Form
					layout="vertical"
					autoComplete="off"
					onFinish={onFinish}
				>
					<Controller
						name="name"
						control={control}
						rules={{
							required: 'Field wajib diisi',
						}}
						render={({ field, fieldState: { error }}) => (
							<Form.Item
								required
								validateStatus={error?.message ? 'error' : undefined}
								help={error?.message}
							>
								<Input disabled={loading} placeholder="Nama" {...field} />
							</Form.Item>
						)}
					/>
					<Controller
						name="username"
						control={control}
						rules={{
							required: 'Field wajib diisi',
							minLength: {
								value: 3,
								message: 'Username minimal 3 karakter'
							},
							pattern: {
								value: /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
								message: 'Username hanya dapat mengandung angka, huruf, dan spasi. Tidak boleh diawali dengan underscore (_) atau titik (.)'
							}
						}}
						render={({ field, fieldState: { error }}) => (
							<Form.Item
								required
								validateStatus={error?.message ? 'error' : undefined}
								help={error?.message}
							>
								<Input disabled={loading} placeholder="Username" {...field} />
							</Form.Item>
						)}
					/>
					<Controller
						name="password"
						control={control}
						rules={{
							required: 'Field wajib diisi',
							minLength: {
								value: 6,
								message: 'Kata sandi minimal 6 karakter'
							}
						}}
						render={({ field, fieldState: { error }}) => (
							<Form.Item
								required
								validateStatus={error?.message ? 'error' : undefined}
								help={error?.message}
							>
								<Input.Password disabled={loading} placeholder="Kata sandi" {...field} />
							</Form.Item>
						)}
					/>
					<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
						<Button
							block
							disabled={!isValid || loading}
							type="primary"
							htmlType="submit"
						>
							Daftar
						</Button>
						<div style={{ textAlign: 'center' }}>
							<Typography.Text>
								Already have an account? <Link href="/auth/signin"><Typography.Link>Signin</Typography.Link></Link>
							</Typography.Text>
						</div>
					</Space>
				</Form>
			</Card>
		</div>
  );
}

export default SignUpPage
