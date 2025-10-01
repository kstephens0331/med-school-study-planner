import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { items } = await request.json();
    const { data, error } = await supabase
      .from('vignettes')
      .insert(items)
      .select();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}