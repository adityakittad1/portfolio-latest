import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { fadeInUp, staggerContainer, modalVariants } from '../../lib/animations';

export default function AdminCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    issuer: '', title: '', issueDate: '', credentialId: '', verificationUrl: '', description: '', skills: ''
  });

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('certifications').select('*').order('displayOrder', { ascending: true });
    if (!error && data) setCertifications(data);
    setLoading(false);
  };

  const handleOpenModal = (cert = null) => {
    if (cert) {
      setEditingCert(cert);
      setFormData({
        ...cert,
        skills: cert.skills ? cert.skills.join(', ') : ''
      });
    } else {
      setEditingCert(null);
      setFormData({
        issuer: '', title: '', issueDate: '', credentialId: '', verificationUrl: '', description: '', skills: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCert(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
    const payload = {
      ...formData,
      skills: skillsArray
    };

    if (editingCert) {
      await supabase.from('certifications').update(payload).eq('id', editingCert.id);
    } else {
      await supabase.from('certifications').insert([payload]);
    }
    
    handleCloseModal();
    fetchCertifications();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      await supabase.from('certifications').delete().eq('id', id);
      fetchCertifications();
    }
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <div className="admin-header">
        <div>
          <div className="admin-breadcrumb">Dashboard <span>/</span> Certifications</div>
          <h1 className="admin-title">Manage Credentials</h1>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add Certification
        </button>
      </div>

      <motion.div className="admin-table-wrapper" variants={fadeInUp}>
        {loading ? (
          <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Loading certifications...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title & Issuer</th>
                <th>Issue Date</th>
                <th>Credential ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((cert) => (
                <tr key={cert.id}>
                  <td>
                    <div style={{ fontWeight: 'var(--weight-medium)', color: 'var(--color-text-primary)' }}>{cert.title}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>{cert.issuer}</div>
                  </td>
                  <td>{cert.issueDate}</td>
                  <td>
                    {cert.credentialId ? (
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>{cert.credentialId}</div>
                    ) : (
                      <span style={{ color: 'var(--color-text-muted)' }}>—</span>
                    )}
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      {cert.verificationUrl && (
                        <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" title="Verify">
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <button className="btn btn-ghost btn-sm" onClick={() => handleOpenModal(cert)} title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(cert.id)} style={{ color: 'var(--color-error)' }} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {certifications.length === 0 && (
                <tr><td colSpan="4" style={{ textAlign: 'center', padding: 'var(--space-6)' }}>No certifications found. Add one above.</td></tr>
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
                  {editingCert ? 'Edit Certification' : 'New Certification'}
                </h3>
                <button className="btn btn-ghost" onClick={handleCloseModal}>
                  <X size={20} />
                </button>
              </div>

              <div className="admin-modal-body">
                <form className="admin-form" id="certForm" onSubmit={handleSave}>
                  <div className="admin-form-row">
                    <div className="form-group">
                      <label className="form-label">Certification Title</label>
                      <input type="text" name="title" className="form-input" value={formData.title} onChange={handleChange} required placeholder="e.g. AWS Solutions Architect" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Issuer</label>
                      <input type="text" name="issuer" className="form-input" value={formData.issuer} onChange={handleChange} required placeholder="e.g. Amazon Web Services" />
                    </div>
                  </div>

                  <div className="admin-form-row">
                    <div className="form-group">
                      <label className="form-label">Issue Date</label>
                      <input type="text" name="issueDate" className="form-input" value={formData.issueDate} onChange={handleChange} placeholder="e.g. Oct 2026" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Credential ID</label>
                      <input type="text" name="credentialId" className="form-input" value={formData.credentialId} onChange={handleChange} placeholder="Optional ID" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Verification URL</label>
                    <input type="url" name="verificationUrl" className="form-input" value={formData.verificationUrl || ''} onChange={handleChange} placeholder="https://..." />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description / Summary</label>
                    <textarea name="description" className="form-textarea" style={{ minHeight: '80px' }} value={formData.description || ''} onChange={handleChange}></textarea>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Skills (comma separated)</label>
                    <input type="text" name="skills" className="form-input" value={formData.skills} onChange={handleChange} placeholder="Cloud, Security, Networking" />
                  </div>
                </form>
              </div>

              <div className="admin-modal-footer">
                <button className="btn btn-ghost" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" form="certForm" className="btn btn-primary">Save Certification</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
