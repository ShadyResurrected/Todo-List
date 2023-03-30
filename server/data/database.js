import mongoose from 'mongoose'

export const connectDB = () => { mongoose.connect(`mongodb+srv://admin:${process.env.password}@cluster0.zbgxwqd.mongodb.net/?retryWrites=true&w=majority`,{
  dbName : "NodeJsApi"
}).then(() => console.log("Database Connected"))
.catch((e) => console.log(e));
  }