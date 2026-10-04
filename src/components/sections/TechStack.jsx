import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '../../lib/animations';
import { usePortfolioData } from '../../hooks/usePortfolio';
import {
  Cloud, Terminal, Shield, Code, Layers, Zap, Server, Box, Settings, GitBranch,
  Github, Lock, Key, Search, CheckCircle, Coffee, Braces, Database, FileCode,
  Palette, Globe, Move, SquareTerminal, Hexagon, Triangle, Brain, Calculator,
  Table2, Workflow, Bot, Sparkles, Wind, Layout, Atom,
} from 'lucide-react';

const iconComponents = {
  cloud: Cloud, terminal: Terminal, shield: Shield, code: Code, layers: Layers,
  zap: Zap, server: Server, box: Box, settings: Settings, 'git-branch': GitBranch,
  github: Github, lock: Lock, key: Key, search: Search, 'check-circle': CheckCircle,
  coffee: Coffee, braces: Braces, database: Database, 'file-code': FileCode,
  palette: Palette, globe: Globe, move: Move, 'terminal-square': SquareTerminal,
  hexagon: Hexagon, triangle: Triangle, brain: Brain, calculator: Calculator,
  table: Table2, workflow: Workflow, bot: Bot, sparkles: Sparkles, wind: Wind,
  layout: Layout, atom: Atom,
};

export default function TechStack() {
  const { skillCategories: skillCategoriesData } = usePortfolioData();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all'
    ? skillCategoriesData
    : skillCategoriesData.filter(c => c.id === activeCategory);

  return (
    <section className="section" id="stack">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="section-label" variants={fadeInUp}>
            Technical Ecosystem
          </motion.div>

          <motion.h2 className="section-title" variants={fadeInUp}>
            The stack behind the builder
          </motion.h2>

          <motion.p className="section-subtitle" variants={fadeInUp} style={{ marginBottom: 'var(--space-9)' }}>
            Technologies I work with across cloud, DevOps, security, and AI.
          </motion.p>

          {/* Category Filter */}
          <motion.div className="stack-categories" variants={fadeInUp}>
            <button
              className={`stack-category-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            {skillCategoriesData.map((cat) => (
              <button
                key={cat.id}
                className={`stack-category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {filteredSkills.map((category) => (
                <div key={category.id} style={{ marginBottom: 'var(--space-9)' }}>
                  {activeCategory === 'all' && (
                    <h3 style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--space-5)',
                    }}>
                      {category.name}
                    </h3>
                  )}
                  <div className="stack-grid">
                    {category.skills.map((skill, i) => {
                      const Icon = iconComponents[skill.icon] || Code;
                      return (
                        <motion.div
                          key={skill.name}
                          className="stack-item"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03, duration: 0.4 }}
                        >
                          <Icon size={24} style={{ color: 'var(--color-accent)', opacity: 0.8 }} />
                          <span className="stack-item-name">{skill.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
