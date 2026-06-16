import { createClient } from '@supabase/supabase-js'

const URL = import.meta.env.VITE_SUPABASE_URL || 'https://vhcwmgvprvybtzztnmpj.supabase.co'
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoY3dtZ3ZwcnZ5YnR6enRubXBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MDk3MDksImV4cCI6MjA5NzE4NTcwOX0.JLg17xvePfSe1eNXmFOUQEkkHiq_Hcg69bg-OSHR78s'

export const supabase = createClient(URL, KEY)
