import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { fadeInUp, staggerContainer, modalVariants } from '../../lib/animations';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '', slug: '', category: '', shortDescription: '', fullDescription: '',
    liveUrl: '', githubUrl: '', technologies: '', published: true, featured: false
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('displayOrder', { ascending: true });
    if (!error && data) setProjects(data);
    setLoading(false);
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        ...project,
        technologies: project.technologies ? project.technologies.join(', ') : ''
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '', slug: '', category: '', shortDescription: '', fullDescription: '',
        liveUrl: '', githubUrl: '', technologies: '', published: true, featured: false
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const techArray = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
    const payload = {
      ...formData,
      displayOrder: Number(formData.displayOrder) || 1,
      technologies: techArray,
      published: String(formData.published) === 'true' || formData.published === true
    };

    if (editingProject) {
      await supabase.from('projects').update(payload).eq('id', editingProject.id);
    } else {
      await supabase.from('projects').insert([payload]);
    }
    
    handleCloseModal();
    fetchProjects();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await supabase.from('projects').delete().eq('id', id);
      fetchProjects();
    }
  };

  const toggleFeatured = async (project) => {
    await supabase.from('projects').update({ featured: !project.featured }).eq('id', project.id);
    fetchProjects();
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <div className="admin-header">
        <div>
          <div className="admin-breadcrumb">Dashboard <span>/</span> Projects</div>
          <h1 className="admin-title">Manage Projects</h1>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add Project
        </button>
      </div>

      <motion.div className="admin-table-wrapper" variants={fadeInUp}>
        {loading ? (
          <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Loading projects...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <button 
                        onClick={() => toggleFeatured(project)}
                        style={{ color: project.featured ? 'var(--color-warning)' : 'var(--color-border-hover)' }}
                        title={project.featured ? "Remove from featured" : "Mark as featured"}
                      >
                        <Star size={16} fill={project.featured ? "currentColor" : "none"} />
                      </button>
                      <div>
                        <div style={{ fontWeight: 'var(--weight-medium)', color: 'var(--color-text-primary)' }}>
                          {project.title}
                        </div>
                        <div style={{ fontSize: 'var(--text-xs)' }}>/{project.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td>{project.category}</td>
                  <td>
                    <span className={`badge ${project.published ? 'badge-success' : 'badge-neutral'}`}>
                      {project.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="btn btn-ghost btn-sm" onClick={() => handleOpenModal(project)} title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(project.id)} style={{ color: 'var(--color-error)' }} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr><td colSpan="4" style={{ textAlign: 'center', padding: 'var(--space-6)' }}>No projects found. Add one above.</td></tr>
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
                  {editingProject ? 'Edit Project' : 'New Project'}
                </h3>
                <button className="btn btn-ghost" onClick={handleCloseModal}>
                  <X size={20} />
                </button>
              </div>

              <div className="admin-modal-body">
                <form className="admin-form" id="projectForm" onSubmit={handleSave}>
                  <div className="admin-form-row">
                    <div className="form-group">
                      <label className="form-label">Title</label>
                      <input type="text" name="title" className="form-input" value={formData.title} onChange={handleChange} required placeholder="Project Name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Slug</label>
                      <input type="text" name="slug" className="form-input" value={formData.slug} onChange={handleChange} required placeholder="url-friendly-name" />
                    </div>
                  </div>

                  <div className="admin-form-row">
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <input type="text" name="category" className="form-input" value={formData.category} onChange={handleChange} required placeholder="e.g. Full-Stack / AI" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Status</label>
                      <select name="published" className="form-select" value={formData.published} onChange={handleChange}>
                        <option value={true}>Published</option>
                        <option value={false}>Draft</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ background: 'var(--color-bg-tertiary)', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <label className="form-label" style={{ margin: 0 }}>Priority / Display Order</label>
                      <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{formData.displayOrder || 1}</span>
                    </div>
                    <input 
                      type="range" 
                      name="displayOrder" 
                      min="1" 
                      max="20" 
                      value={formData.displayOrder || 1} 
                      onChange={handleChange} 
                      style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                    />
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                      Lower numbers appear first (e.g. 1 is highest priority). Use this bar to sort projects.
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Short Description (For Cards)</label>
                    <textarea name="shortDescription" className="form-textarea" style={{ minHeight: '80px' }} value={formData.shortDescription || ''} onChange={handleChange}></textarea>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Full Overview (For Details Page)</label>
                    <textarea name="fullDescription" className="form-textarea" style={{ minHeight: '120px' }} value={formData.fullDescription || ''} onChange={handleChange}></textarea>
                  </div>

                  <div className="admin-form-row">
                    <div className="form-group">
                      <label className="form-label">Live URL</label>
                      <input type="url" name="liveUrl" className="form-input" value={formData.liveUrl || ''} onChange={handleChange} placeholder="https://..." />
                    </div>
                    <div className="form-group">
                      <label className="form-label">GitHub URL</label>
                      <input type="url" name="githubUrl" className="form-input" value={formData.githubUrl || ''} onChange={handleChange} placeholder="https://github.com/..." />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Technologies (comma separated)</label>
                    <input type="text" name="technologies" className="form-input" value={formData.technologies} onChange={handleChange} placeholder="React, Node.js, AI" />
                  </div>
                </form>
              </div>

              <div className="admin-modal-footer">
                <button className="btn btn-ghost" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" form="projectForm" className="btn btn-primary">Save Project</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
