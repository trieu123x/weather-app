// Maps the OpenWeatherMap icon code to a visual theme
// icon format: "01d" (clear day), "01n" (clear night), "10d" (rain), etc.

const THEMES = {
  // Clear
  '01d': {
    gradient: 'linear-gradient(160deg, #f97316 0%, #fb923c 25%, #fbbf24 60%, #fde68a 100%)',

    blobs: [
      { color: '#f59e0b', size: 600, top: '-150px', left: '-100px' },
      { color: '#ef4444', size: 400, top: '40%', right: '-80px' },
    ],
    effect: 'sunny',
    name: 'sunny',
  },
  '01n': {
    gradient: 'linear-gradient(160deg, #020617 0%, #0f172a 40%, #1e1b4b 80%, #0f0a2e 100%)',

    blobs: [
      { color: '#312e81', size: 500, top: '-100px', left: '-100px' },
      { color: '#1e1b4b', size: 350, bottom: '-50px', right: '-50px' },
    ],
    effect: 'stars',
    name: 'night',
  },
  // Partly cloudy
  '02d': {
    gradient: 'linear-gradient(160deg, #0ea5e9 0%, #38bdf8 35%, #7dd3fc 70%, #bae6fd 100%)',

    blobs: [
      { color: '#0284c7', size: 500, top: '-100px', left: '-80px' },
      { color: '#7c3aed', size: 350, top: '30%', right: '-60px' },
    ],
    effect: 'clouds_light',
    name: 'partly-cloudy',
  },
  '02n': {
    gradient: 'linear-gradient(160deg, #020617 0%, #0f172a 40%, #1e1b4b 80%, #0f0a2e 100%)',

    blobs: [
      { color: '#312e81', size: 500, top: '-100px', left: '-100px' },
      { color: '#1e1b4b', size: 350, bottom: '-50px', right: '-50px' },
    ],
    effect: 'stars',
    name: 'night',
  },
  // Cloudy
  '03d': {
    gradient: 'linear-gradient(160deg, #334155 0%, #475569 40%, #64748b 80%, #94a3b8 100%)',
    lightGradient: 'linear-gradient(180deg, #94a3b8 0%, #cbd5e1 50%, #e2e8f0 100%)',
    blobs: [
      { color: '#475569', size: 550, top: '-120px', left: '-80px' },
      { color: '#334155', size: 400, bottom: '-60px', right: '-60px' },
    ],
    effect: 'clouds_heavy',
    name: 'cloudy',
  },
  '03n': {
    gradient: 'linear-gradient(160deg, #020617 0%, #0f172a 40%, #1e1b4b 80%, #0f0a2e 100%)',
    lightGradient: 'linear-gradient(180deg, #94a3b8 0%, #cbd5e1 50%, #e2e8f0 100%)',
    blobs: [
      { color: '#1e293b', size: 550, top: '-100px', left: '-100px' },
    ],
    effect: 'clouds_heavy',
    name: 'night',
  },
  // Overcast
  '04d': {
    gradient: 'linear-gradient(160deg, #1e293b 0%, #334155 50%, #475569 100%)',
    lightGradient: 'linear-gradient(180deg, #64748b 0%, #94a3b8 50%, #cbd5e1 100%)',
    blobs: [
      { color: '#374151', size: 550, top: '-100px', left: '-80px' },
    ],
    effect: 'clouds_heavy',
    name: 'overcast',
  },
  '04n': {
    gradient: 'linear-gradient(160deg, #020617 0%, #0f172a 40%, #1e1b4b 80%, #0f0a2e 100%)',
    lightGradient: 'linear-gradient(180deg, #64748b 0%, #94a3b8 50%, #cbd5e1 100%)',
    blobs: [
      { color: '#1e293b', size: 500, top: '-100px', left: '-100px' },
    ],
    effect: 'clouds_heavy',
    name: 'night',
  },
  // Drizzle
  '09d': {
    gradient: 'linear-gradient(160deg, #0c4a6e 0%, #075985 30%, #0369a1 65%, #0284c7 100%)',
    lightGradient: 'linear-gradient(180deg, #475569 0%, #64748b 50%, #94a3b8 100%)',
    blobs: [
      { color: '#0c4a6e', size: 550, top: '-100px', left: '-80px' },
      { color: '#1e3a5f', size: 400, bottom: '-60px', right: '-60px' },
    ],
    effect: 'rain',
    name: 'rain',
  },
  '09n': {
    gradient: 'linear-gradient(160deg, #020617 0%, #0c2340 40%, #0c4a6e 80%, #1e3a5f 100%)',
    lightGradient: 'linear-gradient(180deg, #475569 0%, #64748b 50%, #94a3b8 100%)',
    blobs: [
      { color: '#0c4a6e', size: 500, top: '-100px', left: '-100px' },
    ],
    effect: 'rain',
    name: 'rain-night',
  },
  // Rain
  '10d': {
    gradient: 'linear-gradient(160deg, #0c4a6e 0%, #075985 30%, #0369a1 65%, #0284c7 100%)',
    lightGradient: 'linear-gradient(180deg, #475569 0%, #64748b 50%, #94a3b8 100%)',
    blobs: [
      { color: '#0c4a6e', size: 550, top: '-100px', left: '-80px' },
      { color: '#1e3a5f', size: 400, bottom: '-60px', right: '-60px' },
    ],
    effect: 'rain',
    name: 'rain',
  },
  '10n': {
    gradient: 'linear-gradient(160deg, #020617 0%, #0c2340 40%, #0c4a6e 80%, #1e3a5f 100%)',
    lightGradient: 'linear-gradient(180deg, #475569 0%, #64748b 50%, #94a3b8 100%)',
    blobs: [
      { color: '#0c4a6e', size: 500, top: '-100px', left: '-100px' },
    ],
    effect: 'rain',
    name: 'rain-night',
  },
  // Thunderstorm
  '11d': {
    gradient: 'linear-gradient(160deg, #1a0030 0%, #2d004a 30%, #1a0a2e 65%, #0c0020 100%)',
    lightGradient: 'linear-gradient(180deg, #334155 0%, #475569 50%, #64748b 100%)',
    blobs: [
      { color: '#4c1d95', size: 600, top: '-150px', left: '-100px' },
      { color: '#1e0040', size: 400, bottom: '-60px', right: '-60px' },
    ],
    effect: 'storm',
    name: 'storm',
  },
  '11n': {
    gradient: 'linear-gradient(160deg, #0a0018 0%, #1a0030 40%, #2d004a 80%, #0c0020 100%)',
    lightGradient: 'linear-gradient(180deg, #334155 0%, #475569 50%, #64748b 100%)',
    blobs: [
      { color: '#4c1d95', size: 600, top: '-150px', left: '-100px' },
    ],
    effect: 'storm',
    name: 'storm',
  },
  // Snow
  '13d': {
    gradient: 'linear-gradient(160deg, #1e3a5f 0%, #1e40af 35%, #3b82f6 65%, #93c5fd 100%)',
    lightGradient: 'linear-gradient(180deg, #bae6fd 0%, #e0f2fe 50%, #f0f9ff 100%)',
    blobs: [
      { color: '#1e40af', size: 550, top: '-100px', left: '-80px' },
      { color: '#bfdbfe', size: 400, bottom: '-60px', right: '-60px' },
    ],
    effect: 'snow',
    name: 'snow',
  },
  '13n': {
    gradient: 'linear-gradient(160deg, #0f172a 0%, #1e3a5f 40%, #1e40af 80%, #1e3a5f 100%)',
    lightGradient: 'linear-gradient(180deg, #bae6fd 0%, #e0f2fe 50%, #f0f9ff 100%)',
    blobs: [
      { color: '#1e40af', size: 500, top: '-100px', left: '-100px' },
    ],
    effect: 'snow',
    name: 'snow',
  },
  // Mist/Fog
  '50d': {
    gradient: 'linear-gradient(160deg, #374151 0%, #4b5563 35%, #6b7280 65%, #9ca3af 100%)',
    lightGradient: 'linear-gradient(180deg, #cbd5e1 0%, #e2e8f0 50%, #f1f5f9 100%)',
    blobs: [
      { color: '#4b5563', size: 600, top: '-120px', left: '-100px' },
      { color: '#374151', size: 450, bottom: '-60px', right: '-60px' },
    ],
    effect: 'fog',
    name: 'fog',
  },
  '50n': {
    gradient: 'linear-gradient(160deg, #111827 0%, #1f2937 40%, #374151 80%, #4b5563 100%)',
    lightGradient: 'linear-gradient(180deg, #cbd5e1 0%, #e2e8f0 50%, #f1f5f9 100%)',
    blobs: [
      { color: '#374151', size: 600, top: '-120px', left: '-100px' },
    ],
    effect: 'fog',
    name: 'fog',
  },
}

const DEFAULT_THEME = {
  gradient: 'linear-gradient(160deg, #06071b 0%, #0d1235 30%, #160d30 65%, #1a0a2e 100%)',
  lightGradient: 'linear-gradient(180deg, #38bdf8 0%, #7dd3fc 35%, #bae6fd 65%, #e0f2fe 100%)',
  blobs: [
    { color: '#3b0f6e', size: 560, top: '-160px', left: '-120px' },
    { color: '#0f1f6e', size: 480, top: '30%', right: '-100px' },
    { color: '#1a0a4e', size: 400, bottom: '-80px', left: '20%' },
  ],
  effect: 'none',
  name: 'default',
}

export function useWeatherTheme(icon) {
  return THEMES[icon] || DEFAULT_THEME
}
