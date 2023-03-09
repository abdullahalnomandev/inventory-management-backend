import express from 'express';
import { createStock, getStock } from '../controllers/stockController.js';

const router = express.Router();


router.get('/',getStock);
router.post('/',createStock);

export default router;