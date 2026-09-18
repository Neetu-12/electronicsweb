import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'

export default function Wishlist() {
  let items = []
  try { items = JSON.parse(localStorage.getItem('volt_wishlist') || '[]') } catch { items = [] }
  return <section className="catalog"><p className="eyebrow">Your saved edit</p><h2>Wishlist</h2>{items.length ? <div className="product-grid">{items.map((product) => <ProductCard key={product._id || product.id} product={product} />)}</div> : <p className="cart-empty">Your wishlist is empty. <Link to="/products">Discover products</Link></p>}</section>
}
