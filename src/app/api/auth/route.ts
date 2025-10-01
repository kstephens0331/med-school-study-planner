import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { authSchema } from '@/lib/validators';
import { handleError } from '@/lib/error-handler';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = authSchema.parse(body);
    
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    
    return NextResponse.json({
      user: data.user,
      session: data.session
    });
  } catch (error) {
    return handleError(error);
  }
}

export const dynamic = 'force-dynamic';