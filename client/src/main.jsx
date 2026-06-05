import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import UserContext from './pages/UserContext.jsx'
import { Provider } from "react-redux"
import store from './pages/redux/store.js'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContext>
      <Provider store={store}>
        <App />
      </Provider>
    </UserContext>
  </BrowserRouter>
)
