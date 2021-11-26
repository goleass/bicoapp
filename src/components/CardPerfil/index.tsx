import { Avatar, Button, Card, Col, Divider, Input, Row, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ApiLocate } from '../../services/api';
import { useEffect, useState } from 'react';

import { capitalize } from '../../helpers/functions';

interface ICardPerfil {
  avatar: string;
  first_name: string;
  last_name: string;
  cityId: Number;
  title: string;
  experience: Number;
  type_experience: "y" | "m";
}

interface ILocal {
  state: string;
  city: string;
}

var typeExperience = {
  y: "ano(os)",
  m: "mes(es)"
}

export const CardPerfil = ({ avatar, first_name, last_name, cityId, title, experience, type_experience }: ICardPerfil) => {

  const [local, setLocal] = useState({state:"",city:""})

  const getLocal = async (id: any) => {
    const { data } = await ApiLocate.get(`distritos/${id}`)

    setLocal({ city: data[0].nome, state: data[0].municipio['regiao-imediata']['regiao-intermediaria']['UF']['nome'] })
  }

  let lastName = last_name ? last_name.split(" ").map(l => capitalize(l)) : [undefined]
  let name = [capitalize(first_name), ...lastName]
  name = name.filter(n => n)

  useEffect(() => {
    getLocal(cityId)
  }, [])

  return (
    <Card
      headStyle={{}}
      hoverable
      title={
        <Row gutter={25} justify="start" >
          <Col xs={{ span: 6 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }}>
            <Avatar size={50} src={avatar} icon={<UserOutlined />} />
          </Col>
          <Col xs={{ span: 12 }} sm={{ span: 16 }} md={{ span: 16 }} lg={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 6 }}>
            <Row>
              <Col>
                <div style={{ fontSize: '10pt', fontWeight: 'bold', wordBreak: 'break-word', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                  {name.join(" ")}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <span style={{ fontSize: '8pt', }}>{local.state}/{local.city}</span>
              </Col>
            </Row>
          </Col>
        </Row>
      }>
      <Row justify="space-between">
        <Col>
          <p>{capitalize(title)}</p>
        </Col>
        <Col>
          <Tag color="#f50">{experience} {typeExperience[type_experience]} de experiência</Tag>
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