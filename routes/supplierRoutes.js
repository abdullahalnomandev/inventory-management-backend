import express from 'express';
import { createSupplier, getAllSuppliers } from '../controllers/suppliersController.js';

const router = express.Router();

router.get('/', getAllSuppliers);
router.post('/', createSupplier);


export default router;