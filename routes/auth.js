import express from 'express'
import { authUser } from '../controllers/user'
import { checkUser } from '../middlewares/auth'

const router = express.Router()

router.post('/auth', authUser)
router.get('/auth', checkUser, (req, res) => {
  res.send('authOk')
})

module.exports = router
