import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { api } from '../services/api.js'

export default function AdminProducts() {
    const emptyProduct = { name: '', category: '', price: '', stock: '', rating: '', reviews: '', badge: '', image: '' }
    const [products, setProducts] = useState([])
    const [form, setForm] = useState(emptyProduct)
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

    const loadProducts = () => api.getProducts().then(setProducts).catch(() => setProducts([]))
    useEffect(() => { loadProducts() }, [])

    const handleChange = (event) => {
        setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        setSaving(true)
        try {
            await api.createProduct({
                ...form,
                price: Number(form.price),
                stock: Number(form.stock || 0),
                rating: Number(form.rating || 0),
                reviews: Number(form.reviews || 0)
            })
            setForm(emptyProduct)
            await loadProducts()
        } catch (requestError) {
            setError(requestError.message)
        } finally {
            setSaving(false)
        }
    }

    return <section className="catalog">
        <p className="eyebrow">Admin inventory</p>
        <h2>Products</h2>
        <form className="admin-product-form" onSubmit={handleSubmit}>
            <h3>Add product</h3>
            <div className="admin-product-fields">
                <label>Name
                    <input name="name" value={form.name} onChange={handleChange} placeholder="iPhone 18" required />
                </label>
                <label>Category
                    <input name="category" value={form.category} onChange={handleChange} placeholder="Phones" required />
                </label>
                <label>Price
                    <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="999" required />
                </label>
                <label>Stock
                    <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} placeholder="10" />
                </label>
                <label>Rating
                    <input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} placeholder="4.8" />
                </label>
                <label>Reviews
                    <input name="reviews" type="number" min="0" value={form.reviews} onChange={handleChange} placeholder="0" />
                </label>
                <label>Badge
                    <input name="badge" value={form.badge} onChange={handleChange} placeholder="New arrival" />
                </label>
                <label>Image URL
                    <input name="image" type="url" value={form.image} onChange={handleChange} placeholder="https://..." />
                </label>
            </div>
            {error && <p className="error">{error}</p>}
            <button className="primary-button" type="submit" disabled={saving}>{saving ? 'Adding...' : 'Add product'}</button>
        </form>
        <div className="product-grid">{products.map((product) => <ProductCard product={product} key={product._id || product.id} />)}
        </div>
    </section>
}
