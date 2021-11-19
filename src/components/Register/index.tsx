import { Col, Row, Form, Input, Button, message, notification } from "antd"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthProvider/useAuth"

import { UserOutlined, LockOutlined, ContactsOutlined } from '@ant-design/icons';

export const Register = () => {

  const auth = useAuth()
  const navigate = useNavigate();

  const openNotification = () => {
    notification.success({
      message: "Seja bem-vindo(a)",
      description:
        'Esperamos que goste de trabalhar conosco!'
    });
  };

  async function onFinish(values: { first_name: string, last_name: string, email: string, password: string }) {
    try {
      const response = await auth.registrate(values.first_name, values.last_name, values.email, values.password)

      if (response && response.error) {
        message.error(response.error)
        return
      }

      openNotification()

      navigate('/dashboard')

    } catch (error) {
      message.error('Não foi possível realizar o cadastro.')
    }
  }

  return (
    <Row justify="center"
      align="middle"
      style={{
        height: "100vh"
      }}>
      <Col xs={{ span: 16 }} sm={{ span: 12 }} md={{ span: 10 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }}>
        <Form
          layout="vertical"
          onFinish={onFinish}>
          <Row>
            <Col>
              <Form.Item
                style={{
                  textAlign: 'start',
                  fontWeight: 'bold',
                  fontSize: 35
                }}
              >
                Login
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
              <Form.Item
                name="first_name"
                rules={[{ required: true, message: 'Preencha o campo!' }]}>
                <Input prefix={<ContactsOutlined />} placeholder="Primeiro nome" />
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
              <Form.Item
                name="last_name"
                // label="Último nome"
                rules={[{ required: true, message: 'Preencha o campo!' }]}
              >
                <Input prefix={<ContactsOutlined />} placeholder="Último nome" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                name="email"
                // label="E-mail"
                rules={[
                  { required: true, message: 'Preencha o campo!' },
                  { type: 'email', message: "Email inválido" }]}>
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Preencha o campo!',
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[{ required: true, message: 'Preencha o campo!', },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('As duas senhas precisam ser iguais!'));
              },
            }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirme a senha" />
          </Form.Item>

          <Row>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" block className="login-form-button">Cadastrar</Button>
                <p style={{ marginTop: 20 }}> Já tem uma conta?
                  <Link to='/login'>
                    <span> Conecte-se!</span>
                  </Link>
                </p>
              </Form.Item>
            </Col>
          </Row>


        </Form>
      </Col>
    </Row>
  )

}
