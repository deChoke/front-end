import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://euoxvoltmbwvrsypjffl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1b3h2b2x0bWJ3dnJzeXBqZmZsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTMzODM3NCwiZXhwIjoyMDc0OTE0Mzc0fQ.sUfh9rEygfvfguqTTGjXbpZn6bdxjUGihASRAxWPQNI';

export const supabase = createClient(supabaseUrl, supabaseKey);
