import express from 'express'
import {abc} from "../controllers/abc";

const router = express.Router()
router.get('/test/1', abc)

module.exports = router
