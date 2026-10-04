import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, RotateCcw } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';

const commands = {
  'whoami': <span style={{ color: '#10b981' }}>aditya-kittad</span>,
  'focus': 'software-engineering & cloud-infrastructure',
  'systems': (
    <span>
      <span style={{ color: '#3b82f6' }}>linux</span> / <span style={{ color: '#3b82f6' }}>rhel 9.x</span> / <span style={{ color: '#3b82f6' }}>kernel 5.14</span> / <span style={{ color: '#3b82f6' }}>selinux-enforcing</span>
    </span>
  ),
  'automation': (
    <span style={{ color: '#f59e0b' }}>
      bash / python / ansible playbooks / cron
    </span>
  ),
  'containers': (
    <span style={{ color: '#f97316' }}>
      podman (do188 certified) / docker / rootless / openshift basics
    </span>
  ),
  'certifications': 'RHCSA (2026), DO188 (1st Rank Tech Quiz)',
  'cat resume.txt': 'Loading resume from storage... (View resume button above)',
  'help': 'Available commands: whoami, focus, systems, automation, containers, certifications, cat resume.txt, clear'
};

export default function Terminal() {
  const [history, setHistory] = useState([
    { cmd: 'whoami', output: commands['whoami'] },
    { cmd: 'focus', output: commands['focus'] },
    { cmd: 'systems', output: commands['systems'] },
    { cmd: 'automation', output: commands['automation'] },
    { cmd: 'containers', output: commands['containers'] }
  ]);
  const [input, setInput] = useState('');
  const terminalBodyRef = useRef(null);

  const handleCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    if (cmd === '') return;
    
    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const output = commands[cmd] || `bash: ${cmd}: command not found. Type 'help' for available commands.`;
    setHistory(prev => [...prev, { cmd, output }]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <section className="section" id="terminal">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 className="section-title" variants={fadeInUp}>
            Interactive Terminal Environment
          </motion.h2>
          <motion.p className="section-subtitle" variants={fadeInUp} style={{ marginBottom: 'var(--space-8)' }}>
            A live telemetry console demonstrating core engineering paradigms and command-line familiarity.
          </motion.p>

          <motion.div variants={fadeInUp} style={{ maxWidth: '900px', margin: '0 auto', background: '#0d0d12', borderRadius: '12px', border: '1px solid var(--color-border)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
            
            {/* Terminal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#16161a', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }}></div>
                <div style={{ marginLeft: '12px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  <span style={{ color: '#ef4444' }}>&gt;_</span> aditya@rhel9: ~ (bash)
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', color: 'var(--color-text-muted)' }}>
                <button style={{ color: 'inherit' }} aria-label="Copy output"><Copy size={14} /></button>
                <button style={{ color: 'inherit' }} onClick={() => setHistory([])} aria-label="Restart terminal"><RotateCcw size={14} /></button>
              </div>
            </div>

            {/* Terminal Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.02)', overflowX: 'auto', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}>Quick Run:</span>
              {Object.keys(commands).map(cmd => (
                <button 
                  key={cmd} 
                  onClick={() => handleCommand(cmd)}
                  style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', transition: 'background 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  {cmd}
                </button>
              ))}
              <button 
                onClick={() => handleCommand('clear')}
                style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', transition: 'background 0.2s' }}
              >
                clear
              </button>
            </div>

            {/* Terminal Body */}
            <div ref={terminalBodyRef} style={{ padding: '24px', minHeight: '300px', maxHeight: '400px', overflowY: 'auto', fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: '1.6' }} className="mono">
              {history.map((entry, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{ color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                    <span style={{ color: '#ef4444' }}>$</span> {entry.cmd}
                  </div>
                  <div style={{ color: 'var(--color-text-secondary)', paddingLeft: '16px' }}>
                    {entry.output}
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-primary)' }}>
                <span style={{ color: '#ef4444', marginRight: '8px' }}>$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type a command (e.g. 'help', 'focus')..."
                  style={{ background: 'transparent', border: 'none', color: 'inherit', outline: 'none', width: '100%', fontFamily: 'inherit', fontSize: 'inherit' }}
                />
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
