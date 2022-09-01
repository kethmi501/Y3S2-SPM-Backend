import express from 'express'
import { CreateTree } from '../controllers/tree'
import { checkUser } from '../middlewares/auth'

const router = express.Router()

router.post('/tree', checkUser, CreateTree)

module.exports = router
