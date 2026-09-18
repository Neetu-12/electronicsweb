import { Router } from 'express'
import { createProduct, deleteProduct, getProduct, listProducts } from '../controllers/productController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { requireAdmin } from '../middleware/adminMiddleware.js'

const router = Router()
router.get('/', listProducts)
router.get('/:id', getProduct)
router.post('/', requireAuth, requireAdmin, createProduct)
router.delete('/:id', requireAuth, requireAdmin, deleteProduct)
export default router
