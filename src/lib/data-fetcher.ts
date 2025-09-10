// src/lib/data-fetcher.ts

import { Database } from './supabase';

// This makes our function more flexible by allowing any table name from our Database type
type TableName = keyof Database['public']['Tables'];

// Define the options our function can accept
interface FetchOptions {
  table: TableName;
  order?: string; // The column to sort by
  ascending?: boolean;
  tags?: string[]; // Cache tags for revalidation
}

/**
 * A generic, reusable function to fetch data from any Supabase table.
 * This is our "template" for data fetching in Server Components.
 *
 * @param {FetchOptions} options - The options for the Supabase query.
 * @returns {Promise<any[]>} A promise that resolves to an array of data from the specified table.
 */
export async function fetchData({ table, order, ascending = true, tags }: FetchOptions) {
  // Build the query params for the API route
  const params = new URLSearchParams({
    table,
    ascending: ascending ? 'true' : 'false',
  });
  if (order) params.append('order', order);

  // Hit our own Next.js API route (server-side Supabase call)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/data?${params.toString()}`, {
    next: { tags: tags ?? [table] }, // <- tags go here
  });

  if (!res.ok) {
    console.error(`Error fetching data from table "${table}":`, res.statusText);
    return [];
  }

  return res.json();
}
