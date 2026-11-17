import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// Substitua pelas suas chaves do painel do Supabase (Project Settings > API)
const supabaseUrl = 'https://zbvttrfasrksalwquzdi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpidnR0cmZhc3Jrc2Fsd3F1emRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyNDYyNjEsImV4cCI6MjEwOTgyMjI2MX0.qTIteGa6o6G3HtdE6GaeWduM3jIeaqs1pU1OXoC2qow';

export const supabase = createClient(supabaseUrl, supabaseKey);