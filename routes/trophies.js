import express from 'express'
import { getTrophyCount } from '../controllers/trophies'

const router = express.Router()

router.get('/get-trophies', getTrophyCount)

module.exports = router
