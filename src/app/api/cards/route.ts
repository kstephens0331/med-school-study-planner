import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json(
      { error: 'User ID required' },
      { status: 400 }
    );
  }
  
  try {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', userId)
      .lte('next_review', new Date().toISOString());
    
    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { userId, content } = await request.json();
  
  try {
    const { data, error } = await supabase
      .from('cards')
      .insert({
        user_id: userId,
        content,
        next_review: new Date().toISOString()
      })
      .select();
    
    if (error) throw error;
    
    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}