import express from 'express';
import { createSupplier, getAllSuppliers } from '../controllers/suppliersController.js';
import authorization from '../middleware/authorization.js';
import VerifyToken from '../middleware/VerifyToken.js';

const router = express.Router();

router.get('/', VerifyToken, authorization("admin", "store-manager", "buyer"), getAllSuppliers);
router.post('/', createSupplier);


export default router;