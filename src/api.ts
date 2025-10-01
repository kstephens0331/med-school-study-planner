import { createClient } from '@supabase/supabase-js';
import { TogetherAI } from 'togetherai';

type Card = {
  id: string;
  question: string;
  answer: string;
  nextReview: Date;
  easeFactor: number;
  interval: number;
  repetitions: number;
};

// Initialize clients
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
const togetherAI = new TogetherAI(process.env.TOGETHER_AI_KEY!);

// SRS Algorithm (SM-2 variant)
const updateSRS = (card: Card, performance: number): Card => {
  let { easeFactor, interval, repetitions } = card;
  
  if (performance >= 3) {
    repetitions += 1;
    easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - performance) * 0.08);
    
    if (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 6;
    else interval = Math.round(interval * easeFactor);
  } else {
    repetitions = 0;
    interval = 1;
  }
  
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);
  
  return { ...card, easeFactor, interval, repetitions, nextReview };
};

export const api = {
  // Card operations
  async getCards(userId: string) {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('userId', userId)
      .lte('nextReview', new Date().toISOString());
    
    return { data, error };
  },
  
  async updateCard(card: Card, performance: number) {
    const updated = updateSRS(card, performance);
    const { data, error } = await supabase
      .from('cards')
      .update(updated)
      .eq('id', card.id);
    
    return { data, error };
  },
  
  // LLM operations
  async summarizeText(text: string) {
    return togetherAI.generate({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      prompt: `Summarize this text:\n\n${text}`,
      max_tokens: 200
    });
  },
  
  async generateCards(topic: string, count: number = 5) {
    const response = await togetherAI.generate({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      prompt: `Generate ${count} question-answer pairs about ${topic}. Format as JSON: {q: string, a: string}[]`,
      max_tokens: 1000
    });
    
    return JSON.parse(response.choices[0].text);
  }
};