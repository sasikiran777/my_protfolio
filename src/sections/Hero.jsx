import React, { useEffect, useRef } from 'react'
import profileFront from '../../assets/profile-front.png'
import introVideo from '../../assets/intro-loop.mp4'
import './Hero.css'

const roles = ['Full Stack Developer', 'Founder @ Edutrakify ERP Solutions', 'React & Vue Developer', 'AI & RAG Builder']

function PortraitVideo() {
  const videoRef = useRef(null)
  const hasEndedRef = useRef(false)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  const handleEnded = () => {
    hasEndedRef.current = true
  }

  const handleHover = () => {
    const video = videoRef.current
    if (!video || !hasEndedRef.current) return
    hasEndedRef.current = false
    video.currentTime = 0
    video.play().catch(() => {})
  }

  return (
    <div className="hero-portrait" onMouseEnter={handleHover}>
      <div className="portrait-ring" />
      <div className="portrait-inner">
        <video
          ref={videoRef}
          className="portrait-video"
          src={introVideo}
          poster={profileFront}
          muted
          playsInline
          preload="auto"
          onEnded={handleEnded}
        />
      </div>
      <div className="portrait-tag">Founder · Developer</div>
    </div>
  )
}

export default function Hero() {
  const roleRef = useRef()
  const roleIdx = useRef(0)
  const charIdx = useRef(0)
  const deleting = useRef(false)

  useEffect(() => {
    let timeout

    function type() {
      const role = roles[roleIdx.current]
      if (!deleting.current) {
        charIdx.current++
        if (roleRef.current) roleRef.current.textContent = role.slice(0, charIdx.current)
        if (charIdx.current === role.length) {
          deleting.current = true
          timeout = setTimeout(type, 1800)
          return
        }
      } else {
        charIdx.current--
        if (roleRef.current) roleRef.current.textContent = role.slice(0, charIdx.current)
        if (charIdx.current === 0) {
          deleting.current = false
          roleIdx.current = (roleIdx.current + 1) % roles.length
          timeout = setTimeout(type, 400)
          return
        }
      }
      timeout = setTimeout(type, deleting.current ? 60 : 100)
    }

    timeout = setTimeout(type, 1000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />

      <div className="container hero-content">
        <div className="hero-left">
          <p className="hero-greeting">Hey, I'm</p>

          <h1 className="hero-name">Sasi Kiran</h1>

          <div className="hero-role-wrap">
            <span ref={roleRef} className="hero-role" />
            <span className="cursor-blink">|</span>
          </div>

          <p className="hero-desc">
            I build web & mobile apps that actually get used — not just demos. Founder of <strong>Edutrakify ERP Solutions Pvt Ltd</strong>. React, Vue, Python, Go — and these days I wire AI into products that ship: RAG pipelines, agents, and integrations in production.
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn-primary">
              <span>View My Work</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="/assets/sasi-resume.pdf" download className="btn-outline">Resume</a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">1</span>
              <span className="stat-label">Startup Founded</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">7+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <PortraitVideo />
        </div>
      </div>

      <a href="#about" className="scroll-indicator">
        <span>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </a>
    </section>
  )
}
