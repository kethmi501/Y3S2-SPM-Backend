import express from 'express'
import {authUser, getUserDetails} from '../controllers/user'
import {checkUser} from '../middlewares/auth'

const router = express.Router()

router.post('/auth', authUser)
router.get('/user/get-user-data', checkUser, getUserDetails)

module.exports = router
