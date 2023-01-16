import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import { useGlobal } from "./context/GlobalContext";
import { Todo } from "./entity/Todo";
import { TodoList } from "./entity/TodoList";

const todoList = new TodoList();

function useTodos() {
  const getSnapshot = () => todoList.todos;
  const subscribe = (observer: Function) => {
    todoList.subscribe(observer);

    return () => {
      todoList.unsubscribe(observer);
    };
  }

  return useSyncExternalStore(subscribe, getSnapshot);
}

function App() {
  const { todosGateway } = useGlobal();

  const todos = useTodos();
  const descriptionRef = useRef<HTMLInputElement>(null);

  console.log(todos);

  useEffect(() => {
    todosGateway.getTodos().then((res: Todo[]) => {
      todoList.addTodos(res);
    });
  }, []);

  return (
    <div>
      <div>
        {todos?.map((todo) => (
          <Fragment key={todo.description}>
            <div style={{ display: "inline-flex", gap: "1rem" }}>
              <p aria-label="todo_description">{todo.description}</p>
              <p aria-label="todo_done">{String(todo.done)}</p>
              {/* <button onClick={() => toggleTodoDone(todo)}>done/undone</button> */}
              <button onClick={() => todoList.deleteTodo(todo.description)}>
                delete
              </button>
            </div>
            <br />
          </Fragment>
        ))}
      </div>

      <form name="todo_form">
        <input ref={descriptionRef} name="description" />

        <button
          onClick={() => {
            todoList.addTodo(descriptionRef.current?.value as string);
          }}
          type="button"
        >
          Add todo
        </button>
      </form>

      <div aria-label="total">Total: {todoList.getTotal()}</div>
      <div aria-label="completed">Completed: {todoList.getCompleted()}%</div>
    </div>
  );
}

export default App;
