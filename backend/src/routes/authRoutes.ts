import express from 'express';

import { login, logout, refreshAccessToken, signup } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/refreshAccessToken', refreshAccessToken);
router.post('/logout', logout);

export default router;
