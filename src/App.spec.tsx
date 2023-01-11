import { render, screen, userEvent } from '@/tests/core'
import App from './App'

describe('App Component', () => {
  it('should test todo list', async () => {
    const user = userEvent.setup()

    render(<App />)

    const total = screen.getByLabelText('total')
    const completed = screen.getByLabelText('completed')
    const addTodoButton = screen.getByRole('button', { name: /add todo/i })
    const todoDescription = screen.getByRole('textbox')

    await user.type(todoDescription, 'A')
    await user.click(addTodoButton)

    expect(total.innerHTML).toBe('Total: 1')
    expect(completed.innerHTML).toBe('Completed: 0%')
  })
})
