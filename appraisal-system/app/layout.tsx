'use client'
import './globals.css'
import { useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Custom cursor
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dot) {
        dot.style.left = mouseX + 'px'
        dot.style.top = mouseY + 'px'
      }
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ring) {
        ring.style.left = ringX + 'px'
        ring.style.top = ringY + 'px'
      }
      requestAnimationFrame(animateRing)
    }

    document.addEventListener('mousemove', moveCursor)
    animateRing()

    // Hover effect on interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => ring?.classList.add('hovering'))
      el.addEventListener('mouseleave', () => ring?.classList.remove('hovering'))
    })

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1 })
    reveals.forEach(el => observer.observe(el))

    // Particle system
    const canvas = document.getElementById('particles') as HTMLCanvasElement
    if (canvas) {
      const ctx = canvas.getContext('2d')!
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const particles: Array<{x: number, y: number, vx: number, vy: number, size: number, opacity: number}> = []
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        })
      }

      const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        particles.forEach(p => {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(226, 184, 36, ${p.opacity})`
          ctx.fill()
        })
        requestAnimationFrame(animateParticles)
      }
      animateParticles()

      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      })
    }

    return () => document.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <html lang="en">
      <head>
        <title>AppraisalAI — ML-Based Employee Appraisal System</title>
        <meta name="description" content="Premium ML-powered employee performance appraisal system" />
      </head>
      <body>
        <canvas id="particles" />
        <div id="cursor-dot" />
        <div id="cursor-ring" />
        <div className="watermark">Made by Kumar Subodh</div>
        <SessionProvider>
          <div className="relative z-10">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
