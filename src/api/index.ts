import { createClient } from '@supabase/supabase-js';
import { TogetherAI } from './togetherai';
import { SRS } from './srs';

type Card = {
  id: string;
  user_id: string;
  content: string;
  next_review: string;
  interval_days?: number;
  review_count?: number;
};

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || ''
);

const togetherAI = new TogetherAI(
  process.env.TOGETHER_API_KEY || '',
  process.env.TOGETHER_API_URL || 'https://api.together.xyz'
);

const srs = new SRS(supabase);

export { supabase, togetherAI, srs, type Card };