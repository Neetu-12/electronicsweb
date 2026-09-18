const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const token = localStorage.getItem('volt_token')
  const response = await fetch(`${API_URL}${path}`,
    { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  getProducts: (category = '') => request(`/products${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  getProduct: (id) => request(`/products/${id}`),
  createProduct: (payload) => request('/products',
    {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  register: (payload) => request('/auth/register',
    {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  login: (payload) => request('/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  createOrder: (payload) => request('/orders',
    { method: 'POST', body: JSON.stringify(payload) }),
  getOrders: () => request('/orders'),
}
