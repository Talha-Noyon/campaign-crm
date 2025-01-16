import jwt from 'jsonwebtoken'

import UserModel from '#models/User.js'

import {appErrorLog} from '#services/Log.js'
import {env} from '#shared/schemas/EnvSchema.js'

const JWT_SECRET = env.JWT_SECRET

/**
 * Generate a JWT for a user.
 * @param {import('#shared/types/index').RegisteredUser} user - User object.
 * @returns {string} JWT token.
 */

function generateToken(user) {
  return jwt.sign({id: user._id, role: user.role}, JWT_SECRET, {expiresIn: '1d'})
}

/**
 * Generate a JWT for a user.
 * @param {import('#shared/types/index').RegisteredUser} user - User object.
 * @returns {string} JWT token.
 */
function generateRefreshToken(user) {
  return jwt.sign({id: user._id, role: user.role}, JWT_SECRET, {expiresIn: '2d'})
}

/**
 * Register a new user.
 *
 * @param {import('express').Request} request - Express request object.
 * @param {import('express').Response} response - Express response object.
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
 */

export async function login(request, response) {
  try {
    const {email, password} = request.body
    const user = await UserModel.findOne({email})
    if (!user || !(await user.comparePassword(password))) {
      return response.status(401).json({message: 'Invalid email or password'})
    }

    const token = generateToken(user)
    const refreshToken = generateRefreshToken(user)
    request.session.refreshToken = refreshToken
    response
      .status(200)
      .json({username: user.username, email: user.email, message: 'Login successful', token})
  } catch (error) {
    appErrorLog({type: 'login', body: request.body, error: error.stack})
    response.status(500).json({error: error.message})
  }
}

/**
 * Logout user.
 *
 * @param {import('express').Request} request - Express request object.
 * @param {import('express').Response} response - Express response object.
 */

export async function logout(request, response) {
  try {
    const {username, email} = request.user
    response.status(200).json({username, email, message: 'Logout successful'})
  } catch (error) {
    appErrorLog({type: 'login', body: request.body, error: error.stack})
    response.status(500).json({error: error.message})
  }
}
