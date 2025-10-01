import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function POST(request: Request) {
  const { userId, topic, count = 5 } = await request.json();
  
  try {
    // Generate flashcards using Together AI
    const response = await fetch('https://api.together.xyz/inference', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        prompt: `Generate ${count} question-answer pairs about ${topic}. Format as JSON: {question: string, answer: string}[]`,
        max_tokens: 1000
      })
    });
    
    const data = await response.json();
    const cards = JSON.parse(data.output.choices[0].text);
    
    // Save generated cards
    const { data: insertedCards, error } = await supabase
      .from('cards')
      .insert(
        cards.map(({ question, answer }) => ({
          user_id: userId,
          content: JSON.stringify({ question, answer }),
          next_review: new Date().toISOString()
        }))
      )
      .select();
    
    if (error) throw error;
    
    return NextResponse.json(insertedCards);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}