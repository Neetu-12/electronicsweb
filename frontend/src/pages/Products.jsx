import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import Loader from '../components/Loader.jsx'
import { api } from '../services/api.js'

const categories = ['All products', 'Audio', 'Computing', 'Wearables']
export default function Products() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('All products')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    api.getProducts(category === 'All products' ? '' :
      category).then(setProducts).catch(() => setProducts([])).finally(() => setLoading(false))
  }, [category])
  return <section className="catalog">
    <div className="section-heading"><div>
      <p className="eyebrow">Find your next favorite</p>
      <h2>Shop the edit</h2>
    </div>
      <p className="catalog-note">Modern essentials and little upgrades that make a difference.</p>
    </div>
    <div className="catalog-tools">
      <div className="category-tabs">{categories.map((item) =>
        <button className={category === item ? 'active' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
    </div>{loading ? <Loader /> : <div className="product-grid">{products.map((product) => <ProductCard key={product._id || product.id} product={product} />)}</div>}</section>
}
