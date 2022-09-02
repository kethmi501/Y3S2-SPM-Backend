import express from 'express'
import { checkUser } from '../middlewares/auth'
import { addAnimal, getAnimalsList, getSingleAnimal, deleteSingleAnimal, editSingleAnimal } from '../controllers/animal'

const router = express.Router()

router.post('/animal/addAnimal', checkUser, addAnimal)
router.get('/animal/fetchAnimalList', getAnimalsList)
router.get('/animal/getAnimal', getSingleAnimal)
router.delete('/animal/deleteAnimal', checkUser, deleteSingleAnimal)
router.put('/animal/editAnimal', checkUser, editSingleAnimal)

module.exports = router
