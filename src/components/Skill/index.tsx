import { Button, Card, Col, Dropdown, Row, Menu, Modal, Form, Input, InputNumber } from "antd"

import { MoreOutlined, EditFilled, StopOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from "react";

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

export const Skill = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const CardSkill = () => {
    const { hex, fontColor } = colorsCard[Math.floor(Math.random() * colorsCard.length)]

    return (<Card
      style={{
        backgroundColor: hex,
        color: fontColor
      }}
      hoverable
      title={
        <Row>
          <Col span={20} ><span style={{ color: fontColor }}>Marceneiro</span></Col>
          <Col span={4}>
            <Dropdown overlay={menu} placement="bottomRight" arrow>
              <Button type="text"><MoreOutlined /></Button>
            </Dropdown>
          </Col>
        </Row>
      }>
      <p>- Manutenção</p>
    </Card>)
  }

  return (
    <>
      <Modal title="Adicionar Habilidade" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical">
          <Form.Item label="Titulo">
            <Input />
          </Form.Item>

          <Form.Item label="Tempo de experiência">
            <InputNumber min={1} max={10} defaultValue={3} />
          </Form.Item>

          <Form.Item label="Descrição">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Row>
        <Col>
          <h1 style={{ color: "#6C6969", fontSize: "16pt" }}>Minhas Habilidades</h1>
        </Col>
        <Col>
          <Button onClick={showModal} style={{ right: '2em', position: "fixed", zIndex: 1, float: "right" }} type="primary">Adiconar</Button>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col xs={{span:24}} sm={{span:12}} md={{span:12}} lg={{span:8}} xl={{span:8}} xxl={{span:8}}>
          <CardSkill />
        </Col>
        <Col xs={{span:24}} sm={{span:12}} md={{span:12}} lg={{span:8}} xl={{span:8}} xxl={{span:8}}>
          <CardSkill />
        </Col>
        <Col xs={{span:24}} sm={{span:12}} md={{span:12}} lg={{span:8}} xl={{span:8}} xxl={{span:8}}>
          <CardSkill />
        </Col>
      </Row>
    </>
  )
}