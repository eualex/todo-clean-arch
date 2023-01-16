import { Subscriber } from "@/infra/observers/Subscriber";
import { Todo } from "./Todo";

export class TodoList extends Subscriber {
  todos: Todo[];

  constructor() {
    super()
    this.todos = [];
  }

  getTotal() {
    return this.todos.length;
  }

  getCompleted() {
    const total = this.getTotal();
    const completed = this.todos.filter((todo) => todo.done).length;

    return total ? Math.round((completed / total) * 100) : 0;
  }

  addTodo(description: string, done = false) {
    const isDuplicaded = this.todos.some(
      (todo) => todo.description === description
    );

    if (isDuplicaded) return;

    const todo = new Todo(description, done)

    this.todos.push(todo);

    this.observers.forEach(observer => {
      observer(this.todos)
    })
  }

  addTodos(todos: any) {
    todos.forEach((todo: any) => {
        this.addTodo(todo.description, todo.done)
    });
  }

  deleteTodo(description: string) {
    this.todos = this.todos.filter((todo) => todo.description !== description);

    this.observers.forEach(observer => observer(this.todos))
  }
}
