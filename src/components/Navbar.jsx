import React, { useState, useEffect } from 'react'
import './Navbar.css'

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        <a href="#hero" className="nav-logo" onClick={() => setActive('Home')}>
          <div className="logo-box">SK</div>
          <span>Sasi Kiran</span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l.label}>
              <a
                href={l.href}
                className={active === l.label ? 'active' : ''}
                onClick={() => { setActive(l.label); setMenuOpen(false) }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/assets/sasi-resume.pdf"
              download
              className="nav-resume-btn"
            >
              Resume
            </a>
          </li>
        </ul>

        <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
