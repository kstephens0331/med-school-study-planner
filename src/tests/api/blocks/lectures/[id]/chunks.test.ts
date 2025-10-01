import { GET, POST } from '@/app/api/blocks/lectures/[id]/chunks/route';
import { createClient } from '@/lib/supabase/mock';
import { lectureChunkSchema } from '@/lib/validators';

jest.mock('@/lib/supabase/server');

describe('Lecture Chunks API', () => {
  const mockChunk = {
    id: '1',
    lecture_id: 'lecture-1',
    content: 'Test content',
    order: 1
  };

  describe('GET /api/blocks/lectures/[id]/chunks', () => {
    it('should return 200 with chunks', async () => {
      createClient().from().select().eq.mockResolvedValue({ 
        data: [mockChunk], 
        error: null 
      });

      const response = await GET(
        new Request('http://localhost'),
        { params: { id: 'lecture-1' } }
      );
      
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual([mockChunk]);
    });

    it('should handle errors', async () => {
      createClient().from().select().eq.mockRejectedValue(new Error('DB error'));

      const response = await GET(
        new Request('http://localhost'),
        { params: { id: 'lecture-1' } }
      );
      
      expect(response.status).toBe(500);
    });
  });

  describe('POST /api/blocks/lectures/[id]/chunks', () => {
    it('should create new chunk', async () => {
      createClient().from().insert().select.mockResolvedValue({
        data: [mockChunk],
        error: null
      });

      const request = new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify(mockChunk)
      });

      const response = await POST(
        request,
        { params: { id: 'lecture-1' } }
      );
      
      expect(response.status).toBe(201);
    });
  });
});