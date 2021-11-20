import { Avatar, Button, Card, Col, Divider, Input, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { CardPerfil } from '../CardPerfil';
const { Search } = Input;

const dados = [
  {
    nome: "Pedro",
    local: "Porto Alegre/RS",
    profissao: "Marceneiro",
    experiencia: "2 anos"
  },
  {
    nome: "Joao",
    local: "Canoas/RS",
    profissao: "Ferreiro",
    experiencia: "1 anos"
  }
]

export const ContractService = () => {
  return (
    <>
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
              <Search placeholder="O que você procura? Ex: Eletricista, manicure" enterButton="Pesquisar" size="large" />
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
          <Row gutter={[10, 10]}>

            {
              dados.map(pessoa => {
                return (
                  <Col span={8}>
                    <CardPerfil nome={pessoa.nome} local={pessoa.local} profissao={pessoa.profissao} experiencia={pessoa.experiencia} />
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