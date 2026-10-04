import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read env variables
const envPath = path.resolve(__dirname, '../../.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) envVars[key.trim()] = value.trim();
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixData() {
  console.log('Fetching experience records...');
  const { data, error } = await supabase.from('experience').select('*');
  
  if (error) {
    console.error('Error fetching:', error);
    return;
  }

  const csiRole = data.find(exp => exp.role.includes('Vice President'));
  if (csiRole) {
    console.log('Found CSI role, updating achievements...');
    let achievements = csiRole.achievements;
    if (typeof achievements === 'string') {
      try {
        achievements = JSON.parse(achievements);
      } catch (e) {
        // Not JSON
      }
    }
    
    if (Array.isArray(achievements)) {
      achievements = achievements.map(a => 
        a.includes('InspireX') ? 'Organized Technophilia 2026, a national event with 2500+ participants' : a
      );
    }

    const { error: updateError } = await supabase
      .from('experience')
      .update({ achievements })
      .eq('id', csiRole.id);

    if (updateError) {
      console.error('Error updating:', updateError);
    } else {
      console.log('Successfully updated Supabase record!');
    }
  } else {
    console.log('CSI role not found.');
  }
}

fixData();
