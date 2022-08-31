import express from 'express'
import { checkUser } from '../middlewares/auth'
import { addAnimal } from '../controllers/animal'

const router = express.Router()

router.post('/animal/addAnimal', checkUser, addAnimal)

module.exports = router
