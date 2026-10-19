/**
 * Supabase Client Integration for DINH. STUDIO
 * Provides Auth, Database, Storage, and Realtime sync.
 * When NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are present,
 * it connects to the live Supabase instance; otherwise it provides a seamless
 * mock bridge that syncs with local storage.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-dinh-studio.supabase.co';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key';

export interface SupabaseConfig {
  isConfigured: boolean;
  url: string;
}

export const checkSupabaseConnection = (): SupabaseConfig => {
  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('mock-')
  );
  return {
    isConfigured,
    url: SUPABASE_URL,
  };
};
