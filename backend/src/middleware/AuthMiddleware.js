import jwt from 'jsonwebtoken'

import UserModel from '#models/User.js'

import {env} from '#shared/schemas/EnvSchema.js'

const JWT_SECRET = env.JWT_SECRET

/**
 * Middleware for validating API requests
 *
 * @param {import('express').Request} request - Express request object.
 * @param {import('express').Response} response - Express response object.
 * @param {import('express').NextFunction} next - Next function to pass control to the next middleware.
 * @returns {Promise<void>}
 */
export async function verifyToken(request, response, next) {
  try {
    const token = request.headers.authorization?.split(' ')[1]
    if (!token) {
      return response.status(403).json({message: 'Access denied, no token provided'})
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    request.user = await UserModel.findById(decoded.id).select('-password')
    next()
  } catch (error) {
    response.status(401).json({message: 'Invalid or expired token'})
  }
}
