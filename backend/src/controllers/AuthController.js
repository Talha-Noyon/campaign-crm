import jwt from 'jsonwebtoken'

import UserModel from '#models/User.js'

import {env} from '#middleware/schemas/EnvSchema.js'
import {appErrorLog} from '#services/Log.js'

const JWT_SECRET = env.JWT_SECRET

/**
 * Generate a JWT for a user.
 *
 * @param {Object} user - User object.
 * @param {string} user._id - User ID.
 * @param {string} user.role - User role.
 * @returns {string} JWT token.
 */

function generateToken(user) {
  return jwt.sign({id: user._id, role: user.role}, JWT_SECRET, {expiresIn: '1d'})
}

/**
 * Register a new user.
 *
 * @param {import('express').Request} request - Express request object.
 * @param {import('express').Response} response - Express response object.
 * @returns {Promise<void>}
 */

export async function register(request, response) {
  try {
    const {username, email, password, role} = request.body
    const existingUser = await UserModel.findOne({email})
    if (existingUser) {
      return response.status(400).json({message: 'Email already in use'})
    }

    const user = await UserModel.create({username, email, password, role})
    response.status(201).json({message: 'User registered successfully', user})
  } catch (error) {
    appErrorLog({type: 'register', body: request.body, error: error.stack})
    response.status(500).json({error: error.message})
  }
}

/**
 * Log in an existing user.
 *
 * @param {import('express').Request} request - Express request object.
 * @param {import('express').Response} response - Express response object.
 * @returns {Promise<void>}
 */

export async function login(request, response) {
  try {
    const {email, password} = request.body
    const user = await UserModel.findOne({email})
    if (!user || !(await user.comparePassword(password))) {
      return response.status(401).json({message: 'Invalid email or password'})
    }

    const token = generateToken(user)
    response.status(200).json({message: 'Login successful', token})
  } catch (error) {
    appErrorLog({type: 'login', body: request.body, error: error.stack})
    response.status(500).json({error: error.message})
  }
}
