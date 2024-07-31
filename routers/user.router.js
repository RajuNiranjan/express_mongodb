import express from 'express'
import { updateUser, deleteAccount } from '../controllers/user.controller.js'
import { VerifyToken } from '../middleware/verifyToken.js'

export const UserRouter = express.Router()

UserRouter.post('/updateuser/:id', VerifyToken, updateUser)
UserRouter.delete('/delteaccount/:id', VerifyToken, deleteAccount)