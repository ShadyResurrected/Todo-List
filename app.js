import cookieParser from 'cookie-parser'
import express from 'express'
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import { errorMiddleware } from './middlewares/error.js'
import cors from 'cors'

export const app = express()

// Using middleware to read data in json format from body
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin : [], // website url that should be allowed to access this api
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}))

// using router to map the routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/tasks', taskRouter)
 
app.get('/', (req,res) => {
  res.send("Nice Working")
})


// Error middleware (handles error)
// Whenever next will be called in any function this error handler will be called
app.use(errorMiddleware)