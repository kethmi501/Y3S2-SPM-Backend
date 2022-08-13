import express from 'express'
import { authUser } from '../controllers/user'

const router = express.Router()

router.post('/auth', authUser)

module.exports = router
