// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qldhmlqjcbmaadyyqtlh.supabase.co';  // Replace with your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsZGhtbHFqY2JtYWFkeXlxdGxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0MzA4MjYsImV4cCI6MjA0MzAwNjgyNn0.SkqY_T39ijvARRmaId3GoJQVmigNVZ0YueKOv21pdvU';  // Replace with your Supabase Anon Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
