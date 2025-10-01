import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('lecture_chunks')
      .select('*')
      .eq('lecture_id', params.id)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('lecture_chunks')
      .insert({
        lecture_id: params.id,
        content: body.content,
        order: body.order
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