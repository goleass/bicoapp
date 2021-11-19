import { Link } from 'react-router-dom'
import { Button, Layout } from "antd"

const { Header, Content, Footer } = Layout

function Home() {
  return (
    <>
      <Layout
        style={{
          height: '100vh'
        }}
      >
        <Header />

        <Content
          style={{
            textAlign: 'center',
            marginTop: 100
          }}>

          <h1 style={{ fontSize: '40px' }}>Bem-vindo ao <span style={{ color: '#FFBB33', backgroundColor: '#001529', padding: '0 10px' }}>BicoApp</span></h1>
          <p style={{ fontSize: 18, color: '#7B7B7B' }}>Procure alguém para resolver seu problema</p>
          <p style={{ fontSize: 18, color: '#7B7B7B' }}>ou ofereça um serviço agora!</p>
          <Link to='/dashboard'>
            <Button style={{ backgroundColor: '#001529', color: '#FFF' }} type='default'>Começar</Button>
          </Link>

        </Content>

        <Footer
          style={{
            backgroundColor: '#001529',
            textAlign: 'center'
          }}
        >
          <p style={{ fontSize: 18, color: '#FFF' }}><span style={{ color: '#FFBB33' }}>BicoApp</span> &copy; 2021</p>
        </Footer>
      </Layout>
    </>
  )
}

export default Home