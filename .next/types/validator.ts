// Type declarations for module validation
declare module '@/app/api/blocks/lectures/[id]/chunks/route' {
  export function GET(
    request: Request,
    params: { params: { id: string } }
  ): Promise<NextResponse>;
}

export {};