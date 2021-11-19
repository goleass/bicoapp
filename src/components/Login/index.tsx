import { Col, Row, Form, Input, Button, message } from "antd"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthProvider/useAuth"

import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const Login = () => {

  const auth = useAuth()
  const navigate = useNavigate();

  async function onFinish(values: { email: string, password: string }) {
    try {
      await auth.authenticate(values.email, values.password)

      message.success("Você está conectado!")

      navigate('/dashboard')

    } catch (error) {
      message.error('Email ou senha inválidos.')
    }
  }

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh"
      }}>
      <Col xs={{ span: 20 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            style={{
              textAlign: 'start',
              fontWeight: 'bold',
              fontSize: 35
            }}
          >
            Login
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Row>
            <Col span={24}>
              <Form.Item>
                <Button block type="primary" htmlType="submit" className="login-form-button">
                  Entrar
                </Button> Ou
                <Link to='/register'>
                  <Button style={{paddingLeft:3}} type='link'>cadastre-se!</Button>
                </Link>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}