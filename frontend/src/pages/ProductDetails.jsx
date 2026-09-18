import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { api } from '../services/api.js'
import Loader from '../components/Loader.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [saved, setSaved] = useState(() => isWishlisted(id))
  useEffect(() => { api.getProduct(id).then(setProduct).catch(() => setProduct(null)) }, [id])
  if (!product) return <Loader />
  const toggleWishlist = () => { const items = getWishlist(); const exists = items.some((item) => (item._id || item.id) === (product._id || product.id)); const next = exists ? items.filter((item) => (item._id || item.id) !== (product._id || product.id)) : [...items, product]; localStorage.setItem('volt_wishlist', JSON.stringify(next)); setSaved(!exists) }
  return <section className="catalog product-details"><div className="product-image"><img src={product.image} alt={product.name} /></div><div><p className="eyebrow">{product.category}</p><h2>{product.name}</h2><p className="hero-text">{product.description || 'A thoughtfully selected electronic essential for your everyday setup.'}</p><div className="price"><strong>${product.price}</strong></div><div className="product-actions"><button className="primary-button" onClick={() => addItem(product)}>Add to cart <span>↗</span></button><button className="secondary-button" onClick={toggleWishlist}>{saved ? 'Saved to wishlist' : '♡ Save to wishlist'}</button></div></div></section>
}

function getWishlist() { try { return JSON.parse(localStorage.getItem('volt_wishlist') || '[]') } catch { return [] } }
function isWishlisted(id) { return getWishlist().some((item) => (item._id || item.id) === id) }
