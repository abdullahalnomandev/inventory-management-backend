import express from 'express';
import { createStore, getAllStors } from '../controllers/storeController.js';

const router = express.Router();

router.get('/',getAllStors);
router.post('/',createStore);

export default router;