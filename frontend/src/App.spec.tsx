import { act, render, screen, userEvent, waitFor } from "@/tests/core";
import { InMemoryTodosGatewayHttp } from "@/tests/inMemoryGateways/InMemoryTodosGatewayHttp";
import App from "./App";
import { GlobalProvider } from "./context/GlobalContext";

const inMemoryServices = {
  todosGateway: new InMemoryTodosGatewayHttp(),
};

describe("App Component", () => {
  // beforeEach(async () => {
  //   const promise = Promise.resolve()

  //   render(
  //     <GlobalProvider value={inMemoryServices}>
  //       <App />
  //     </GlobalProvider>
  //   );

  //   await act(() => promise)
  // });

  // it("should renders correctly", async () => {
  //   render(
  //     <GlobalProvider value={inMemoryServices}>
  //       <App />
  //     </GlobalProvider>
  //   );

  //   const total = screen.getByLabelText("total");
  //   const completed = screen.getByLabelText("completed");

  //   await waitFor(() => {
  //     expect(total.innerHTML).toBe("Total: 1");
  //     expect(completed.innerHTML).toBe("Completed: 100%");
  //   });
  // });

  it("should add item in todo list", async () => {
    const user = userEvent.setup();

    render(
      <GlobalProvider value={inMemoryServices}>
        <App />
      </GlobalProvider>
    );

    const addTodoButton = screen.getByRole("button", { name: /add todo/i });
    const todoDescription = screen.getByRole("textbox");

    await user.type(todoDescription, "A");
    await user.click(addTodoButton);

    const total = screen.getByLabelText("total");
    const completed = screen.getByLabelText("completed");

    expect(total.innerHTML).toBe("Total: 2");
    expect(completed.innerHTML).toBe("Completed: 50%");
  });

  it("should complete item in todo list", async () => {
    const user = userEvent.setup();

    const promise = Promise.resolve()

    render(
      <GlobalProvider value={inMemoryServices}>
        <App />
      </GlobalProvider>
    );

    const completed = screen.getByLabelText("completed");
    const dones = await screen.findAllByLabelText("todo_done");

    const toggleDoneButtons = screen.getAllByRole("button", {
      name: /done\/undone/i,
    });

    await user.click(toggleDoneButtons.at(0) as HTMLElement);

    expect(dones.at(0)?.innerHTML).toBe("false");
    expect(completed.innerHTML).toBe("Completed: 0%");

    await act(() => promise)
  });

  // it("should delete an item from todo list", async () => {
  //   const user = userEvent.setup();

  //   const total = screen.getByLabelText("total");
  //   const completed = screen.getByLabelText("completed");

  //   const deleteTodoButtons = await screen.findAllByRole("button", {
  //     name: /delete/i,
  //   });

  //   await user.click(deleteTodoButtons.at(0) as HTMLElement);

  //   expect(total.innerHTML).toBe("Total: 0");
  //   expect(completed.innerHTML).toBe("Completed: 0%");
  // });

  // it("should not add duplicated todo item", async () => {
  //   const user = userEvent.setup();

  //   const total = screen.getByLabelText("total");
  //   const addTodoButton = screen.getByRole("button", { name: /add todo/i });
  //   const todoDescription = screen.getByRole("textbox");

  //   await user.type(todoDescription, "A");
  //   await user.click(addTodoButton);

  //   expect(total.innerHTML).toBe("Total: 2");

  //   await user.click(addTodoButton);

  //   expect(total.innerHTML).toBe("Total: 2");
  // });
});
