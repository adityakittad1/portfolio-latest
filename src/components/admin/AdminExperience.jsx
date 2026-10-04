import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { fadeInUp, staggerContainer, modalVariants } from '../../lib/animations';

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    role: '', organization: '', type: 'experience', startDate: '', endDate: '', description: '', achievements: ''
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('experience').select('*').order('displayOrder', { ascending: true });
    if (!error && data) setExperiences(data);
    setLoading(false);
  };

  const handleOpenModal = (exp = null) => {
    if (exp) {
      setEditingExp(exp);
      setFormData({
        ...exp,
        achievements: exp.achievements ? exp.achievements.join('\n') : ''
      });
    } else {
      setEditingExp(null);
      setFormData({
        role: '', organization: '', type: 'experience', startDate: '', endDate: '', description: '', achievements: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExp(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const achievementsArray = formData.achievements.split('\n').map(a => a.trim()).filter(Boolean);
    const payload = {
      ...formData,
      achievements: achievementsArray
    };

    if (editingExp) {
      await supabase.from('experience').update(payload).eq('id', editingExp.id);
    } else {
      await supabase.from('experience').insert([payload]);
    }
    
    handleCloseModal();
    fetchExperiences();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience record?')) {
      await supabase.from('experience').delete().eq('id', id);
      fetchExperiences();
    }
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <div className="admin-header">
        <div>
          <div className="admin-breadcrumb">Dashboard <span>/</span> Experience</div>
          <h1 className="admin-title">Manage Experience & Leadership</h1>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add Experience
        </button>
      </div>

      <motion.div className="admin-table-wrapper" variants={fadeInUp}>
        {loading ? (
          <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Loading experience...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Organization</th>
                <th>Type</th>
                <th>Timeline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr key={exp.id}>
                  <td style={{ fontWeight: 'var(--weight-medium)' }}>{exp.role}</td>
                  <td>{exp.organization}</td>
                  <td>
                    <span className="badge badge-neutral" style={{ textTransform: 'capitalize' }}>
                      {exp.type}
                    </span>
                  </td>
                  <td>{exp.startDate} — {exp.endDate}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="btn btn-ghost btn-sm" onClick={() => handleOpenModal(exp)} title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(exp.id)} style={{ color: 'var(--color-error)' }} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {experiences.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: 'var(--space-6)' }}>No records found. Add one above.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="admin-modal-overlay" onClick={handleCloseModal}>
            <motion.div 
              className="admin-modal" 
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              <div className="admin-modal-header">
                <h3 className="admin-modal-title">
                  {editingExp ? 'Edit Experience' : 'New Experience'}
                </h3>
                <button className="btn btn-ghost" onClick={handleCloseModal}>
                  <X size={20} />
                </button>
              </div>

              <div className="admin-modal-body">
                <form className="admin-form" id="experienceForm" onSubmit={handleSave}>
                  <div className="admin-form-row">
                    <div className="form-group">
                      <label className="form-label">Role / Title</label>
                      <input type="text" name="role" className="form-input" value={formData.role} onChange={handleChange} required placeholder="e.g. Founder" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Organization</label>
                      <input type="text" name="organization" className="form-input" value={formData.organization} onChange={handleChange} required placeholder="e.g. Rexora Media" />
                    </div>
                  </div>

                  <div className="admin-form-row">
                    <div className="form-group">
                      <label className="form-label">Start Date</label>
                      <input type="text" name="startDate" className="form-input" value={formData.startDate} onChange={handleChange} placeholder="e.g. Jan 2025" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Date</label>
                      <input type="text" name="endDate" className="form-input" value={formData.endDate} onChange={handleChange} placeholder="e.g. Present" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Type</label>
                    <select name="type" className="form-select" value={formData.type} onChange={handleChange}>
                      <option value="experience">Professional Experience</option>
                      <option value="leadership">Leadership</option>
                      <option value="founder">Founder</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea name="description" className="form-textarea" style={{ minHeight: '80px' }} value={formData.description || ''} onChange={handleChange}></textarea>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Achievements (one per line)</label>
                    <textarea name="achievements" className="form-textarea" style={{ minHeight: '100px' }} value={formData.achievements || ''} onChange={handleChange} placeholder="Scaled system to 10k users..."></textarea>
                  </div>
                </form>
              </div>

              <div className="admin-modal-footer">
                <button className="btn btn-ghost" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" form="experienceForm" className="btn btn-primary">Save Experience</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
