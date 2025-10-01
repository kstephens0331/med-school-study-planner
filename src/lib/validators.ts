import { z } from 'zod';

// Authentication schemas
export const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

// Lecture chunk schemas
export const lectureChunkSchema = z.object({
  id: z.string().uuid().optional(),
  lecture_id: z.string().uuid(),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  order: z.number().int().positive()
});

// API response wrapper
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => 
  z.object({
    data: dataSchema.optional(),
    error: z.string().optional(),
    status: number().int().positive().optional()
  });

export type AuthPayload = z.infer<typeof authSchema>;
export type LectureChunk = z.infer<typeof lectureChunkSchema>;