import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export interface Card {
  id: string;
  user_id: string;
  content: string;
  next_review: string;
  interval_days?: number;
  review_count?: number;
  last_reviewed?: string;
}

export interface AuthToken {
  email: string;
  sub: string;
  exp: number;
}

export interface APIError {
  error: string;
  details?: any;
}