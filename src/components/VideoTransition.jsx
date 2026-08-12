import React, { useRef, useEffect, useState } from 'react'
import './VideoTransition.css'

export default function VideoTransition({ src }) {
  const videoRef = useRef()
  const wrapRef = useRef()
  const [phase, setPhase] = useState('hidden') // hidden | entering | playing | leaving

  useEffect(() => {
    const wrap = wrapRef.current
    const video = videoRef.current
    if (!wrap || !video) return

    let scrollY = window.scrollY
    let ticking = false
    let lastPhase = 'hidden'

    // Track total scroll height to pick transition trigger points
    const getSections = () => {
      const sections = document.querySelectorAll('section[id]')
      const points = []
      sections.forEach((s, i) => {
        if (i < sections.length - 1) {
          const rect = s.getBoundingClientRect()
          const top = rect.bottom + window.scrollY - 80
          points.push(top)
        }
      })
      return points
    }

    const checkScroll = () => {
      const sy = window.scrollY
      const wh = window.innerHeight
      const points = getSections()

      let inTransition = false
      for (const pt of points) {
        if (sy + wh / 2 >= pt - 60 && sy + wh / 2 <= pt + 80) {
          inTransition = true
          break
        }
      }

      if (inTransition && lastPhase === 'hidden') {
        lastPhase = 'playing'
        setPhase('playing')
        video.currentTime = 0
        video.play().catch(() => {})
        // auto-hide after clip ends or 2.5s
        setTimeout(() => {
          lastPhase = 'hidden'
          setPhase('hidden')
          video.pause()
        }, 2500)
      }
    }

    const onScroll = () => {
      scrollY = window.scrollY
      if (!ticking) {
        requestAnimationFrame(() => {
          checkScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={wrapRef} className={`video-transition ${phase === 'playing' ? 'show' : ''}`}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop={false}
        preload="auto"
        className="video-transition-clip"
      />
      <div className="video-transition-overlay" />
    </div>
  )
}
