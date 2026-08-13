import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useInView } from 'react-intersection-observer'
import {
  SiReact, SiVuedotjs, SiVite, SiNodedotjs, SiGo, SiFastapi,
  SiPython, SiBun, SiHono, SiFlutter, SiMongodb, SiPostgresql,
  SiDocker, SiTypescript, SiLangchain,
  SiQdrant, SiGit, SiMysql, SiSelenium, SiHuggingface,
  SiN8N, SiOllama, SiClaude, SiGooglegemini, SiMoonshotai,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'
import { TbBrandOpenai, TbBrain } from 'react-icons/tb'
import './Skills.css'

const skillGroups = [
  {
    title: 'Frontend',
    color: '#915eff',
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'Vue.js', level: 80 },
      { name: 'JavaScript / TypeScript', level: 90 },
      { name: 'HTML5 / CSS3', level: 95 },
      { name: 'Three.js / WebGL', level: 70 },
    ],
  },
  {
    title: 'Backend',
    color: '#00d4ff',
    skills: [
      { name: 'Node.js / Express', level: 88 },
      { name: 'Python / FastAPI', level: 85 },
      { name: 'Go (Golang)', level: 72 },
      { name: 'Bun / Hono', level: 70 },
      { name: 'REST APIs & Microservices', level: 90 },
    ],
  },
  {
    title: 'Mobile & Tools',
    color: '#00ff9d',
    skills: [
      { name: 'Flutter / Dart', level: 75 },
      { name: 'Android Development', level: 72 },
      { name: 'Docker / AWS', level: 70 },
      { name: 'Git / GitHub', level: 90 },
      { name: 'Figma / UI Design', level: 75 },
    ],
  },
  {
    title: 'AI & Integrations',
    color: '#ff9f43',
    skills: [
      { name: 'Claude / Gemini / Kimi / GLM', level: 82 },
      { name: 'OpenAI API / AI Agents', level: 80 },
      { name: 'RAG Applications', level: 78 },
      { name: 'n8n Automation', level: 76 },
      { name: 'Ollama (Local LLMs)', level: 72 },
    ],
  },
]

const techLogos = [
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'Vue 3', Icon: SiVuedotjs, color: '#4FC08D' },
  { name: 'Vite', Icon: SiVite, color: '#646CFF' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
  { name: 'Go', Icon: SiGo, color: '#00ADD8' },
  { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'Bun', Icon: SiBun, color: '#FBF0DF' },
  { name: 'Hono', Icon: SiHono, color: '#E36002' },
  { name: 'Flutter', Icon: SiFlutter, color: '#02569B' },
  { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { name: 'AWS', Icon: FaAws, color: '#FF9900' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'RAG', Icon: SiHuggingface, color: '#FFD21E' },
  { name: 'LangChain', Icon: SiLangchain, color: '#ffffff' },
  { name: 'OpenAI', Icon: TbBrandOpenai, color: '#74AA9C' },
  { name: 'Claude', Icon: SiClaude, color: '#D97757' },
  { name: 'Gemini', Icon: SiGooglegemini, color: '#8E75B2' },
  { name: 'Kimi', Icon: SiMoonshotai, color: '#63E2FF' },
  { name: 'GLM', Icon: TbBrain, color: '#4A90E2' },
  { name: 'n8n', Icon: SiN8N, color: '#EA4B71' },
  { name: 'Ollama', Icon: SiOllama, color: '#ffffff' },
  { name: 'Vector DBs', Icon: SiQdrant, color: '#DC244C' },
  { name: 'Git', Icon: SiGit, color: '#F05032' },
  { name: 'MySQL', Icon: SiMysql, color: '#4479A4' },
  { name: 'Web Scraping', Icon: SiSelenium, color: '#43B02A' },
]

function SkillBar({ name, level, color, inView }) {
  return (
    <div className="skill-bar-item">
      <div className="skill-bar-header">
        <span>{name}</span>
        <span style={{ color }}>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: inView ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          }}
        />
      </div>
    </div>
  )
}

function FloatingCube({ position, color, speed }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = state.clock.getElapsedTime() * speed
    ref.current.rotation.y = state.clock.getElapsedTime() * speed * 0.8
    ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5 + position[0]) * 0.3
  })
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <meshStandardMaterial color={color} wireframe transparent opacity={0.6} />
    </mesh>
  )
}

function SkillsScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} color="#915eff" intensity={2} />
      <FloatingCube position={[-2, 0, 0]} color="#915eff" speed={0.4} />
      <FloatingCube position={[2, 1, -1]} color="#00d4ff" speed={0.3} />
      <FloatingCube position={[0, -1, 0]} color="#00ff9d" speed={0.5} />
      <FloatingCube position={[-1, 2, -2]} color="#ff6b6b" speed={0.35} />
      <FloatingCube position={[3, -1, -1]} color="#ffd700" speed={0.25} />
    </>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="skills" className="skills section-padding">
      <div className="skills-canvas-bg">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <Suspense fallback={null}>
            <SkillsScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="container" ref={ref}>
        <div className={`skills-header ${inView ? 'visible' : ''}`}>
          <p className="overline">My Arsenal</p>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            The tools I reach for when building stuff. I've used most of these in production — the percentages are honest, not padded.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, gi) => (
            <div
              key={gi}
              className={`skill-group glass-card ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: `${gi * 150}ms` }}
            >
              <div className="skill-group-header">
                <div className="skill-group-dot" style={{ background: group.color, boxShadow: `0 0 12px ${group.color}` }} />
                <h3 style={{ color: group.color }}>{group.title}</h3>
              </div>
              <div className="skill-bars">
                {group.skills.map((skill, si) => (
                  <SkillBar key={si} {...skill} color={group.color} inView={inView} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`tech-logos ${inView ? 'visible' : ''}`}>
          <p className="tech-logos-title">Technologies & Tools</p>
          <div className="tech-logos-grid">
            {techLogos.map((tech, i) => {
              const Icon = tech.Icon
              return (
                <div
                  key={tech.name}
                  className="tech-logo-item glass-card"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <Icon className="tech-logo-icon" style={{ color: tech.color }} />
                  <span>{tech.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
