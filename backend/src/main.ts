import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const todos = [
  { description: 'D', done: true }
]

app.get('/todos', (_, res) => {
  res.json(todos)
})

app.listen(3333)
