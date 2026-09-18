import { Link } from 'react-router-dom'
export default function Dashboard() {
    return <section className="catalog">
        <p className="eyebrow">Admin</p>
        <h2>Dashboard</h2>
        <p className="hero-text">Manage the Volt catalog and order queue.</p>
        <p>
            <Link to="/admin/products">Products</Link> · <Link to="/admin/orders">Orders</Link>
        </p>
    </section>
}
