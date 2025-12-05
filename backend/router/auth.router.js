import express from 'express'
import { loginController, registerController } from '../controller/auth.controller.js'
import { upload } from '../middleware/multer.js'
const authRouter = express.Router()
authRouter.post('/register', upload.single('profileImage'), registerController)
authRouter.post('/login', loginController)

export default authRouter