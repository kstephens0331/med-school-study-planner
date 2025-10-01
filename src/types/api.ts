import { LectureChunk } from '@/lib/validators';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  meta?: {
    count?: number;
    next?: string | null;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    count: number;
    next: string | null;
  };
}

export type LectureChunkResponse = ApiResponse<LectureChunk>;