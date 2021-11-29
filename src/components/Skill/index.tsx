import { Button, Card, Select, Col, Dropdown, Row, Menu, Modal, Form, Input, InputNumber, Empty, Spin, Divider, message } from "antd"

const { Option } = Select;

import { MoreOutlined, EditFilled, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Api } from "../../services/api";
import { capitalize } from "../../helpers/functions";
import { useNavigate } from "react-router-dom";

interface ICardSkill {
  id: string;
  title: string;
  description: string;
  experience: Int16Array;
  type_experience: "y" | "m";
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}

const menu = (id: string, handleDelete: (id: string) => void, handleEdit: (id: string) => void) => {
  return (
    <Menu>
      <Menu.Item onClick={() => handleEdit(id)} >
        <a target="_blank">
          <EditFilled />
          <span style={{ marginLeft: 5 }}>Editar</span>
        </a>
      </Menu.Item>
      {/* <Menu.Item>
        <a target="_blank">
          <StopOutlined />
          <span style={{ marginLeft: 5 }}>Desativar</span>
        </a>
      </Menu.Item> */}
      <Menu.Item style={{ color: "red" }} key="0" onClick={() => handleDelete(id)}>
        <a target="_blank">
          <DeleteOutlined />
          <span style={{ marginLeft: 5 }}>Excluir</span>
        </a>
      </Menu.Item>
    </Menu>
  );
}

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

interface ISkill {
  id: string;
  title: string;
  experience: string;
  description: string;
  type_experience: "y" | "m";
}

export const Skill = () => {
  const navigate = useNavigate()
  const { email } = useAuth()
  const [skills, setSkills] = useState<ISkill[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tExperience, setTExperience] = useState("y");
  const [loading, setLoading] = useState(false)
  const [idEdit, setIdEdit] = useState("")

  const [formSkill] = Form.useForm()

  useEffect(() => {
    getSkills()
  }, [])

  const selectAfter = (
    <Select defaultActiveFirstOption onChange={(e: string) => setTExperience(e)} value={tExperience} defaultValue="Anos" style={{ width: 90 }}>
      <Option value="y">Anos</Option>
      <Option value="m">Meses</Option>
    </Select>
  );

  const CardSkill = ({ id, title, description, experience, type_experience, handleDelete, handleEdit }: ICardSkill) => {
    const { hex, fontColor } = colorsCard[Math.floor(Math.random() * colorsCard.length)]

    return (<Card
      style={{
        backgroundColor: hex,
        color: fontColor
      }}
      hoverable
      title={
        <Row>
          <Col span={20} ><span style={{ color: fontColor }}>{capitalize(title)}</span></Col>
          <Col span={4}>
            <Dropdown overlay={menu(id, handleDelete, handleEdit)} placement="bottomRight" arrow>
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
        setLoading(false)
        return
      }

      setSkills(skills.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (!error || !error.response) {
        message.error("Erro interno, tente mais tarde!")
      }
      else {
        if (error.response.status === 401) navigate('/login')
        else console.error("Erro interno, tente mais tarde!")
      }
    }
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = async (e: any, id: string) => {
    const { title, description, experience } = e

    if (!title || !description || !experience) return

    const data = {
      email,
      type_experience: tExperience,
      title: title,
      description,
      experience
    }

    if (!id) {
      const { data: skill } = await Api.post("skill/new-skill", data)

      if (skills.length > 0)
        setSkills([skill, ...skills])
      else setSkills([skill])
    } else {
      const { data: skill } = await Api.put("skill/update", { ...data, id })
      setSkills([...skills.filter(skill => skill.id != id), skill])
      console.log(skill)
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id: string) => {
    try {
      if (!id) return

      await Api.delete(`skill/delete/?id=${id}`)
        .then(() => {
          setSkills([...skills.filter(skill => skill.id != id)])
          message.success("Habilidade deletada com sucesso!")
        })


    } catch (error) {
      message.error("Erro ao deletar habilidade!")
    }
  }

  const handleEdit = (id: string) => {
    showModal()

    const [skill] = skills.filter((skill: any) => skill.id == id)

    formSkill.setFieldsValue({
      title: capitalize(skill.title),
      experience: skill.experience,
      description: skill.description
    })

    setTExperience(skill.type_experience)
    setIdEdit(id)
  }

  return (
    <>
      <Modal destroyOnClose footer={null} closeIcon={true} title="Habilidade" visible={isModalVisible}>
        <Form
          preserve={false}
          form={formSkill}
          name="form_skill"
          layout="vertical"
          onFinish={(e: any) => handleSubmit(e, idEdit)}>

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
          <Divider orientation="left">Minhas habilidades</Divider>
        </Col>
      </Row>

      <Row
        gutter={[10, 10]}
        justify={skills.length === 0 ? "center" : "start"}
      >
        {loading && <Spin size="large" />}
        {!loading && (skills.length == 0) &&
          <Col>
            <Empty description="Nada cadastrado ainda" />
          </Col>
        }
        {!loading && skills.length > 0 && skills.map((skill: any) => {
          return (
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
              <CardSkill
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                id={skill.id}
                title={skill.title}
                description={skill.description}
                experience={skill.experience}
                type_experience={skill.type_experience}
              />
            </Col>
          )
        })}
      </Row>
    </>
  )
}