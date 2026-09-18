import mongoose from 'mongoose'
import { fallbackProducts, Product } from '../models/Product.js'

export async function listProducts(request, response) {
  if (Product.db.readyState !== 1)
    return response.json(fallbackProducts)

  const filter = request.query.category ?
    { category: request.query.category } : {}

  const products = await Product.find(filter).sort({ createdAt: -1 }).lean()
  response.json(products.length ? products : fallbackProducts)
}

export async function getProduct(request, response) {
  if (Product.db.readyState !== 1) 
    return response.json(fallbackProducts.find((product) => product.id === request.params.id) || null)
  
  const product = mongoose.isObjectIdOrHexString(request.params.id) ? await Product.findById(request.params.id).lean() : null
  if (!product) return response.status(404).json({ error: 'Product not found' })
  response.json(product)
}

export async function createProduct(request, response) {
  const { name, category, price, stock = 0, description = '', image = '' } = request.body

  if (!name || !category || price == null)
    return response.status(400).json({ error: 'name, category and price are required' })

  if (Product.db.readyState !== 1)
    return response.status(503).json({ error: 'MongoDB is not connected' })

  const product = {
    name,
    category,
    price: Number(price),
    stock: Number(stock),
    description,
    image,
    createdAt: new Date()
  }
  response.status(201).json(await Product.create(product))
}

export async function deleteProduct(request, response) {
  if (Product.db.readyState !== 1 || !mongoose.isObjectIdOrHexString(request.params.id)) return response.status(400).json({ error: 'Valid product id is required' })
  const result = await Product.findByIdAndDelete(request.params.id)
  if (!result) return response.status(404).json({ error: 'Product not found' })
  response.status(204).end()
}
