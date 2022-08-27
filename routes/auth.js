import express from 'express'
import { authUser } from '../controllers/user'
import { checkUser } from '../middlewares/auth'

const router = express.Router()

router.post('/auth', authUser)
router.get('/test', checkUser, (req, res) => {
  res.send(req.body.userId)
})

module.exports = router
