import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/app.scss'

export const server = "https://todo-server-zhvk.onrender.com/api/v1"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
