import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public details?: any
  ) {
    super(message);
  }
}

export function handleError(error: unknown) {
  console.error(error);
  
  if (error instanceof ZodError) {
    return NextResponse.json(
      { 
        error: 'Validation failed',
        details: error.errors,
        status: 422
      },
      { status: 422 }
    );
  }

  if (error instanceof AppError) {
    return NextResponse.json(
      { 
        error: error.message,
        details: error.details,
        status: error.statusCode
      },
      { status: error.statusCode }
    );
  }

  return NextResponse.json(
    { 
      error: 'Internal server error',
      status: 500
    },
    { status: 500 }
  );
}