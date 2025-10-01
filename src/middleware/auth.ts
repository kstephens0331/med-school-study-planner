import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { authSchema } from '@/lib/validators';

export async function authenticate(request: Request) {
  const supabase = createClient();
  
  // Validate Authorization header
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Missing or invalid authorization token' },
      { status: 401 }
    );
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return NextResponse.json(
        { error: error?.message || 'Invalid authentication' },
        { status: 401 }
      );
    }
    
    return { user };
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}