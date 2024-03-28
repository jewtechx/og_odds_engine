import express from 'express';
import user from './user.router'

const router = express.Router()

router.use(user)

export default router