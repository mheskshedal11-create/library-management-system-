import express from 'express'
import { registerController } from '../controller/auth.controller.js'
import { upload } from '../middleware/multer.js'
const authRouter = express.Router()
authRouter.post('/register', upload.single('profileImage'), registerController)

export default authRouter