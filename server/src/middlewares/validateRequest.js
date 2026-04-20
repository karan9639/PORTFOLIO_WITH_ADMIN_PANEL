import { ZodError } from 'zod';
import { parseRequestData } from '../utils/parseRequestData.js';
import { ApiError } from '../utils/ApiError.js';

export function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.validatedBody = schema.parse(parseRequestData(req.body));
      next();
    } catch (error) {
      if (error instanceof ZodError) return next(new ApiError(400, error.issues.map((item) => item.message).join(', ')));
      next(error);
    }
  };
}
