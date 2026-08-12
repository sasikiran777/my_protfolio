import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import './Contact.css'

const socials = [
  {
    name: 'GitHub',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    href: 'https://github.com/sasikiran777',
    color: '#fff',
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    href: 'https://www.linkedin.com/in/sasi-kiran-27a26693',
    color: '#0077b5',
  },
  {
    name: 'Email',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    href: 'mailto:sasikiran146@gmail.com',
    color: '#915eff',
  },
]

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sent')
    setTimeout(() => setStatus(''), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="contact section-padding">
      <div className="contact-glow" />
      <div className="container" ref={ref}>
        <div className={`contact-header ${inView ? 'visible' : ''}`}>
          <p className="overline">Get In Touch</p>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Got an idea? A broken thing that needs fixing? Just want to say hi? 
            Drop me a message — I reply to every one of them.
          </p>
        </div>

        <div className={`contact-grid ${inView ? 'visible' : ''}`}>
          <div className="contact-info">
            <div className="contact-info-block glass-card">
              <h3>Say Hello</h3>
              <p>
                I'm not great at corporate speak, so I'll keep it simple: if you want to build something together, or just want to talk dev stuff, reach out. I'll actually respond.
              </p>

              <div className="contact-socials">
                {socials.map(s => (
                  <a key={s.name} href={s.href} className="social-link glass-card" target="_blank" rel="noopener noreferrer">
                    <span style={{ color: s.color }}>{s.icon}</span>
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>

              <a href="/assets/sasi-resume.pdf" download className="btn-primary resume-download-btn">
                <span>Download Resume</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </a>
            </div>
          </div>

          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            <h3>Send a Message</h3>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                rows={5}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="btn-primary form-submit">
              <span>{status === 'sent' ? '✓ Message Sent!' : 'Send Message'}</span>
              {status !== 'sent' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
