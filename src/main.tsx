import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/lib/locale/pt_BR';

import App from './App'
import 'antd/dist/antd.css'

ReactDOM.render(
    <ConfigProvider locale={ptBR}>
      <App />
    </ConfigProvider>,
  document.getElementById('root')
)
