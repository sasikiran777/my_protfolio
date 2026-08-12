import React, { useState } from 'react'
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Projects.css'

const projects = [
  {
    title: 'BPO Solutions Group',
    category: 'Web Platform',
    desc: 'Frontend-only marketing and client-facing platform. Built entirely in React + Vite — fast, clean UI with no backend dependency on this side.',
    url: 'https://beta.bposolutionsgroup.com/',
    tech: ['React', 'Vite', 'TypeScript'],
    color: '#915eff',
    featured: true,
  },
  {
    title: 'BPO Internal Portal',
    category: 'Internal Tool',
    desc: 'Internal ops hub for employee tracking, task assignment, and productivity. Vue 3 frontend with Python FastAPI backend and third-party integrations — Jibble, ActivTrak, and more.',
    url: 'https://internal.bposolutionsgroup.com/',
    tech: ['Vue 3', 'FastAPI', 'Python', 'Jibble'],
    color: '#00d4ff',
    featured: false,
  },
  {
    title: 'Assessment Platform',
    category: 'EdTech',
    desc: 'Online assessment and evaluation with automated scoring and candidate management. Backend runs as microservices — Go for REST APIs, Python for AI agents handling evaluation logic.',
    url: 'https://assess.bposolutionsgroup.com',
    tech: ['Vue.js', 'Go', 'Python', 'AI Agents'],
    color: '#ff6b6b',
    featured: false,
  },
  {
    title: 'Staffing Solution',
    category: 'HR Tech',
    desc: 'End-to-end staffing and recruitment — job postings, applicant tracking, onboarding. Vue 3 frontend with Python FastAPI backend and web scraping pipelines for candidate sourcing.',
    url: 'https://staffing.bposolutionsgroup.com',
    tech: ['Vue 3', 'FastAPI', 'Python', 'Web Scraping'],
    color: '#00ff9d',
    featured: false,
  },
  {
    title: 'DTR Mobile App',
    category: 'Mobile App',
    desc: 'Android app for daily time records and workforce management. Published on Google Play Store.',
    url: 'https://play.google.com/store/apps/details?id=com.dtr.users&pcampaignid=web_share',
    tech: ['Flutter', 'Firebase', 'Android'],
    color: '#ffd700',
    featured: true,
  },
  {
    title: 'Viswahita Admin',
    category: 'Healthcare',
    desc: 'Healthcare admin portal — patient management, appointments, reporting. Vue 3 frontend with Bun + Hono backend, JWT auth, and scheduled cron jobs.',
    url: 'https://admin.viswahita.com/',
    tech: ['Vue 3', 'Bun', 'Hono', 'JWT'],
    color: '#ff9f43',
    featured: false,
  },
  {
    title: 'ScylexLab Reports',
    category: 'Analytics',
    desc: 'Processes gene data and generates diagnostic reports for providers to access. The reporting layer of the ScylexLab pipeline — from raw gene input to structured clinical output.',
    url: 'https://reports.scylexlab.com/',
    tech: ['React', 'D3.js', 'Gene Processing', 'Node.js'],
    color: '#a29bfe',
    featured: true,
  },
  {
    title: 'ScylexLab Provider',
    category: 'Healthcare',
    desc: 'ML-powered provider portal for gene analysis, drug prescription recommendations, and patient relapse prediction. The clinical intelligence side of ScylexLab.',
    url: 'https://provider.scylexlab.com',
    tech: ['React', 'Python', 'ML', 'PostgreSQL'],
    color: '#74b9ff',
    featured: false,
  },
  {
    title: 'EduTrak — My Startup',
    category: 'EdTech',
    desc: 'My company product — a two-system ERP: one portal for schools, one admin panel for me to onboard and manage them. Every school gets 21 base features; AI capabilities unlock via additional subscriptions.',
    url: 'https://edutrak.in',
    tech: ['React', 'Node.js', 'ERP', 'AI Subscriptions'],
    color: '#fd79a8',
    featured: true,
    founder: true,
  },
  {
    title: 'RAG Applications',
    category: 'AI',
    desc: 'Retrieval-Augmented Generation apps built for real use cases — document Q&A, knowledge base search, and context-aware chatbots wired into existing products.',
    url: '#',
    tech: ['Python', 'LangChain', 'OpenAI', 'Vector DBs'],
    color: '#ff9f43',
    featured: false,
    noLink: true,
  },
]

const categories = ['All', 'Web Platform', 'Mobile App', 'Healthcare', 'EdTech', 'Analytics', 'HR Tech', 'Internal Tool', 'AI']

function ProjectCard({ project, sectionVisible }) {
  return (
    <div className={`project-card glass-card ${sectionVisible ? 'visible' : ''} ${project.featured ? 'featured' : ''}`}>
      {project.founder && <div className="founder-badge">My Startup</div>}
      {project.featured && !project.founder && <div className="featured-badge">Featured</div>}
      <div className="project-header">
        <div className="project-category-tag" style={{ color: project.color }}>
          {project.category}
        </div>
      </div>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.desc}</p>

      <div className="project-card-footer">
        <div className="project-tech">
          {project.tech.map(t => (
            <span key={t} className="tech-tag" style={{ borderColor: `${project.color}40`, color: project.color }}>
              {t}
            </span>
          ))}
        </div>

        {!project.noLink ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            style={{ color: project.color }}
          >
            <span>View Live</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
        ) : (
          <span className="project-link project-link-static" style={{ color: project.color }}>
            Internal / Client Projects
          </span>
        )}
      </div>

      <div className="project-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}15, transparent 70%)` }} />
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  const handleFilter = (cat) => {
    const scrollY = window.scrollY
    setFilter(cat)
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY)
    })
  }

  return (
    <section id="projects" className="projects section-padding">
      <div className="projects-bg-glow" />
      <div className="container">
        <div ref={ref} className={`projects-header ${inView ? 'visible' : ''}`}>
          <p className="overline">What I've Built</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Things I've actually shipped — not side projects that live on GitHub forever. Real users, real deadlines, real bugs that had to get fixed at 11pm.
          </p>
        </div>

        <div className="filter-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-tab ${filter === cat ? 'active' : ''}`}
              onClick={() => handleFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <LayoutGroup id="projects">
          <motion.div className="projects-grid" layout transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}>
            <AnimatePresence mode="popLayout">
              {filtered.map(p => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="project-card-slot"
                >
                  <ProjectCard project={p} sectionVisible={inView} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}
