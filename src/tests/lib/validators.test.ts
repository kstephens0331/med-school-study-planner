import { lectureChunkSchema } from '@/lib/validators';
import { z } from 'zod';

describe('lectureChunkSchema', () => {
  const validData = {
    lecture_id: '550e8400-e29b-41d4-a716-446655440000',
    content: 'This is a valid lecture chunk content',
    order: 1
  };

  it('should validate correct data', () => {
    expect(() => lectureChunkSchema.parse(validData)).not.toThrow();
  });

  it('should reject invalid UUID', () => {
    expect(() => lectureChunkSchema.parse({
      ...validData,
      lecture_id: 'invalid-uuid'
    })).toThrow(z.ZodError);
  });

  it('should reject short content', () => {
    expect(() => lectureChunkSchema.parse({
      ...validData,
      content: 'short'
    })).toThrow(z.ZodError);
  });

  it('should reject negative order', () => {
    expect(() => lectureChunkSchema.parse({
      ...validData,
      order: -1
    })).toThrow(z.ZodError);
  });
});