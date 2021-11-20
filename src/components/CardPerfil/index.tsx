import { Avatar, Button, Card, Col, Divider, Input, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface ICardPerfil {
  nome: string;
  local: string;
  profissao: string;
  experiencia: string;
}

export const CardPerfil = ({ nome, local, profissao, experiencia }: ICardPerfil) => {
  return (
    <Card
      hoverable
      title={
        <Row gutter={25}>
          <Col span={8}>
            <Avatar size={50} icon={<UserOutlined />} />
          </Col>
          <Col span={16}>
            <Row>
              <Col>
                <span style={{ fontSize: '10pt', fontWeight: 'bold' }}>{nome}</span></Col>
            </Row>
            <Row>
              <Col>
                <span style={{ fontSize: '8pt', }}>{local}</span>
              </Col>
            </Row>
          </Col>
        </Row>
      }>
      <Row justify="space-between">
        <Col>
          <p>{profissao}</p>
        </Col>
        <Col>
          <span>{experiencia}</span>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Button block size="small" >Entrar em contato</Button>
        </Col>
      </Row>
    </Card>
  )
}