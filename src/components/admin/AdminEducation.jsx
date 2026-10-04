import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { fadeInUp, staggerContainer, modalVariants } from '../../lib/animations';

export default function AdminEducation() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);

  const [formData, setFormData] = useState({
    institution: '', degree: '', startDate: '', endDate: '', description: '', focusAreas: '', achievements: ''
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('education').select('*').order('displayOrder', { ascending: true });
    if (!error && data) setEducation(data);
    setLoading(false);
  };

  const handleOpenModal = (edu = null) => {
    if (edu) {
      setEditingEdu(edu);
      setFormData(edu);
    } else {
      setEditingEdu(null);
      setFormData({
        institution: '', degree: '', startDate: '', endDate: '', description: '', focusAreas: '', achievements: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEdu(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingEdu) {
      await supabase.from('education').update(formData).eq('id', editingEdu.id);
    } else {
      await supabase.from('education').insert([formData]);
    }
    handleCloseModal();
    fetchEducation();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this education record?')) {
      await supabase.from('education').delete().eq('id', id);
      fetchEducation();
    }
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <div className="admin-header">
        <div>
          <div className="admin-breadcrumb">Dashboard <span>/</span> Education</div>
          <h1 className="admin-title">Manage Education</h1>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add Education
        </button>
      </div>

      <motion.div className="admin-table-wrapper" variants={fadeInUp}>
        {loading ? (
          <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Loading education...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Institution</th>
                <th>Degree</th>
                <th>Timeline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {education.map((edu) => (
                <tr key={edu.id}>
                  <td style={{ fontWeight: 'var(--weight-medium)' }}>{edu.institution}</td>
                  <td>{edu.degree}</td>
                  <td>{edu.startDate ? `${edu.startDate} — ` : ''}{edu.endDate}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="btn btn-ghost btn-sm" onClick={() => handleOpenModal(edu)}>
                        <Edit2 size={16} />
                      </button>
                      <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(edu.id)} style={{ color: 'var(--color-error)' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {education.length === 0 && (
                <tr><td colSpan="4" style={{ textAlign: 'center', padding: 'var(--space-6)' }}>No education records found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </motion.div>

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
                <h3 className="admin-modal-title">{editingEdu ? 'Edit Education' : 'New Education'}</h3>
                <button className="btn btn-ghost" onClick={handleCloseModal}><X size={20} /></button>
              </div>

              <div className="admin-modal-body">
                <form className="admin-form" id="eduForm" onSubmit={handleSave}>
                  <div className="admin-form-row">
                    <div className="form-group">
                      <label className="form-label">Institution</label>
                      <input type="text" name="institution" className="form-input" value={formData.institution} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Degree</label>
                      <input type="text" name="degree" className="form-input" value={formData.degree} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="admin-form-row">
                    <div className="form-group">
                      <label className="form-label">Start Date</label>
                      <input type="text" name="startDate" className="form-input" value={formData.startDate || ''} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Date</label>
                      <input type="text" name="endDate" className="form-input" value={formData.endDate} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description (Location, Honors)</label>
                    <input type="text" name="description" className="form-input" value={formData.description || ''} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Focus Areas</label>
                    <input type="text" name="focusAreas" className="form-input" value={formData.focusAreas || ''} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Achievements</label>
                    <input type="text" name="achievements" className="form-input" value={formData.achievements || ''} onChange={handleChange} />
                  </div>
                </form>
              </div>
              <div className="admin-modal-footer">
                <button className="btn btn-ghost" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" form="eduForm" className="btn btn-primary">Save Education</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
