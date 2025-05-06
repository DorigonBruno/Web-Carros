import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mkjmyfahlmtkfoailair.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ram15ZmFobG10a2ZvYWlsYWlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMTEzNTcsImV4cCI6MjA2MTg4NzM1N30.e7V4ol9d4IHmswyoMHCDoqD2CXE6kvLyYg0EgqTnjCI";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
