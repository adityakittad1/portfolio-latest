import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { supabase } from '../../lib/supabase';
import { Settings, Save, AlertCircle } from 'lucide-react';

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [settings, setSettings] = useState({
    id: 1,
    show_profile_photo: true
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('site_settings').select('*').eq('id', 1).single();
      
      if (error && error.code !== 'PGRST116') {
        // Fallback to local storage for ANY error (RLS, schema missing, etc)
        const localSettings = localStorage.getItem('site_settings');
        if (localSettings) {
          setSettings(JSON.parse(localSettings));
        } else {
          setError(error.message);
        }
      } else if (data) {
        setSettings(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings() {
    setSaving(true);
    setError(null);
    setSuccess(false);
    
    try {
      const { error } = await supabase.from('site_settings').upsert(settings);
      
      if (error) {
        throw new Error(error.message || 'Failed to save to database. Image might be too large.');
      } else {
        localStorage.setItem('site_settings', JSON.stringify(settings));
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="admin-header">
        <div>
          <div className="admin-breadcrumb">Dashboard <span>/</span> Settings</div>
          <h1 className="admin-title">Site Settings</h1>
        </div>
      </div>

      <motion.div variants={fadeInUp} className="card-flat" style={{ maxWidth: '800px' }}>
        <h3 className="admin-table-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={20} />
          Global Preferences
        </h3>
        
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Database Table Missing</div>
              <div>{error}</div>
              <div style={{ marginTop: '12px', fontSize: '13px', opacity: 0.9 }}>
                <strong>How to fix:</strong> Your table is created, but Supabase API hasn't recognized it yet. Go to your Supabase SQL Editor and run this single line:<br/>
                <code style={{ display: 'block', background: 'rgba(0,0,0,0.3)', padding: '8px', marginTop: '8px', borderRadius: '4px' }}>
                  NOTIFY pgrst, 'reload schema';
                </code>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Loading settings...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '24px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: 'var(--color-bg-secondary)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div>
                <div style={{ fontWeight: 'bold', color: 'white', fontSize: '16px' }}>Show Profile Photo</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '4px' }}>
                  Toggle the visibility of your professional picture on the public website.
                </div>
              </div>
              
              {/* Toggle Switch */}
              <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '28px' }}>
                <input 
                  type="checkbox" 
                  checked={settings.show_profile_photo}
                  onChange={(e) => setSettings({...settings, show_profile_photo: e.target.checked})}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{ 
                  position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, 
                  backgroundColor: settings.show_profile_photo ? '#10b981' : 'var(--color-bg-tertiary)', 
                  transition: '.4s', borderRadius: '34px',
                  border: '1px solid var(--color-border)'
                }}>
                  <span style={{
                    position: 'absolute', content: '""', height: '20px', width: '20px', left: '3px', bottom: '3px',
                    backgroundColor: 'white', transition: '.4s', borderRadius: '50%',
                    transform: settings.show_profile_photo ? 'translateX(22px)' : 'translateX(0)'
                  }}></span>
                </span>
              </label>
            </div>

            {/* Image Upload Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', background: 'var(--color-bg-secondary)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div>
                <div style={{ fontWeight: 'bold', color: 'white', fontSize: '16px' }}>Upload Profile Photo</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '4px' }}>
                  Upload a new photo to display in the About section. (Max 2MB)
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {settings.profile_photo_url && (
                  <img 
                    src={settings.profile_photo_url} 
                    alt="Preview" 
                    style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #10b981' }} 
                  />
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setSettings({...settings, profile_photo_url: reader.result});
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  style={{
                    background: 'var(--color-bg-tertiary)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    color: 'white',
                    border: '1px solid var(--color-border)',
                    flex: 1
                  }}
                />
              </div>
              <div style={{ marginTop: '12px' }}>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Or paste an Image URL directly:</div>
                <input 
                  type="text" 
                  value={settings.profile_photo_url || ''}
                  onChange={(e) => setSettings({...settings, profile_photo_url: e.target.value})}
                  placeholder="https://example.com/my-photo.jpg"
                  style={{
                    width: '100%',
                    background: 'var(--color-bg-tertiary)',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    color: 'white',
                    border: '1px solid var(--color-border)'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button 
                className="btn btn-primary" 
                onClick={saveSettings} 
                disabled={saving}
                style={{ width: 'auto', padding: '0 24px' }}
              >
                <Save size={18} style={{ marginRight: '8px' }} />
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
            
            {success && (
              <div style={{ textAlign: 'right', color: '#10b981', fontSize: '14px' }}>Settings saved successfully!</div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
