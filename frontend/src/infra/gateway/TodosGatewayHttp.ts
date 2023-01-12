import axios from "axios";
import { TodosGateway } from "./TodosGateway";

export class TodosGatewayHttp implements TodosGateway {
  async getTodos(): Promise<any> {
    const response = await axios.get('http://localhost:3333/todos')
    return response.data
  }
}
