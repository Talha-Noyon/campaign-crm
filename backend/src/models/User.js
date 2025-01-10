import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, enum: ['admin', 'campaign_manager'], default: 'campaign_manager'}
})

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

/**
 * Compare a candidate password with the user's hashed password.
 * @param {string} password - The plain text password to compare.
 * @returns {Promise<boolean>} - Whether the password matches.
 */
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)
export default User
