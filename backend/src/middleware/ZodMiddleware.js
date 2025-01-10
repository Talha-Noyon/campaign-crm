import {ZodError, z} from 'zod'

/**
 * Middleware for validating Zod schemas
 * @param {import("zod").ZodSchema} schema - Zod schema to validate against
 * @returns {(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void}
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

/**
 * A wrapper to validate multiple parameters using Zod schemas.
 * @param {import("zod").ZodSchema[]} schemas - An array of Zod schemas for validation.
 * @param {Function} fn - The function to execute after validation.
 * @returns {Function} A wrapped function with validation.
 */
export const multipleSchemaValidator =
  (schemas, fn) =>
  async (...inputs) => {
    try {
      // Validate each input using its corresponding schema
      const validatedInputs = schemas.map((schema, index) => schema.parse(inputs[index]))

      // Call the original function with validated inputs
      return await fn(...validatedInputs)
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation error:', error.errors)
        throw new Error('Invalid input: ' + JSON.stringify(error.errors))
      }
      throw error
    }
  }
