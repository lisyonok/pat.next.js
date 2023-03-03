import { Button, Form, Input } from "antd"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import adapter from "../../lib/api/adapter"
import routerGuardContext from "../../lib/auth/routerGuardContext"

function App() {
  const router = useRouter()
  const auth = useContext(routerGuardContext)
  const [error, setError] = useState(null)

  useEffect(() => {
    //if (auth.isAuth) router.push("/")
  }, [auth])

  const onFinish = async (val) => {
    const { data } = await adapter({ url: "auth/login", data: val, method: "post", validateStatus: () => true })
    if (data.status === "ok") router.push("/")
    else setError(data.message)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item label="Username" name="name" rules={[{ required: true, message: "Please input your username!" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="pass" rules={[{ required: true, message: "Please input your password!" }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      {error && (
        <Form.Item label="Error">
          <span className="ant-form-text" style={{ color: "red" }}>
            {error}
          </span>
        </Form.Item>
      )}
    </Form>
  )
}
export default App
