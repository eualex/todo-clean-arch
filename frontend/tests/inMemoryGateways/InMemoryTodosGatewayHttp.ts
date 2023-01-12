import { TodosGateway } from '../../src/infra/gateway/TodosGateway'

export class InMemoryTodosGatewayHttp implements TodosGateway {
  async getTodos() {
    return Promise.resolve([
      {
        description: 'D',
        done: true
      }
    ])
  }
}
