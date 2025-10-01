import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateCard = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    content: Joi.string().min(10).max(1000).required(),
    tags: Joi.array().items(Joi.string()).optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export const validateReview = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    performanceRating: Joi.number().min(1).max(5).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};