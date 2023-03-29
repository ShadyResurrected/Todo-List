import cookieParser from 'cookie-parser'
import express from 'express'
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'

export const app = express()

// Using middleware to read data in json format from body
app.use(express.json())
app.use(cookieParser())

// using router to map the routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/tasks', taskRouter)
 
app.get('/', (req,res) => {
  res.send("Nice Working")
})