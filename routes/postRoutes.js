import express from 'express';
const router = express.Router();
import { createPost, getPosts, deletePost } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

router.route('/').post(protect, upload.single('image'), createPost).get(getPosts);
router.route('/:id').delete(protect, deletePost);

export default router;
