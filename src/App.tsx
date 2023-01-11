import { FormEvent, useState } from "react";

function App() {
  const [todos, setTodos] = useState<any[]>([]);

  function getTotal() {
    return todos.length;
  }

  function getCompleted() {
    const total = getTotal();
    const completed = todos.filter((todo) => todo.done).length;

    return Math.round((completed / total) * 100);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    // const description = e.target.description.value;

    console.log(e.target)

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        // description,
        done: false,
      },
    ]);
  }

  return (
    <div className="">
      <form name="todo_form" onSubmit={handleSubmit}>
        <input name="description" />

        <button>Add todo</button>
      </form>

      <div aria-label="total">Total: {getTotal()}</div>
      <div aria-label="completed">Completed: {getCompleted()}%</div>
    </div>
  );
}

export default App;
