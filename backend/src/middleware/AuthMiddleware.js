import jwt from 'jsonwebtoken'

import User from '#models/User.js'

import {env} from '#utils/Env.js'

const JWT_SECRET = env.JWT_SECRET

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(403).json({message: 'Access denied, no token provided'})
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    next()
  } catch (error) {
    res.status(401).json({message: 'Invalid or expired token'})
  }
}
