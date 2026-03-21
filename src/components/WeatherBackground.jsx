import { motion, AnimatePresence } from 'framer-motion'
import { useMemo } from 'react'

// ── Rain drops ──────────────────────────────────────────────────────────────
function RainEffect() {
  const drops = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 0.7 + Math.random() * 0.5,
      opacity: 0.2 + Math.random() * 0.4,
      height: 10 + Math.random() * 10,
    })), []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" style={{ transform: 'translateZ(0)' }}>
      {drops.map((d) => (
        <motion.div
          key={d.id}
          className="absolute w-[1px] rounded-full"
          style={{
            left: d.left,
            top: '-20px',
            height: d.height,
            background: 'linear-gradient(to bottom, transparent, rgba(147,210,255,0.7))',
            opacity: d.opacity,
            willChange: 'transform',
          }}
          animate={{ y: ['0vh', '110vh'] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

// ── Strong Wind ──────────────────────────────────────────────────────────────
function WindEffect() {
  const lines = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 0.5 + Math.random() * 0.5,
    width: 60 + Math.random() * 100,
    opacity: 0.08 + Math.random() * 0.1
  })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" style={{ transform: 'translateZ(0)' }}>
      {lines.map(line => (
        <motion.div
           key={line.id}
           className="absolute h-[1px] rounded-full bg-white"
           style={{ top: line.top, width: line.width, left: '-20%', opacity: line.opacity, willChange: 'transform' }}
           animate={{ x: ['0vw', '130vw'] }}
           transition={{ duration: line.duration, delay: line.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

// ── Stars ───────────────────────────────────────────────────────────────────
function StarsEffect() {
  const stars = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 85}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() < 0.2 ? 2 : 1.2,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
    })), []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" style={{ transform: 'translateZ(0)' }}>
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, willChange: 'opacity' }}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ── Snowflakes ───────────────────────────────────────────────────────────────
function SnowEffect() {
  const flakes = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 6,
      size: 4 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 80,
      opacity: 0.4 + Math.random() * 0.4,
      rotateInitial: Math.random() * 360,
    })), []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" style={{ transform: 'translateZ(0)' }}>
      {flakes.map((f) => (
        <motion.div
          key={f.id}
          className="absolute rounded-full shadow-sm bg-white/80"
          style={{ 
            left: f.left, 
            top: '-20px', 
            width: f.size, 
            height: f.size, 
            opacity: f.opacity,
            willChange: 'transform',
          }}
          initial={{ rotate: f.rotateInitial }}
          animate={{ 
            y: ['0vh', '110vh'], 
            x: [0, f.drift, 0],
            rotate: [f.rotateInitial, f.rotateInitial + 360] 
          }}
          transition={{ 
            duration: f.duration, 
            delay: f.delay, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
        />
      ))}
    </div>
  )
}

// ── Storm lightning flash ───────────────────────────────────────────────────
function StormEffect() {
  return (
    <>
      <RainEffect />
      <WindEffect />
      <motion.div
        className="absolute inset-0 pointer-events-none bg-violet-200/5 z-20"
        style={{ willChange: 'opacity' }}
        animate={{ opacity: [0, 0, 0, 0.2, 0, 0.1, 0, 0, 0] }}
        transition={{ duration: 7, repeat: Infinity, times: [0, 0.3, 0.4, 0.42, 0.44, 0.46, 0.48, 0.9, 1] }}
      />
    </>
  )
}

// ── Fog layers ───────────────────────────────────────────────────────────────
function FogEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" style={{ transform: 'translateZ(0)' }}>
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute w-full h-40"
          style={{
            top: `${30 + i * 30}%`,
            background: 'linear-gradient(to right, transparent, rgba(200,210,220,0.1), transparent)',
            filter: 'blur(30px)',
            willChange: 'transform',
          }}
          animate={{ x: ['-20%', '20%', '-20%'] }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
        />
      ))}
    </div>
  )
}

// ── Sun Rays + Glow (Soften) ─────────────────────────────────────────────────
function SunnyEffect({ darkMode }) {
  const rays = Array.from({ length: 8 })
  const color = darkMode ? 'rgba(251, 146, 60, 0.12)' : 'rgba(253, 224, 71, 0.15)'

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex justify-center" style={{ transform: 'translateZ(0)' }}>
      {/* Rotating Sun Rays */}
      <motion.div
        className="absolute top-[-100px] w-[800px] h-[800px] origin-center opacity-40 mix-blend-screen"
        style={{ willChange: 'transform' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
      >
        {rays.map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-20 h-[400px] origin-top"
            style={{
              background: `linear-gradient(to bottom, ${color}, transparent 60%)`,
              transform: `translate(-50%, 0) rotate(${i * 45}deg)`,
              clipPath: 'polygon(50% 0, 100% 100%, 0 100%)'
            }}
          />
        ))}
      </motion.div>

      {/* Central Sun Glow */}
      <div
        className="absolute top-0 w-80 h-80 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: 'blur(50px)',
        }}
      />
    </div>
  )
}

// ── Animated Clouds ─────────────────────────────────────────────────────────
function CloudsEffect({ variant, darkMode }) {
  const baseClouds = [
    { width: 260, height: 80,  top: '8%',  left: '-5%',  duration: 80, opacity: 0.6 },
    { width: 320, height: 95,  top: '32%', left: '-10%', duration: 100, opacity: 0.5 },
    { width: 200, height: 65,  top: '50%', left: '60%',  duration: 90, opacity: 0.45 },
  ]
  
  const heavyClouds = baseClouds.concat([
    { width: 400, height: 120, top: '-5%', left: '20%',  duration: 120, opacity: 0.7 },
    { width: 350, height: 100, top: '22%', left: '75%',  duration: 110, opacity: 0.6 },
  ])

  const cloudsList = variant === 'clouds_heavy' ? heavyClouds : baseClouds
  const cloudFill = darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.85)'

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" style={{ transform: 'translateZ(0)' }}>
      {cloudsList.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: c.top,
            left: c.left,
            width: c.width,
            height: c.height,
            opacity: c.opacity,
            willChange: 'transform',
          }}
          animate={{ x: ['0vw', '120vw'] }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: -(c.duration * (i / cloudsList.length)),
          }}
        >
          <svg viewBox="0 0 200 80" fill={cloudFill} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <ellipse cx="100" cy="60" rx="90"  ry="28" />
            <ellipse cx="70"  cy="46" rx="48"  ry="36" />
            <ellipse cx="120" cy="42" rx="55"  ry="40" />
            <ellipse cx="155" cy="54" rx="38"  ry="26" />
            <ellipse cx="40"  cy="56" rx="30"  ry="22" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

const EFFECT_MAP = {
  rain: RainEffect,
  stars: StarsEffect,
  snow: SnowEffect,
  storm: StormEffect,
  fog: FogEffect,
  sunny: SunnyEffect,
  clouds_light: ({ darkMode }) => <CloudsEffect variant="clouds_light" darkMode={darkMode} />,
  clouds_heavy: ({ darkMode }) => <CloudsEffect variant="clouds_heavy" darkMode={darkMode} />,
}

// ── Sky gradient for light mode (softened blue) ───────────────────────────────────────────
const LIGHT_SKY_GRADIENT = 'linear-gradient(180deg, #7dd3fc 0%, #bae6fd 40%, #e0f2fe 100%)'

// ── Main component ────────────────────────────────────────────────────────────
export default function WeatherBackground({ theme, darkMode }) {
  const currentEffect = theme.effect

  // Determine which effect to render
  let effectNode = null
  if (currentEffect === 'clouds_light') {
    effectNode = <CloudsEffect variant="clouds_light" darkMode={darkMode} />
  } else if (currentEffect === 'clouds_heavy') {
    effectNode = <CloudsEffect variant="clouds_heavy" darkMode={darkMode} />
  } else if (currentEffect === 'sunny') {
    effectNode = <SunnyEffect darkMode={darkMode} />
  } else if (EFFECT_MAP[currentEffect]) {
    const Component = EFFECT_MAP[currentEffect]
    effectNode = <Component darkMode={darkMode} />
  }

  const backgroundGradient = darkMode ? theme.gradient : LIGHT_SKY_GRADIENT

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme.name + (darkMode ? '-dark' : '-light')}
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{ background: backgroundGradient }}
      >
        {/* Animated blobs */}
        {theme.blobs && theme.blobs.map((blob, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none mix-blend-screen"
            style={{
              width: blob.size,
              height: blob.size,
              top: blob.top,
              bottom: blob.bottom,
              left: blob.left,
              right: blob.right,
              background: blob.color,
              filter: 'blur(90px)',
              opacity: darkMode ? 0.3 : 0.08,
              willChange: 'transform',
            }}
            animate={{
              x: [0, 20 * (i % 2 ? 1 : -1), 0],
              y: [0, 30 * (i % 2 ? -1 : 1), 0],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Weather effect overlay */}
        {effectNode}

        {/* Subtle Horizon Haze for Light Mode */}
        {!darkMode && (
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-0"
            style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.4), transparent)' }}
          />
        )}

        {/* Subtle noise pattern - removed filter to save GPU */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none z-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
