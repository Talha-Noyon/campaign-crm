// src/routes/authRoutes.js
import express from 'express'

import {login, register} from '#controllers/AuthController.js'

import {zodValidator} from '#middleware/ZodMiddleware.js'
import {loginSchema, registerSchema} from '#middleware/schemas/UserSchema.js'

const router = express.Router()

/**
 * POST /auth/register
 * Register a new user.
 *
 * @name RegisterUser
 * @route {POST} /auth/register
 * @body {Object} - User registration data.
 * @body {string} username - The username of the user.
 * @body {string} email - The email address of the user.
 * @body {string} password - The password of the user.
 * @body {string} [role] - The role of the user (admin or campaign_manager).
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
 * @body {string} email - The email address of the user.
 * @body {string} password - The password of the user.
 * @returns {Object} 200 - User successfully logged in with a token.
 * @returns {Object} 401 - Invalid email or password.
 */

router.post('/login', zodValidator(loginSchema), login)

export default router
