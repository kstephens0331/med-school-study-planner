import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export function handleError(error: unknown) {
  console.error(error);
  
  if (error instanceof ZodError) {
    return NextResponse.json(
      { 
        error: 'Validation failed',
        details: error.errors 
      },
      { status: 422 }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}