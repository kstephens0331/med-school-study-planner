export type Database = {
  public: {
    Tables: {
      lectures: {
        Row: {
          id: string;
          title: string;
          created_at: string;
        };
      };
      lecture_chunks: {
        Row: {
          id: string;
          lecture_id: string;
          content: string;
          order: number;
        };
      };
    };
  };
};