import {ZodError} from 'zod'

/**
 * Middleware to validate request payloads against a Zod schema.
 *
 * @param {import("zod").ZodSchema} schema - Zod schema to validate against.
 * @returns {Function} Middleware function for validation.
 */
export const zodValidator = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors.map((err) => ({
          path: err.path,
          message: err.message
        }))
      })
    }
    next(error)
  }
}
