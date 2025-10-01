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
  interval_days: number;
  review_count: number;
  created_at: string;
}

export interface AuthPayload {
  email: string;
  password: string;
}

export interface ReviewPayload {
  performanceRating: number;
}

export interface AIPayload {
  text: string;
  topic?: string;
  count?: number;
}