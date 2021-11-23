import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Affix, Col, Layout, Menu, message, Row } from 'antd';
import './style.css'
import {
  UserOutlined,
  LogoutOutlined,
  OrderedListOutlined
} from '@ant-design/icons';

import { useAuth } from '../../context/AuthProvider/useAuth';
import { Profile } from '../Profile';
import { ContractService } from '../ContractService';
import { Skill } from '../Skill';
import { Footer } from 'antd/lib/layout/layout';

const { Header, Sider, Content } = Layout;

const componentsDashboard = [
  <Profile />,
  <ContractService />,
  <h1>Meus serviços</h1>,
  <Skill />
]

const Teste = ({ componentKey }: any) => {
  return componentsDashboard[componentKey]
}

function Dashboard() {
  const auth = useAuth()
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false)
  const [menuKey, setMenuKey] = useState("0")


  function logout() {
    auth.logout()
    message.info("Você está desconectado!")
    navigate('/home')
  }

  const handleClick = (e: any) => {
    setMenuKey(e.key)
  }

  return (
    <Layout
      style={{
        minHeight: '100vh'
      }}
    >
      <Sider
        breakpoint="md"
        collapsedWidth="0px"

        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          setCollapsed(collapsed)
        }}
      >
        <Affix>
          <div className="logo"> BicoApp</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
            <Menu.Item key="0" onClick={handleClick} icon={<UserOutlined />}>
              Meu perfil
            </Menu.Item>
            <Menu.Item key="1" onClick={handleClick} icon={<UserOutlined />}>
              Contratar serviço
            </Menu.Item>
            <Menu.Item key="2" onClick={handleClick} icon={<UserOutlined />}>
              Meus serviços
            </Menu.Item>
            <Menu.Item key="3" onClick={handleClick} icon={<OrderedListOutlined />} >
              Habilidades
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />} onClick={() => logout()}>
              Sair
            </Menu.Item>
          </Menu>
        </Affix>
      </Sider>
      <Layout className="site-layout">
        <Affix>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
            <Row justify={"space-between"}>
              <Col>
                {collapsed && <div className="logo-header"> BicoApp</div>}
              </Col>
              <Col>
                {<div className="wellcome-header">Olá, {auth.first_name}</div>}
              </Col>
            </Row>

          </Header>
        </Affix>
        <Content
          className="site-layout-background-content"
          style={{ margin: '16px 16px 0', padding: 10, minHeight: 600 }}
        >
          <Teste componentKey={menuKey} />
        </Content>

        <Footer
          style={{
            textAlign: 'center'
          }}
        >
          <p style={{ fontSize: 18, color: '#000' }}><span style={{ color: '#FFBB33', fontWeight: 'bold' }}>BicoApp</span> &copy; 2021</p>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Dashboard