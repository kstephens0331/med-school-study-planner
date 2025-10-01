import { z } from 'zod';

// Lecture chunk validator
export const lectureChunkSchema = z.object({
  id: z.string().uuid(),
  lecture_id: z.string().uuid(),
  content: z.string().min(1),
  order: z.number().int().positive(),
  created_at: z.string().datetime()
});

export type LectureChunk = z.infer<typeof lectureChunkSchema>;

// API response validators
export const apiResponseSchema = z.object({
  data: z.unknown().optional(),
  error: z.string().optional()
});

export type ApiResponse = z.infer<typeof apiResponseSchema>;