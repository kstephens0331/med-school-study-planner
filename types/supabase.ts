export type Database = {
  public: {
    Tables: {
      cards: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          next_review: string;
          interval_days: number;
          review_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          next_review?: string;
          interval_days?: number;
          review_count?: number;
          created_at?: string;
        };
        Update: {
          content?: string;
          next_review?: string;
          interval_days?: number;
          review_count?: number;
        };
      };
      lecture_chunks: {
        Row: {
          id: string;
          lecture_id: string;
          content: string;
          order: number;
          created_at: string;
        };
      };
    };
  };
};