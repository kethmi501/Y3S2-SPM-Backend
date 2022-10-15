import { searchEntities } from '../controllers/search'
import express from 'express'

const router = express.Router()

router.get('/search', searchEntities)

module.exports = router
