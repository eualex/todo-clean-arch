import { Fragment, useEffect, useRef, useState } from "react";
import { useGlobal } from "./context/GlobalContext";
import { TodoList } from "./entity/TodoList";

function App() {
  const { todosGateway } = useGlobal();

  const [todoList, setTodoList] = useState<TodoList>(new TodoList());
  const descriptionRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   todosGateway.getTodos().then((res) => {
  //     setTodoList(todo => {
  //       todo.
  //     });
  //   });
  // }, []);

  return (
    <div>
      <div>
        {todoList.todos?.map((todo) => (
          <Fragment key={todo.description}>
            <div style={{ display: "inline-flex", gap: "1rem" }}>
              <p aria-label="todo_description">{todo.description}</p>
              <p aria-label="todo_done">{String(todo.done)}</p>
              <button onClick={() => todo.toggleDone()}>done/undone</button>
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
