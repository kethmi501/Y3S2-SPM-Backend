import express from 'express'
import { checkUser } from '../middlewares/auth'
import { addEnhancementCards , viewEnhancementCards } from '../controllers/enhancementCards'

const router = express.Router()

router.post('/enhancementCards/addCard', checkUser, addEnhancementCards)
router.post('/enhancementCards/viewCard', viewEnhancementCards)


module.exports = router
