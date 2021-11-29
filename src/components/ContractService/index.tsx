import { Col, Divider, Empty, Input, message, Modal, Row, Form, InputNumber, Button } from 'antd';
import { CardPerfil } from '../CardPerfil';
import { useEffect, useState } from 'react';
import { Api } from '../../services/api';
import { useForm } from 'antd/lib/form/Form';
const { Search } = Input;

interface IService {
  id: string;
}

export const ContractService = () => {

  const [services, setServices] = useState<IService[]>([])
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [formContact] = useForm()

  const getServices = async (e: string = "") => {
    try {
      setLoading(true)
      if (!e) {
        const { data: services } = await Api.get(`skill`)
        setServices([...services])
        setLoading(false)
      }
      else {
        const { data: services } = await Api.get(`skill/?title=${e.toLowerCase()}`)
        if (services.error) {
          message.info("Nenhum resultado encontrado")
          setServices([])
          setLoading(false)
        }
        else {
          setServices([...services])
          setLoading(false)
        }
      }

    } catch (error) {
      setLoading(false)
    }
  }

  const handleContact = (email: string) => {
    showModal()

    console.log(email)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false)
  }

  const handleSubmit = () => {
    closeModal()
    message.success("Seu contato foi registrado!")
  }

  const handleCancel = () => {
    closeModal()
  }

  useEffect(() => {
    getServices()
  }, [])

  return (
    <>

      <Modal destroyOnClose footer={null} closeIcon={true} title="Entrar em contato" visible={isModalVisible}>
        <Form
          preserve={false}
          form={formContact}
          name="form_skill"
          layout="vertical"
          onFinish={handleSubmit}>

          <Form.Item label="Titulo da mensagem" name="title" rules={[{ required: true, message: 'Preencha o campo!' }]}>
            <Input placeholder="Desejo saber mais!" />
          </Form.Item>


          <Form.Item label="Descrição" name="description" rules={[{ required: true, message: 'Preencha o campo!' }]}>
            <Input.TextArea placeholder="Conte um pouco sobre o que você precisa" />
          </Form.Item>

          <Form.Item>
            <Row justify={"end"} gutter={10}>
              <Col>
                <Button onClick={() => handleCancel()} type={"ghost"}>Cancelar</Button>
              </Col>

              <Col>
                <Button htmlType="submit" type={"primary"}>Enviar</Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
      <Row gutter={[20, 10]}>
        <Col span={24}>
          <Row >
            <Col span={24}>
              <h1 style={{ color: "#6C6969", fontSize: "16pt" }}>Contratar serviço</h1>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row >
            <Col span={24}>
              <Search onSearch={(e) => getServices(e)} placeholder="O que você procura? Ex: Eletricista, manicure" enterButton="Pesquisar" size="large" loading={loading} />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row >
            <Col span={24}>
              <Divider orientation="left">Perfis encontrados</Divider>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row justify={services.length === 0 ? "center" : "start"} gutter={[10, 10]}>
            {services.length === 0 &&
              <Col>
                <Empty description="Nenhum resultado" />
              </Col>
            }
            {services && services[0] &&
              services.map((service: any) => {
                return (
                  <Col xs={{ span: 24 }} sm={{ span: 16 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 10 }} xxl={{ span: 12 }}
                    key={service.id}>
                    <CardPerfil
                      email={service.User.email}
                      description={service.description}
                      first_name={service.User.first_name}
                      last_name={service.User.last_name}
                      avatar={service.User.avatar_url}
                      cityId={service.User.city}
                      title={service.title}
                      type_experience={service.type_experience}
                      experience={service.experience}
                      handleContact={handleContact} />
                  </Col>
                )
              })
            }
          </Row>
        </Col>
      </Row>
    </>
  )
}