import Sidebard from './components/sidebar'
import Client from './pages/client'
import Order from './pages/order'
import Product from './pages/product'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/main.css'
import Dashboard from './pages/dashboard'
import Layout from './components/layout'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/products' element={<Product />} />
          <Route path='/clients' element={<Client />} />
          <Route path='/orders' element={<Order />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
