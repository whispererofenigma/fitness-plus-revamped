// src/app/api/data/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  const table = req.nextUrl.searchParams.get('table') as string;
  const order = req.nextUrl.searchParams.get('order') ?? undefined;
  const ascending = req.nextUrl.searchParams.get('ascending') !== 'false';

  let query = supabase.from(table).select('*');
  if (order) query = query.order(order, { ascending });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
