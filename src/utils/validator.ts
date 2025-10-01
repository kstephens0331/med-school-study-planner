import { z } from 'zod';

// User validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

// Card validation schemas
export const cardSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  topic: z.string().optional()
});

export const reviewSchema = z.object({
  performanceRating: z.number().min(1).max(5)
});

// AI operation schemas
export const summarizeSchema = z.object({
  text: z.string().min(10, 'Text must be at least 10 characters')
});

export const generateCardsSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters'),
  count: z.number().min(1).max(10).default(5)
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CardInput = z.infer<typeof cardSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type SummarizeInput = z.infer<typeof summarizeSchema>;
export type GenerateCardsInput = z.infer<typeof generateCardsSchema>;