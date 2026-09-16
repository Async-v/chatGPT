import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import chatController from '../controllers/chat.controllers.js';

const router = express.Router();

/* POST /api/chat/ */
router.post('/', authMiddleware.authUser, chatController.createChat)


export default router;