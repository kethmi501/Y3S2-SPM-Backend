import express from 'express'
import { checkUser } from '../middlewares/auth'
import { addAnimal, getAnimalsList } from '../controllers/animal'

const router = express.Router()

router.post('/animal/addAnimal', checkUser, addAnimal)
router.get('/animal/fetchAnimalList', getAnimalsList)

module.exports = router
