import express from 'express';
import { createStock, getStockById } from '../controllers/stockController.js';

const router = express.Router();

router.get('/:id',getStockById);
router.post('/',createStock);

export default router;