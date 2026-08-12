import React from 'react'
import { useInView } from 'react-intersection-observer'
import './About.css'

import profileFront from '../../assets/profile-front.png'
import profileSuit from '../../assets/profile-suit.png'
import profileFamily from '../../assets/profile-family.png'

const highlights = [
  { title: 'Founder & CEO', desc: 'Edutrakify ERP Solutions Pvt Ltd — built from scratch' },
  { title: 'Full Stack Dev', desc: 'React, Vue, Node.js, Python, Go — whatever fits the problem' },
  { title: 'Mobile Apps', desc: 'Android apps published on the Play Store' },
  { title: 'AI & RAG', desc: 'RAG apps, AI agents, OpenAI & LangChain in production' },
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="about" className="about section-padding">
      <div className="about-glow" />
      <div className="container" ref={ref}>
        <div className={`about-grid ${inView ? 'visible' : ''}`}>
          <div className="about-images">
            <div className="img-main glass-card">
              <img src={profileFront} alt="Sasi Kiran" />
            </div>
            <div className="img-secondary glass-card">
              <img src={profileSuit} alt="Sasi Kiran" />
            </div>
            <div className="img-third glass-card">
              <img src={profileFamily} alt="Sasi Kiran" />
            </div>
            <div className="experience-badge">
              <span className="exp-num">7+</span>
              <span className="exp-label">Years of Experience</span>
            </div>
          </div>

          <div className="about-text">
            <p className="overline">Who I Am</p>
            <h2 className="section-title">Passionate Developer &<br />Problem Solver</h2>
            <p className="about-bio">
              Hey — I'm <strong>Sasi Kiran</strong>. I build things for the web (and sometimes my phone). Started out just tinkering with HTML pages, ended up shipping production apps used by real teams every day. Funny how that works.
            </p>
            <p className="about-bio">
              My stack is mostly React + Node.js, but I'll pick up whatever the project needs. I've built everything from internal HR tools to patient portals to Android apps on the Play Store. I also started integrating <strong>AI features</strong> into a few projects recently — still learning, but genuinely excited by it.
            </p>
            <p className="about-bio">
              I'm also the founder of <strong>Edutrakify ERP Solutions Pvt Ltd</strong> — a company I started to solve real problems in the education space. Building a startup while shipping client projects taught me how to move fast, make decisions with incomplete info, and still care about code quality.
            </p>
            <p className="about-bio">
              Outside work: time with family, obsessing over clean UI, and occasionally breaking things just to figure out how they work.
            </p>

            <div className="highlights-grid">
              {highlights.map((h, i) => (
                <div key={i} className="highlight-card glass-card">
                  <h4>{h.title}</h4>
                  <p>{h.desc}</p>
                </div>
              ))}
            </div>

            <div className="about-cta">
              <a href="/assets/sasi-resume.pdf" download className="btn-primary">
                <span>Download Resume</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
