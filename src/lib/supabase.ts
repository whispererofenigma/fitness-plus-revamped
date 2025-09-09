// src/lib/supabase.ts

// This file centralizes the type definitions for your Supabase database schema.
// It allows you to have strongly typed data across your entire application.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Definition for the personalization_features table
      personalization_features: {
        Row: { // The shape of the data returned from a SELECT query
            id: string;
            feature_id: string;
            title: string;
            description: string;
            image_key: string | null;
            icon_name: string | null;
            created_at: string;
        };
        Insert: { // The shape of the data for an INSERT operation
            feature_id: string;
            title: string;
            description: string;
            image_key?: string | null;
            icon_name?: string | null;
        };
        Update: { // The shape of the data for an UPDATE operation
            title?: string;
            description?: string;
            image_key?: string | null;
        };
      };

       membership_plans: {
        Row: {
          id: string;
          plan_id: string;
          title: string;
          price: string;
          original_price: string | null;
          duration: string | null;
          href: string | null;
          tag: string | null;
          sort_order: number | null;
        };
        Insert: {
            id?: string;
            plan_id: string;
            title: string;
            price: string;
            original_price?: string | null;
            duration?: string | null;
            href?: string | null;
            tag?: string | null;
            sort_order?: number | null;
        };
        Update: {
            title?: string;
            price?: string;
            original_price?: string | null;
            duration?: string | null;
            href?: string | null;
            tag?: string | null;
            sort_order?: number | null;
        };
      };

      membership_features: {
        Row: {
          id: string;
          feature_text: string;
          sort_order: number | null;
        };
        Insert: {
            id?: string;
            feature_text: string;
            sort_order?: number | null;
        };
        Update: {
            feature_text?: string;
            sort_order?: number | null;
        };
      };
      
      // Definition for the access_passes table
      access_passes: {
        Row: {
          id: string;
          pass_id: string;
          title: string;
          price: string;
          duration: string | null;
          href: string | null;
          featured: boolean | null;
          sort_order: number | null;
        };
        Insert: {
          id?: string;
          pass_id: string;
          title: string;
          price: string;
          duration?: string | null;
          href?: string | null;
          featured?: boolean | null;
          sort_order?: number | null;
        };
        Update: {
          title?: string;
          price?: string;
          duration?: string | null;
          href?: string | null;
          featured?: boolean | null;
          sort_order?: number | null;
        };
      };

      // Definition for the pass_features table
      pass_features: {
        Row: {
          id: string;
          pass_id: string; // Changed to non-nullable as it's a required link
          feature_text: string;
          sort_order: number | null;
        };
        Insert: {
          id?: string;
          pass_id: string;
          feature_text: string;
          sort_order?: number | null;
        };
        Update: {
          feature_text?: string;
          sort_order?: number | null;
        };
      };
      
    };
    Views: {
      [_ in never]: never
    };
    Functions: {
      [_ in never]: never
    };
  };
}