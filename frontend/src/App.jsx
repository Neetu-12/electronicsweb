import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Checkout from './pages/Checkout.jsx'
import Orders from './pages/Orders.jsx'
import Dashboard from './admin/Dashboard.jsx'
import AdminProducts from './admin/Products.jsx'
import AdminOrders from './admin/Orders.jsx'
import './App.css'

export default function App() {
  return <BrowserRouter>
    <CartProvider><div className="storefront">
      <div className="announcement">Free shipping on orders over $75 <span>•</span> 30-day easy returns</div>
      <Navbar />
      <main>
        <Routes><Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} /></Routes>
      </main>
      <Footer />
    </div>
    </CartProvider>
  </BrowserRouter>
}
