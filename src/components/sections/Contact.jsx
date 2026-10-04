import { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, Phone, Send, Loader2 } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { socialLinks } from '../../data/initialData';

const iconMap = { linkedin: Linkedin, github: Github, mail: Mail, phone: Phone };

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
      
      if (!accessKey) {
        console.error("Web3Forms API key is missing");
        alert("Email service is not configured yet. Please add VITE_WEB3FORMS_KEY to .env");
        setStatus('error');
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Portfolio Contact Form'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="section-label" variants={fadeInUp}>
            Contact
          </motion.div>

          <motion.h2 className="section-title" variants={fadeInUp}>
            Let's build something useful.
          </motion.h2>

          <motion.p className="section-subtitle" variants={fadeInUp} style={{ marginBottom: 'var(--space-10)' }}>
            Open to engineering opportunities, technical collaborations, product work, and technology partnerships.
          </motion.p>

          <div className="contact-grid">
            <motion.div className="contact-info" variants={fadeInUp}>
              <div className="contact-channels">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon] || Mail;
                  return (
                    <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="contact-channel">
                      <div className="contact-channel-icon">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="contact-channel-label">{link.platform}</div>
                        <div className="contact-channel-value">{link.url.replace(/(^\w+:|^)\/\//, '').replace('mailto:', '').replace('tel:', '')}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="card-flat">
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-input"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Collaboration"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-textarea"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about what we can build together..."
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={status === 'loading' || status === 'success'}
                    style={{ width: '100%', marginTop: 'var(--space-2)' }}
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={18} className="animate-spin" /> Sending...</>
                    ) : status === 'success' ? (
                      'Message Sent!'
                    ) : (
                      <><Send size={18} /> Send Message</>
                    )}
                  </button>

                  {status === 'success' && (
                    <div className="form-success">
                      Thanks for reaching out! I'll get back to you soon.
                    </div>
                  )}
                  
                  {status === 'error' && (
                    <div className="form-error">
                      Something went wrong. Please try again or use direct email.
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
