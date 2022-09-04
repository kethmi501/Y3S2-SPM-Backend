import express from 'express'
import { checkUser } from '../middlewares/auth'
import { createLocation } from '../controllers/location'

const router = express.Router()

router.post('/location/addlocation', checkUser, createLocation)

module.exports = router
