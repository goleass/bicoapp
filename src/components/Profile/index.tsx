import { Select, Avatar, Card, Col, Row, Form, Input, Divider, Descriptions, Button } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { useState } from "react";

const { Option } = Select

export const Profile = () => {
  const [editPersonalInfo, setEditPersonalInfo] = useState(false)
  const [editAccountInfo, setEditAccountInfo] = useState(false)
  const [editAddressInfo, setEditAddressInfo] = useState(false)
  const [editCellPhoneInfo, setEditCellPhoneInfo] = useState(false)

  const genders = {
    "F": "Feminino",
    "M": "Masculino",
    "O": "Outro",
  }

  return (
    <Row gutter={[20, 20]}>
      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 24 }}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Card hoverable title={
              <Row>
                <Col span={1}><Avatar size={100} icon={<UserOutlined />} /></Col>
              </Row>
            }>

              <Form layout={"vertical"}
                initialValues={{
                  name: "Leonardo Gomes Assunção",
                  identity_number: "079.168.468.42",
                  gender: genders["M"],
                }}
              >
                <Form.Item name={"name"} label={"Nome"}>
                  <Input disabled={!editPersonalInfo} />
                </Form.Item>

                <Form.Item name={"identity_number"} label={"CPF"}>
                  <Input disabled={!editPersonalInfo} />
                </Form.Item>

                <Form.Item name={"gender"} label={"Gênero"}>
                  {/* <Input disabled={!editPersonalInfo} /> */}
                  <Select disabled={!editPersonalInfo} >
                    <Option value="M">Masculino</Option>
                    <Option value="F">Feminino</Option>
                    <Option value="O">Outros</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Row justify={"end"} gutter={editPersonalInfo ? 10 : 0}>
                    <Col>
                      <Button hidden={editPersonalInfo} onClick={() => setEditPersonalInfo(true)} type={"primary"}>Editar campos</Button>
                    </Col>
                    <Col>
                      <Button hidden={!editPersonalInfo} onClick={() => setEditPersonalInfo(false)} htmlType="reset" type={"ghost"}>Cancelar</Button>
                    </Col>

                    <Col>
                      <Button hidden={!editPersonalInfo} onClick={() => setEditPersonalInfo(false)} type={"primary"}>Salvar</Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col span={24}>
            <Card hoverable>
              <Form
                layout={"vertical"}
                initialValues={{
                  email: "leonardo-assuncao1@hotmail.com"
                }}>

                <Divider orientation="left">Configurações de Conta</Divider>

                <Form.Item name={"email"} label={"E-mail"}>
                  <Input disabled={!editAccountInfo} />
                </Form.Item>

                <Form.Item hidden={editAccountInfo} name={"password"} label={"Senha"}>
                  <Input.Password disabled={!editAccountInfo} />
                </Form.Item>

                <Form.Item
                  hidden={!editAccountInfo}
                  name="password"
                  label={"Nova senha"}
                  rules={[
                    {
                      required: true,
                      message: 'Preencha o campo!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Senha" />
                </Form.Item>

                <Form.Item
                  hidden={!editAccountInfo}
                  name="confirm"
                  label={"Repita a senha"}
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
                  <Input.Password placeholder="Confirme a senha" />
                </Form.Item>

                <Form.Item >
                  <Row justify={"end"} gutter={editAccountInfo ? 10 : 0}>
                    <Col>
                      <Button hidden={editAccountInfo} onClick={() => setEditAccountInfo(true)} type={"primary"}>Editar campos</Button>
                    </Col>
                    <Col>
                      <Button
                        hidden={!editAccountInfo}
                        onClick={() => { setEditAccountInfo(false) }}
                        htmlType="reset"
                        type={"ghost"}>
                        Cancelar
                      </Button>
                    </Col>

                    <Col>
                      <Button htmlType="submit" hidden={!editAccountInfo} type={"primary"}>Salvar</Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Col>

      <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 24 }}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Card hoverable>
              <Form
                layout="vertical"
                initialValues={{
                  state: "Rio Grande do Sul",
                  city: "Canoas",
                  district: "Estância Velha"
                }}
              >

                <Divider orientation="left">Endereço</Divider>

                <Form.Item name="state" label="Estado">
                  <Input disabled={!editAddressInfo} />
                </Form.Item>

                <Form.Item name="city" label="Cidade">
                  <Input disabled={!editAddressInfo} />
                </Form.Item>

                <Form.Item name="district" label="Bairro">
                  <Input disabled={!editAddressInfo} />
                </Form.Item>

                <Form.Item >
                  <Row justify={"end"} gutter={editAddressInfo ? 10 : 0}>
                    <Col>
                      <Button hidden={editAddressInfo} onClick={() => setEditAddressInfo(true)} type={"primary"}>Editar campos</Button>
                    </Col>
                    <Col>
                      <Button
                        hidden={!editAddressInfo}
                        onClick={() => { setEditAddressInfo(false) }}
                        htmlType="reset"
                        type={"ghost"}>
                        Cancelar
                      </Button>
                    </Col>

                    <Col>
                      <Button htmlType="submit" hidden={!editAddressInfo} type={"primary"}>Salvar</Button>
                    </Col>
                  </Row>
                </Form.Item>

              </Form>
            </Card>
          </Col>
          <Col span={24}>
            <Card hoverable>
              <Form 
                layout="vertical"
                initialValues={{
                  cell_phone:"984346437"
                }}>
                <Divider orientation="left">Contato</Divider>

                <Form.Item name="cell_phone" label="Telefone">
                  <Input disabled={!editCellPhoneInfo}/>
                </Form.Item>

                <Form.Item >
                  <Row justify={"end"} gutter={editCellPhoneInfo ? 10 : 0}>
                    <Col>
                      <Button hidden={editCellPhoneInfo} onClick={() => setEditCellPhoneInfo(true)} type={"primary"}>Editar campos</Button>
                    </Col>
                    <Col>
                      <Button
                        hidden={!editCellPhoneInfo}
                        onClick={() => { setEditCellPhoneInfo(false) }}
                        htmlType="reset"
                        type={"ghost"}>
                        Cancelar
                      </Button>
                    </Col>

                    <Col>
                      <Button htmlType="submit" hidden={!editCellPhoneInfo} type={"primary"}>Salvar</Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row >
  )
}