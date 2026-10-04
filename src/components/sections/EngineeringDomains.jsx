import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Box, Server, Cpu, Database, Activity, GitBranch } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';

const nodeData = {
  core: {
    id: 'core', label: 'Cloud Core', sub: 'INFRASTRUCTURE', icon: Server, color: '#10b981', 
    pos: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    title: 'Cloud-Native Infrastructure',
    metrics: ['AWS / OCI', 'High Availability', 'Load Balancing'],
    desc: 'The central backbone of all deployments, focusing on scalable and resilient cloud architectures.'
  },
  sysadmin: {
    id: 'sysadmin', label: 'SysAdmin', sub: 'LINUX / RHEL', icon: Database, color: '#3b82f6', 
    pos: { top: '20%', left: '25%', transform: 'translate(-50%, -50%)' },
    title: 'Enterprise Linux Administration',
    metrics: ['RHEL 9.x', 'Systemd', 'LVM & Storage'],
    desc: 'Deep kernel-level management, process scheduling, and robust system resource allocation.'
  },
  containers: {
    id: 'containers', label: 'Containers', sub: 'PODMAN / DOCKER', icon: Box, color: '#06b6d4', 
    pos: { top: '80%', left: '25%', transform: 'translate(-50%, -50%)' },
    title: 'Container Orchestration',
    metrics: ['OCI Compliant', 'Rootless', 'Microservices'],
    desc: 'Daemonless containerization with Podman for highly secure and isolated microservice workloads.'
  },
  automation: {
    id: 'automation', label: 'Automation', sub: 'ANSIBLE', icon: Cpu, color: '#8b5cf6', 
    pos: { top: '20%', left: '75%', transform: 'translate(-50%, -50%)' },
    title: 'Infrastructure as Code',
    metrics: ['Playbooks', 'Idempotency', 'CI/CD Pipelines'],
    desc: 'Automating fleet configurations and deployments to eliminate manual overhead and ensure consistency.'
  },
  security: {
    id: 'security', label: 'Security', sub: 'ZERO TRUST', icon: Shield, color: '#f43f5e', 
    pos: { top: '80%', left: '75%', transform: 'translate(-50%, -50%)' },
    title: 'Cybersecurity & Hardening',
    metrics: ['SELinux', 'Firewalld', 'Auditing'],
    desc: 'Enforcing strict access controls, mandatory access policies, and network perimeter defense.'
  }
};

export default function EngineeringDomains() {
  const [activeNode, setActiveNode] = useState('core');
  const nodes = Object.values(nodeData);
  const active = nodeData[activeNode];

  return (
    <section className="section" id="topology">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="section-label" variants={fadeInUp}>
            Technical Breadth
          </motion.div>
          <motion.h2 className="section-title" variants={fadeInUp} style={{ marginBottom: 'var(--space-8)' }}>
            Engineering Ecosystem
          </motion.h2>

          <motion.div variants={fadeInUp} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
            
            {/* Interactive Graph Area */}
            <div style={{ position: 'relative', height: '400px', background: 'rgba(13, 13, 18, 0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', backdropFilter: 'blur(10px)' }}>
              
              {/* Background Grid */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.5 }}></div>

              {/* Curved SVG Connections */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <defs>
                  <linearGradient id="grad-sysadmin" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="grad-containers" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="grad-automation" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="grad-security" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Left side connections (SysAdmin, Containers to Core) */}
                <path d="M 25% 20% C 40% 20%, 35% 50%, 50% 50%" fill="none" stroke="url(#grad-sysadmin)" strokeWidth={activeNode === 'sysadmin' || activeNode === 'core' ? "3" : "1"} strokeDasharray="5 5" opacity={activeNode === 'sysadmin' || activeNode === 'core' ? 1 : 0.2} style={{ transition: 'all 0.4s' }} />
                <path d="M 25% 80% C 40% 80%, 35% 50%, 50% 50%" fill="none" stroke="url(#grad-containers)" strokeWidth={activeNode === 'containers' || activeNode === 'core' ? "3" : "1"} strokeDasharray="5 5" opacity={activeNode === 'containers' || activeNode === 'core' ? 1 : 0.2} style={{ transition: 'all 0.4s' }} />
                
                {/* Right side connections (Core to Automation, Security) */}
                <path d="M 50% 50% C 65% 50%, 60% 20%, 75% 20%" fill="none" stroke="url(#grad-automation)" strokeWidth={activeNode === 'automation' || activeNode === 'core' ? "3" : "1"} strokeDasharray="5 5" opacity={activeNode === 'automation' || activeNode === 'core' ? 1 : 0.2} style={{ transition: 'all 0.4s' }} />
                <path d="M 50% 50% C 65% 50%, 60% 80%, 75% 80%" fill="none" stroke="url(#grad-security)" strokeWidth={activeNode === 'security' || activeNode === 'core' ? "3" : "1"} strokeDasharray="5 5" opacity={activeNode === 'security' || activeNode === 'core' ? 1 : 0.2} style={{ transition: 'all 0.4s' }} />

                {/* Orbital Rings around Core */}
                <circle cx="50%" cy="50%" r="80" fill="none" stroke="#10b981" strokeWidth="1" opacity={activeNode === 'core' ? 0.3 : 0.1} strokeDasharray="4 8" style={{ transition: 'all 0.4s' }}>
                  {activeNode === 'core' && <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite" />}
                </circle>
              </svg>

              {/* Render Nodes */}
              {nodes.map(node => (
                <div 
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  style={{
                    position: 'absolute',
                    ...node.pos,
                    cursor: 'pointer',
                    zIndex: activeNode === node.id ? 10 : 2,
                  }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    animate={{ scale: activeNode === node.id ? 1.15 : 1 }}
                    style={{
                      background: activeNode === node.id ? `radial-gradient(circle at top left, rgba(255,255,255,0.1), transparent), ${node.color}15` : 'rgba(20,20,25,0.8)',
                      border: `1px solid ${activeNode === node.id ? node.color : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: node.id === 'core' ? '50%' : '16px',
                      width: node.id === 'core' ? '120px' : '150px',
                      height: node.id === 'core' ? '120px' : 'auto',
                      padding: node.id === 'core' ? '0' : '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: activeNode === node.id ? `0 10px 30px -10px ${node.color}` : '0 4px 6px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <motion.div
                      animate={{ 
                        color: activeNode === node.id ? node.color : '#888',
                        y: activeNode === node.id && node.id !== 'core' ? -4 : 0
                      }}
                      style={{ transition: 'color 0.3s' }}
                    >
                      <node.icon size={node.id === 'core' ? 40 : 24} />
                    </motion.div>
                    
                    {node.id !== 'core' && (
                      <div style={{ textAlign: 'center', marginTop: '8px' }}>
                        <div style={{ fontWeight: '600', color: activeNode === node.id ? 'white' : '#ccc', fontSize: '14px' }}>{node.label}</div>
                        <div style={{ fontSize: '10px', color: '#666', marginTop: '2px', letterSpacing: '0.5px' }}>{node.sub}</div>
                      </div>
                    )}
                    
                    {node.id === 'core' && (
                      <div style={{ fontWeight: 'bold', color: activeNode === node.id ? 'white' : '#ccc', fontSize: '14px', marginTop: '8px' }}>CORE</div>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Dynamic Metadata Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: `1px solid ${active.color}30`, 
                  borderRadius: '20px', 
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Glow effect */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: active.color, boxShadow: `0 0 20px ${active.color}` }}></div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: active.color, fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                      <Activity size={16} />
                      {active.sub}
                    </div>
                    <h3 style={{ fontSize: '24px', color: 'white', margin: 0 }}>{active.title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', marginTop: '8px', maxWidth: '600px', lineHeight: '1.6' }}>
                      {active.desc}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '300px', justifyContent: 'flex-end' }}>
                    {active.metrics.map(metric => (
                      <div key={metric} style={{ background: `${active.color}15`, border: `1px solid ${active.color}30`, color: active.color, padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
