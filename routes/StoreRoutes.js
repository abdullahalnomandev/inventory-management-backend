import express from 'express';
import { createStore, getAllStors, getStoreById } from '../controllers/storeController.js';

const router = express.Router();

router.get('/',getAllStors);
router.post('/',createStore);
router.get('/:id',getStoreById);

export default router;