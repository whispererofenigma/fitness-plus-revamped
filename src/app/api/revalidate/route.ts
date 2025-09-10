// src/app/api/revalidate/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tag } = body;

    

    // Use revalidateTag to specifically refetch data associated with this tag
    revalidateTag(tag);

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: `Successfully revalidated tag: ${tag}`,
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
        return NextResponse.json({ message: 'Error revalidating', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown error occurred during revalidation.' }, { status: 500 });
  }
}