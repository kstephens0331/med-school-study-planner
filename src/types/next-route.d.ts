import { NextRequest, NextResponse } from 'next/server';

declare type AppRouteHandlerFn = (
  req: NextRequest,
  ctx: { params: Record<string, string> }
) => Promise<NextResponse> | NextResponse;

declare type AppRouteHandlerRoutes = {
  [key: string]: AppRouteHandlerFn;
};