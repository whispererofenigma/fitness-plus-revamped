// src/lib/data-fetcher.ts

import { createClient } from '@/utils/supabase/client';

import { Database } from './supabase';

// This makes our function more flexible by allowing any table name from our Database type
type TableName = keyof Database['public']['Tables'];

// Define the options our function can accept
interface FetchOptions {
  table: TableName;
  order?: string; // The column to sort by
  ascending?: boolean;
  tags?: string[]; // The sort direction
}

/**
 * A generic, reusable function to fetch data from any Supabase table.
 * This is our "template" for data fetching in Server Components.
 *
 * @param {FetchOptions} options - The options for the Supabase query.
 * @returns {Promise<any[]>} A promise that resolves to an array of data from the specified table.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchData({ table, order, ascending = true, tags }: FetchOptions) {
  
  const supabase = await createClient();

  // Start building the query
  let query = supabase.from(table).select('*');

  // If an 'order' column is specified, add it to the query
  if (order) {
    query = query.order(order, { ascending });
  }

  // Execute the query
  const { data, error } = await query;

  // Handle any potential errors
  if (error) {
    console.error(`Error fetching data from table "${table}":`, error);
    // In a production app, you might want to throw the error or return a custom error object
    return [];
  }

  // Return the fetched data
  return data;
}