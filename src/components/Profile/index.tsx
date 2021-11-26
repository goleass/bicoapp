import { Select, Avatar, Card, Col, Row, Form, Input, Divider, Descriptions, Button, message, Image } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider/useAuth"
import { Api, ApiLocate } from "../../services/api"
import { getUserLocalStorage } from "../../context/AuthProvider/util";

import './style.css'

const { Option } = Select

export const Profile = () => {
  const { email, setUserU } = useAuth()
  const [editAvatar, setEditAvatar] = useState(false)
  const [editPersonalInfo, setEditPersonalInfo] = useState(false)
  const [editPassword, setEditPassword] = useState(false)
  const [editAddressInfo, setEditAddressInfo] = useState(false)
  const [editCellPhoneInfo, setEditCellPhoneInfo] = useState(false)
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [state, setState] = useState(undefined)
  const [avatar, setAvatar] = useState("")

  const [formAvatar] = Form.useForm()
  const [formPerfil] = Form.useForm()
  const [formPassword] = Form.useForm()
  const [formPhone] = Form.useForm()
  const [formLocation] = Form.useForm()

  const getStates = async () => {
    const { data } = await ApiLocate.get("/estados/?orderBy=nome")

    setStates(data)
  }

  const getCities = async (id?: Int16Array) => {
    const stateId = state || id
    if (state || id) {
      const { data } = await ApiLocate.get(`/estados/${stateId}/distritos/?orderBy=nome`)
      setCities(data)
    }
  }

  const getUser = async () => {
    const { data } = await Api.get(`user?email=${email}`)

    formPerfil.setFieldsValue({
      first_name: data.first_name.toUpperCase(),
      last_name: data.last_name.toUpperCase(),
      gender: data.gender,
      identity_number: data.identity_number,
    });

    formPhone.setFieldsValue({
      cell_phone: data.phone
    });

    setState(data.state)
    setAvatar(data.avatar_url)

    formLocation.setFieldsValue({
      state: data.state,
      city: data.city
    });

  }

  const handleFinishPerfil = async (e: any) => {
    try {
      const data = {
        first_name: e.first_name.toLowerCase(),
        last_name: e.last_name.toLowerCase(),
        gender: e.gender,
        identity_number: e.identity_number,
        email
      }

      await Api.put("user/update", data)

      formPerfil.setFieldsValue({
        first_name: data.first_name.toUpperCase(),
        last_name: data.last_name.toUpperCase(),
        gender: data.gender,
        identity_number: data.identity_number,
      });

      setUserU({ ...getUserLocalStorage(), first_name: e.first_name.toLowerCase() });

      message.success("Informações atualizadas!")

      setEditPersonalInfo(false)
    } catch (error) {
      message.error("Erro ao atualizar informações!")
    }
  }

  const handleFinishPhone = async (e: any) => {
    try {
      const data = {
        phone: e.cell_phone,
        email
      }

      await Api.put("user/update", data)

      formPhone.setFieldsValue({
        cell_phone: data.phone,
      });

      message.success("Informações atualizadas!")

      setEditCellPhoneInfo(false)
    } catch (error) {
      message.error("Erro ao atualizar informações!")
    }
  }

  const handleFinishLocation = async (e: any) => {
    try {
      const data = {
        state: e.state,
        city: e.city,
        email
      }

      await Api.put("user/update", data)

      formLocation.setFieldsValue({
        state: data.state,
        city: data.city,
      });

      message.success("Informações atualizadas!")

      setEditAddressInfo(false)
    } catch (error) {
      message.error("Erro ao atualizar informações!")
    }
  }

  const handleFinishPassword = async (e: any) => {
    try {
      const data = {
        email,
        password: e.password
      }

      await Api.put("auth/update-password", data)

      message.success("Informações atualizadas!")

      setEditPassword(false)
    } catch (error) {
      message.error("Erro ao atualizar informações!")
    }
  }

  const handleClickAvatar = async () => {
    setEditAvatar(false)
    try {
      const url_avatar = formAvatar.getFieldValue("url_avatar")

      if (!url_avatar) return

      const data = {
        avatar_url: url_avatar,
        email
      }

      await Api.put("user/update", data)

      setAvatar(url_avatar)

      setEditCellPhoneInfo(false)

      message.success("Informações atualizadas!")
    } catch (error) {
      message.error("Erro ao atualizar informações!")
    }
  }

  useEffect(() => {
    try {
      getUser()
      getStates()
    } catch (error) {

    }
  }, [])

  useEffect(() => {
    try {
      getCities()
    } catch (error) {

    }
  }, [state])

  return (
    <>
      <Row>
        <Col>
          <h1 style={{ color: "#6C6969", fontSize: "16pt" }}>Meu perfil</h1>
        </Col>
      </Row>

      <Row gutter={[20, 20]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 24 }}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Card hoverable title={
                <Row gutter={[10, 10]} justify="center">
                  <Col span={12} className="iii">
                    <div hidden={!avatar} className="profilepic">
                      <img className="profilepic__image" src={avatar} width="120" height="120" alt="Profibild" />
                      <div className="profilepic__content" onClick={() => setEditAvatar(true)}>
                        <span className="profilepic__text">Editar</span>
                      </div>
                    </div>

                    {!avatar && <Avatar size={80} icon={
                      <div className="profilepic-notimage">
                        <UserOutlined className="profilepic__image" />
                        <div className="profilepic__content" onClick={() => setEditAvatar(true)}>
                          <span className="profilepic__text">Editar</span>
                        </div>
                      </div>
                    } />}
                  </Col>

                  <Col span={24}>
                    <Form hidden={!editAvatar} form={formAvatar} layout="vertical">
                      <Form.Item name="url_avatar" label="Url do Avatar">
                        <Input />
                      </Form.Item>
                      <Form.Item>
                        <Row justify={"end"} gutter={10}>
                          <Col>
                            <Button onClick={() => setEditAvatar(false)} type={"ghost"}>Cancelar</Button>
                          </Col>

                          <Col>
                            <Button onClick={() => handleClickAvatar()} type={"primary"}>Salvar</Button>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              }>

                <Form
                  name="perfil"
                  initialValues={{ ...formPerfil.getFieldsValue() }}
                  form={formPerfil}
                  layout={"vertical"}
                  onFinish={handleFinishPerfil}>
                  <Form.Item name={"first_name"} label={"Primeiro nome"}
                    rules={[{ required: true, message: 'Preencha o campo!' }]}
                  >
                    <Input disabled={!editPersonalInfo} />
                  </Form.Item>

                  <Form.Item name={"last_name"} label={"Sobrenome"}
                    rules={[{ required: true, message: 'Preencha o campo!' }]}>
                    <Input disabled={!editPersonalInfo} />
                  </Form.Item>

                  <Form.Item name={"identity_number"} label={"CPF"}
                    rules={[{ required: true, message: 'Preencha o campo!' }]}
                  >
                    <Input disabled={!editPersonalInfo} />
                  </Form.Item>

                  <Form.Item name={"gender"} label={"Gênero"}>
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
                        <Button hidden={!editPersonalInfo} htmlType="submit" type={"primary"}>Salvar</Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            <Col span={24}>
              <Card hoverable>
                <Form
                  name="password"
                  form={formPassword}
                  onFinish={handleFinishPassword}
                  layout={"vertical"}>

                  <Divider orientation="left">Configurações de Conta</Divider>

                  <Form.Item hidden={editPassword} name={"password"} label={"Senha"}>
                    <Input.Password disabled={!editPassword} />
                  </Form.Item>

                  <Form.Item
                    hidden={!editPassword}
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
                    hidden={!editPassword}
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
                    <Row justify={"end"} gutter={editPassword ? 10 : 0}>
                      <Col>
                        <Button hidden={editPassword} onClick={() => setEditPassword(true)} type={"primary"}>Editar campos</Button>
                      </Col>
                      <Col>
                        <Button
                          hidden={!editPassword}
                          onClick={() => { setEditPassword(false) }}
                          htmlType="reset"
                          type={"ghost"}>
                          Cancelar
                        </Button>
                      </Col>

                      <Col>
                        <Button htmlType="submit" hidden={!editPassword} type={"primary"}>Salvar</Button>
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
                  name="location"
                  form={formLocation}
                  initialValues={{ ...formLocation.getFieldsValue() }}
                  onFinish={handleFinishLocation}
                >

                  <Divider orientation="left">Endereço</Divider>

                  <Form.Item
                    name={"state"} label={"Estado"}>
                    <Select
                      disabled={!editAddressInfo}
                      onChange={(e: any) => setState(e)}
                    >
                      {states && states.map(({ id, sigla, nome }) => {
                        return (
                          <Option value={id}>{sigla} - {nome}</Option>
                        )
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name={"city"} label={"Cidade"}>
                    <Select
                      disabled={!editAddressInfo}
                    >
                      {cities && cities.map(({ id, nome }) => {
                        return (
                          <Option value={id}>{nome}</Option>
                        )
                      })}
                    </Select>
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
                  name="formPhone"
                  layout="vertical"
                  form={formPhone}
                  onFinish={handleFinishPhone}
                  initialValues={{ ...formPhone.getFieldsValue() }}>
                  <Divider orientation="left">Contato</Divider>

                  <Form.Item name="cell_phone" label="Telefone">
                    <Input disabled={!editCellPhoneInfo} />
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
    </>
  )
}