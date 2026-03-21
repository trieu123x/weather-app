import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const weatherIcons = {
  '01d': '☀️', '01n': '🌙',
  '02d': '⛅', '02n': '⛅',
  '03d': '☁️', '03n': '☁️',
  '04d': '☁️', '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️',
  '10d': '🌦️', '10n': '🌧️',
  '11d': '⛈️', '11n': '⛈️',
  '13d': '❄️', '13n': '❄️',
  '50d': '🌫️', '50n': '🌫️',
}
import { useLanguage } from '../context/LanguageContext'

// Icons and formats

export default function WeatherCard({ weather, isFav, onToggleFav }) {
  const {
    name, sys,
    main: { temp, temp_max, temp_min },
    weather: [{ description, icon }],
  } = weather

  const { t, dict } = useLanguage()

  const emoji = weatherIcons[icon] || '🌡️'
  const now = new Date()
  const dateStr = `${dict.days[now.getDay()]}, ${now.getDate()} ${dict.months[now.getMonth()]}`
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong rounded-3xl p-7 w-full text-white overflow-hidden relative"
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)' }}
    >
      {/* Decorative orb */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)' }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight leading-none">{name}</h1>
          <p className="text-white/50 text-xs font-medium mt-1 tracking-wide">
            {sys.country} · {dateStr}
          </p>
          <p className="text-white/30 text-[10px] mt-0.5">{timeStr}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-5xl select-none"
          >
            {emoji}
          </motion.span>
          {/* Favorite button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85 }}
            onClick={onToggleFav}
            className="cursor-pointer"
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className="w-4 h-4 transition-colors duration-200"
              style={{ color: isFav ? '#fb7185' : 'currentColor', opacity: isFav ? 1 : 0.3 }}
              fill={isFav ? '#fb7185' : 'none'}
            />
          </motion.button>
        </div>
      </div>

      {/* Temperature */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex items-start leading-none mb-1"
        >
          <span
            className="temp-number font-black tracking-tighter"
            style={{ fontSize: '7rem', lineHeight: 1 }}
          >
            {Math.round(temp)}
          </span>
          <span className="text-3xl font-light text-white/60 mt-3 ml-1">°C</span>
        </motion.div>

        <p className="text-white/70 text-sm font-semibold capitalize tracking-wide mb-5">
          {description}
        </p>

        <div className="h-px bg-gradient-to-r from-white/0 via-white/15 to-white/0 mb-5" />

        <div className="flex items-center gap-5">
          <div>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.12em] mb-0.5">{t('weather.high')}</p>
            <p className="text-white font-bold text-lg">{Math.round(temp_max)}°</p>
          </div>
          <div className="w-px h-8 bg-white/15" />
          <div>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.12em] mb-0.5">{t('weather.low')}</p>
            <p className="text-white font-bold text-lg">{Math.round(temp_min)}°</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
