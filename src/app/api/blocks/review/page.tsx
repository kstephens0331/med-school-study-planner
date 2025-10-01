import { NextResponse } from 'next/server';
import { supabase, srs } from '../../../../lib/api';

export async function POST(request: Request) {
  try {
    const { cardId, performanceRating } = await request.json();
    await srs.processReview(cardId, performanceRating);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .lte('next_review', new Date().toISOString());

    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}