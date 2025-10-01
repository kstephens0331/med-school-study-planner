import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('lectures')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('lectures')
      .insert({
        title: body.title,
        description: body.description
      })
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
};