import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

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

export default function ForecastCard({ item, index, isToday }) {
  const { t, dict } = useLanguage()

  const date = new Date(item.dt * 1000)
  // Get short version of localized day name (e.g. 'Mon' or 'T2')
  const shortDay = dict.days[date.getDay()].substring(0, 3)
  const day = isToday ? t('forecast.today') : shortDay
  const emoji = weatherIcons[item.weather[0].icon] || '🌡️'
  const temp = Math.round(item.main.temp)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.07, y: -4 }}
      className={`
        flex-shrink-0 rounded-2xl
        flex flex-col items-center gap-2.5
        px-4 py-4 cursor-default
        transition-all duration-200 min-w-[80px]
        relative overflow-hidden
        ${isToday
          ? 'bg-white/20 border border-white/30'
          : 'glass border border-white/8'}
      `}
      style={{
        boxShadow: isToday
          ? '0 4px 24px rgba(167, 139, 250, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
          : '0 2px 12px rgba(0,0,0,0.15)',
      }}
    >
      {isToday && (
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 0%, #a78bfa, transparent 70%)' }} />
      )}
      <p className={`text-[10px] font-bold uppercase tracking-widest ${isToday ? 'text-violet-300' : 'text-white/40'}`}>
        {day}
      </p>
      <span className="text-3xl">{emoji}</span>
      <p className="font-bold text-base text-white">{temp}°</p>
    </motion.div>
  )
}
