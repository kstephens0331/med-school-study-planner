import { NextRequest, NextResponse } from 'next/server';

declare module 'next/server' {
  interface NextRequest {
    nextUrl: URL;
  }
  
  interface NextResponse {
    json(data: any, init?: ResponseInit): NextResponse;
  }
}

declare module 'next' {
  export interface AppRouteHandlerRoutes {
    [key: string]: (
      req: NextRequest,
      ctx?: { params?: Record<string, string> }
    ) => Promise<NextResponse> | NextResponse;
  }
}