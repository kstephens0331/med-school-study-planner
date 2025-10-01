import { supabase } from './index';

export const getCards = async (userId: string) => {
  return supabase
    .from('cards')
    .select('*')
    .eq('user_id', userId)
    .order('next_review', { ascending: true })
    .limit(100);
};

export const createCard = async (userId: string, content: string) => {
  return supabase.from('cards').insert({
    user_id: userId,
    content,
    next_review: new Date().toISOString()
  });
};

export const updateCard = async (cardId: string, data: any) => {
  return supabase.from('cards').update(data).eq('id', cardId);
};