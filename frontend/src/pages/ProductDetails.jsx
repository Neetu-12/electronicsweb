import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { api } from '../services/api.js'
import Loader from '../components/Loader.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const { addItem } = useCart()
  const { toggleItem, hasItem } = useWishlist()
  const [product, setProduct] = useState(null)
  useEffect(() => { api.getProduct(id).then(setProduct).catch(() => setProduct(null)) }, [id])
  if (!product) return <Loader />
  const saved = hasItem(product._id || product.id)
  return <section className="catalog product-details"><div className="product-image"><img src={product.image} alt={product.name} /></div><div><p className="eyebrow">{product.category}</p><h2>{product.name}</h2><p className="hero-text">{product.description || 'A thoughtfully selected electronic essential for your everyday setup.'}</p><div className="price"><strong>${product.price}</strong></div><div className="product-actions"><button className="primary-button" onClick={() => addItem(product)}>Add to cart <span>↗</span></button><button className="secondary-button" onClick={() => toggleItem(product)}>{saved ? 'Saved to wishlist' : '♡ Save to wishlist'}</button></div></div></section>
}
