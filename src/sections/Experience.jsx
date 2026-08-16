import React from 'react'
import { useInView } from 'react-intersection-observer'
import './Experience.css'

const experiences = [
  {
    role: 'Founder & CEO',
    company: 'Edutrakify ERP Solutions Pvt Ltd',
    period: 'Nov 2024 — Present',
    location: 'Hyderabad, India',
    type: 'Startup',
    points: [
      'Built EduTrak — a two-system school ERP (school portal + admin panel for onboarding and access control).',
      'Shipped 21 base features per school, with AI capabilities unlocked through additional subscriptions.',
      'Own product direction, architecture, and delivery while growing the company from scratch.',
    ],
  },
  {
    role: 'Project Manager',
    company: 'Mahasos info tech pvt ltd',
    period: 'May 2018 — Aug 2026',
    location: 'Hyderabad, India',
    type: 'Full-time',
    points: [
      'Led delivery of the rent reporting module for Credit Sesame.',
      'Owned timelines and shipped consistently against deadlines.',
      'Managed the team day-to-day and improved overall delivery efficiency.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Aurora E Labs',
    period: 'Nov 2017 — May 2018',
    location: 'Hyderabad, India',
    type: 'Full-time',
    points: [
      'Owned requirement gathering for service-based client projects.',
      'Delivered ~90% of project work independently end to end.',
      'Worked directly with clients across the full delivery cycle.',
    ],
  },
]

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true })

  return (
    <section id="experience" className="experience section-padding">
      <div className="experience-glow" />
      <div className="container" ref={ref}>
        <div className={`experience-header ${inView ? 'visible' : ''}`}>
          <p className="overline">Career Path</p>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            Roles I've held and the work I shipped — from client delivery to running my own product company.
          </p>
        </div>

        <div className={`experience-timeline ${inView ? 'visible' : ''}`}>
          {experiences.map((job, i) => (
            <article
              key={`${job.company}-${job.role}`}
              className="experience-item"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="timeline-marker">
                <span className="timeline-dot" />
                {i < experiences.length - 1 && <span className="timeline-line" />}
              </div>

              <div className="experience-card glass-card">
                <div className="experience-card-top">
                  <div>
                    <p className="experience-role">{job.role}</p>
                    <h3 className="experience-company">{job.company}</h3>
                  </div>
                  <span className="experience-type">{job.type}</span>
                </div>

                <div className="experience-meta">
                  <span>{job.period}</span>
                  <span className="meta-dot" />
                  <span>{job.location}</span>
                </div>

                <ul className="experience-points">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
