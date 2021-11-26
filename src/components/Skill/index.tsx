import { Button, Card, Select, Col, Dropdown, Row, Menu, Modal, Form, Input, InputNumber, Empty, Spin, Divider } from "antd"

const { Option } = Select;

import { MoreOutlined, EditFilled, StopOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Api } from "../../services/api";

interface ICardSkill {
  title: string;
  description: string;
  experience: Int16Array;
  type_experience: "y" | "m"
}

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank">
        <EditFilled />
        <span style={{ marginLeft: 5 }}>Editar</span>
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank">
        <StopOutlined />
        <span style={{ marginLeft: 5 }}>Desativar</span>
      </a>
    </Menu.Item>
    <Menu.Item style={{ color: "red" }}>
      <a target="_blank">
        <DeleteOutlined />
        <span style={{ marginLeft: 5 }}>Excluir</span>
      </a>
    </Menu.Item>
  </Menu>
);

const colorsCard = [
  { "hex": "#45B69C", "fontColor": "#FFF" },
  { "hex": "#4A7776", "fontColor": "#FFF" },
  { "hex": "#157145", "fontColor": "#FFF" },
  { "hex": "#B4C3A2", "fontColor": "#000" },
  { "hex": "#A2BDA0", "fontColor": "#FFF" },
  { "hex": "#519E8A", "fontColor": "#FFF" },
  { "hex": "#BEE9E8", "fontColor": "#000" },
  { "hex": "#383D3B", "fontColor": "#FFF" },
  { "hex": "#2D2D2A", "fontColor": "#FFF" },
]

var typeExperience = {
  y: "ano(os)",
  m: "mes(es)"
}

export const Skill = () => {
  const { email } = useAuth()
  const [skills, setSkills] = useState([{}]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tExperience, setTExperience] = useState("y");
  const [loading, setLoading] = useState(false)

  const [formSkill] = Form.useForm()

  const selectAfter = (
    <Select defaultActiveFirstOption onChange={(e: string) => setTExperience(e)} defaultValue="Anos" style={{ width: 90 }}>
      <Option value="y">Anos</Option>
      <Option value="m">Meses</Option>
    </Select>
  );

  const CardSkill = ({ title, description, experience, type_experience }: ICardSkill) => {
    const { hex, fontColor } = colorsCard[Math.floor(Math.random() * colorsCard.length)]

    return (<Card
      style={{
        backgroundColor: hex,
        color: fontColor
      }}
      hoverable
      title={
        <Row>
          <Col span={20} ><span style={{ color: fontColor }}>{title}</span></Col>
          <Col span={4}>
            <Dropdown overlay={menu} placement="bottomRight" arrow>
              <Button type="text"><MoreOutlined /></Button>
            </Dropdown>
          </Col>
        </Row>
      }>
      <p>{experience} {typeExperience[type_experience]}</p>
      <p>{description}</p>
    </Card>)
  }

  const getSkills = async () => {
    try {
      setLoading(true)
      const skills = await Api.get(`skill/?email=${email}`)

      if (skills.data.error) {
        console.info(skills.data.error)
        setLoading(false)
        return
      }

      setSkills(skills.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = async (e: any) => {
    const { title, description, experience } = e

    if (!title || !description || !experience) return

    const data = {
      email,
      type_experience: tExperience,
      title: title,
      description,
      experience
    }

    const { data: skill } = await Api.post("skill/new-skill", data)

    console.log(skill)

    if (skills.length > 0)
      setSkills([skill, ...skills])
    else setSkills([skill])

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getSkills()
  }, [])

  return (
    <>
      <Modal footer={null} closeIcon={true} title="Adicionar Habilidade" visible={isModalVisible}>
        <Form
          preserve={false}
          form={formSkill}
          name="form_skill"
          layout="vertical"
          onFinish={handleSubmit}>

          <Form.Item label="Titulo" name="title" rules={[{ required: true, message: 'Preencha o campo!' }]}>
            <Input placeholder="Marceneiro" />
          </Form.Item>

          <Form.Item label="Tempo de experiência" name="experience" rules={[{ required: true, message: 'Preencha o campo!' }]}>
            <InputNumber placeholder="3" min={1} addonAfter={selectAfter} />
          </Form.Item>

          <Form.Item label="Descrição" name="description" rules={[{ required: true, message: 'Preencha o campo!' }]}>
            <Input.TextArea placeholder="Alguma descrição" />
          </Form.Item>

          <Form.Item>
            <Row justify={"end"} gutter={10}>
              <Col>
                <Button onClick={() => handleCancel()} type={"ghost"}>Cancelar</Button>
              </Col>

              <Col>
                <Button htmlType="submit" type={"primary"}>Salvar</Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>

      <Row justify="space-between" align="middle">
        <Col>
          <h1 style={{ color: "#6C6969", fontSize: "16pt" }}>Habilidades</h1>
        </Col>
        <Col>
          <Button onClick={showModal} type="primary">Adiconar</Button>
        </Col>
      </Row>

      <Row >
        <Col span={24}>
          <Divider orientation="left">Suas habilidades</Divider>
        </Col>
      </Row>

      <Row
        gutter={[10, 10]}
        justify={skills.length === 0 ? "center" : "start"}
      >
        {loading && <Spin size="large" />}
        {!loading && skills.length == 0 &&
          <Col>
            <Empty description="Nada cadastrado ainda" />
          </Col>
        }
        {skills.length > 0 && skills.map((skill: any) => {
          return (
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
              <CardSkill title={skill.title} description={skill.description} experience={skill.experience} type_experience={skill.type_experience} />
            </Col>
          )
        })}
      </Row>
    </>
  )
}