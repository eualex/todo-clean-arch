import React, { createContext, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GlobalProvider } from './context/GlobalContext'
import { TodosGatewayHttp } from './infra/gateway/TodosGatewayHttp'

const services = {
  todosGateway: new TodosGatewayHttp()
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalProvider value={services}>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
)
