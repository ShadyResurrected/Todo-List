import {app} from './app.js'
import {connectDB} from './data/database.js'

connectDB()

app.listen(4001, () => {
  console.log(`Server is running on port ${process.env.PORT} and in ${process.env.NODE_ENV} mode`)
})