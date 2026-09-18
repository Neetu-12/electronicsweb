import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [showSuccess, setShowSuccess] = useState(false)
  const id = product._id || product.id

  useEffect(() => {
    if (!showSuccess) return undefined;
    const timeout = setTimeout(() => setShowSuccess(false), 2200);
    return () => clearTimeout(timeout)
  }, [showSuccess])

  const handleAdd = () => {
    addItem(product); setShowSuccess(true)
  }
  return <article className="product-card"><div className="product-image"><img src={product.image} alt={product.name} />
    <span className="badge">{product.badge || product.category}</span>
    <button className="quick-add" onClick={handleAdd} aria-label={`Add ${product.name} to cart`}>+</button>
    {showSuccess && <div className="add-success" role="status">Item added successfully</div>}</div>

    <div className="product-info">
      <div className="product-meta">
        <span>{product.category}</span>
        <span>★ {product.rating || '4.8'} ({product.reviews || 0})</span>
      </div>
      <h3><Link to={`/products/${id}`}>{product.name}</Link></h3>
      <div className="price">
        <strong>${product.price}</strong>{product.oldPrice && <del>${product.oldPrice}</del>}</div>
    </div>

  </article>
}
