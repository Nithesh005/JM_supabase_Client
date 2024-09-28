import { createClient } from "@supabase/supabase-js";
const url = 'https://sgzuuprkaoqjwmuxtymi.supabase.co'  //images
// const url = 'https://klwimflcgntbflidfzvg.supabase.co'
const anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnenV1cHJrYW9xandtdXh0eW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyMjIyMTIsImV4cCI6MjAzNjc5ODIxMn0.45zoyKxNhGVU-pPcueFkpN1qO6cK24sZh6fagyXb6Cc'
export const supabase = createClient(`${url}`, `${anon_key}`);
