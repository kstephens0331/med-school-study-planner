// Core types
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Card {
  id: string;
  user_id: string;
  content: string;
  next_review: string;
  last_reviewed?: string;
  interval_days?: number;
  review_count?: number;
}

export interface AuthResponse {
  user: User;
  session: {
    access_token: string;
    refresh_token: string;
  };
}

export interface APIError {
  error: string;
  details?: any;
}

export interface RequestWithUser extends Express.Request {
  user: User;
}