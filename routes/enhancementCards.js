import express from 'express'
import { checkUser } from '../middlewares/auth'
import { addEnhancementCards, reportEnhancementCards, viewEnhancementCards , editEnhancementCards } from '../controllers/enhancementCards'

const router = express.Router()

router.post('/enhancementCards/addCard', checkUser, addEnhancementCards)
router.get('/enhancementCards/viewCard', viewEnhancementCards)
router.delete('/enhancementCards/reportCard', checkUser, reportEnhancementCards)
router.delete('/enhancementCards/editCard', checkUser, editEnhancementCards)


module.exports = router
