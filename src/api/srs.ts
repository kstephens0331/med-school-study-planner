import { supabase } from '.';
import type { Card } from '.';

export class SRS {
  private intervals = [1, 3, 7, 14, 30];

  constructor(private supabase: typeof supabase) {}

  private calculateNextReview(performance: number, currentInterval: number): Date {
    const date = new Date();
    
    if (performance < 3) {
      date.setHours(date.getHours() + 4); // Review again in 4 hours if failed
      return date;
    }

    const days = performance === 3
      ? currentInterval * 1.5
      : this.intervals[Math.min(performance - 3, this.intervals.length - 1)];
    
    date.setDate(date.getDate() + Math.round(days));
    return date;
  }

  async processReview(cardId: string, performance: number): Promise<Card> {
    if (performance < 1 || performance > 5) {
      throw new Error('Performance rating must be between 1 and 5');
    }

    const { data: card, error } = await this.supabase
      .from('cards')
      .select('*')
      .eq('id', cardId)
      .single();

    if (error || !card) {
      throw new Error(error?.message || 'Card not found');
    }

    const nextReview = this.calculateNextReview(
      performance,
      card.interval_days || 1
    );

    const { data: updatedCard, error: updateError } = await this.supabase
      .from('cards')
      .update({
        next_review: nextReview.toISOString(),
        interval_days: Math.round(
          (nextReview.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        ),
        review_count: (card.review_count || 0) + 1
      })
      .eq('id', cardId)
      .select()
      .single();

    if (updateError || !updatedCard) {
      throw new Error(updateError?.message || 'Failed to update card');
    }

    return updatedCard;
  }
}