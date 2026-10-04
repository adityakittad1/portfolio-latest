import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { fadeInUp, staggerContainer, modalVariants } from '../../lib/animations';

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const [formData, setFormData] = useState({
    category: '', name: '', icon: ''
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('skills').select('*').order('category', { ascending: true });
    if (!error && data) setSkills(data);
    setLoading(false);
  };

  const handleOpenModal = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData(skill);
    } else {
      setEditingSkill(null);
      setFormData({ category: '', name: '', icon: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingSkill) {
      await supabase.from('skills').update(formData).eq('id', editingSkill.id);
    } else {
      await supabase.from('skills').insert([formData]);
    }
    handleCloseModal();
    fetchSkills();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      await supabase.from('skills').delete().eq('id', id);
      fetchSkills();
    }
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <div className="admin-header">
        <div>
          <div className="admin-breadcrumb">Dashboard <span>/</span> Skills</div>
          <h1 className="admin-title">Manage Tech Stack</h1>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add Skill
        </button>
      </div>

      <motion.div className="admin-table-wrapper" variants={fadeInUp}>
        {loading ? (
          <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Loading skills...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Skill Name</th>
                <th>Category</th>
                <th>Icon (Lucide)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id}>
                  <td style={{ fontWeight: 'var(--weight-medium)' }}>{skill.name}</td>
                  <td><span className="badge badge-neutral">{skill.category}</span></td>
                  <td>{skill.icon || 'code'}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="btn btn-ghost btn-sm" onClick={() => handleOpenModal(skill)}>
                        <Edit2 size={16} />
                      </button>
                      <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(skill.id)} style={{ color: 'var(--color-error)' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {skills.length === 0 && (
                <tr><td colSpan="4" style={{ textAlign: 'center', padding: 'var(--space-6)' }}>No skills found. Add one above.</td></tr>
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
                <h3 className="admin-modal-title">{editingSkill ? 'Edit Skill' : 'New Skill'}</h3>
                <button className="btn btn-ghost" onClick={handleCloseModal}><X size={20} /></button>
              </div>

              <div className="admin-modal-body">
                <form className="admin-form" id="skillForm" onSubmit={handleSave}>
                  <div className="form-group">
                    <label className="form-label">Skill Name</label>
                    <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required placeholder="e.g. React" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <input type="text" name="category" className="form-input" value={formData.category} onChange={handleChange} required placeholder="e.g. frontend" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Icon Name (lucide-react)</label>
                    <input type="text" name="icon" className="form-input" value={formData.icon || ''} onChange={handleChange} placeholder="e.g. Code, Database, Cloud" />
                  </div>
                </form>
              </div>
              <div className="admin-modal-footer">
                <button className="btn btn-ghost" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" form="skillForm" className="btn btn-primary">Save Skill</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
