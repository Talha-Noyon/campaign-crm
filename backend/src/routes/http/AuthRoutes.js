// src/routes/authRoutes.js
import express from 'express'

import {login, register} from '#controllers/AuthController.js'

import {zodValidator} from '#middleware/ZodMiddleware.js'
import {loginSchema, registerSchema} from '#schemas/UserSchema.js'

const router = express.Router()

/**
 * POST /auth/register
 * Register a new user.
 *
 * @name RegisterUser
 * @route {POST} /auth/register
 * @body {import('#types').RegisterUser} - User registration data.
 * @returns {Object} 201 - User successfully registered.
 * @returns {Object} 400 - Validation error or email already in use.
 */
router.post('/register', zodValidator(registerSchema), register)

/**
 * POST /auth/login
 * Log in an existing user.
 *
 * @name LoginUser
 * @route {POST} /auth/login
 * @body {Object} - User login data.
 * @body {import('#types').LoginUser} - Login user data.
 * @returns {Object} 200 - User successfully logged in with a token.
 * @returns {Object} 401 - Invalid email or password.
 */

router.post('/login', zodValidator(loginSchema), login)

export default router
