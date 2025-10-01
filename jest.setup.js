import './src/lib/supabase/mock';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((data) => ({
      ...data,
      status: 200
    }))
  }
}));