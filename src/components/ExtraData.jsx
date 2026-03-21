import { motion } from 'framer-motion'
import { Sunrise, Sunset, Wind, Gauge } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const AQI_COLORS = ['', '#22c55e', '#84cc16', '#f59e0b', '#f97316', '#ef4444']

function fmt(unix) {
  const d = new Date(unix * 1000)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function ExtraItem({ icon: Icon, label, value, color, badge }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      className="glass-strong rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-default"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}
    >
      <div
        className="p-2 rounded-xl flex-shrink-0"
        style={{ background: `${color}22` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.12em]">{label}</p>
        <p className="text-white font-bold text-sm truncate">
          {value}
          {badge && (
            <span
              className="ml-2 text-[9px] px-1.5 py-0.5 rounded-full font-bold"
              style={{ background: `${badge.color}22`, color: badge.color }}
            >
              {badge.text}
            </span>
          )}
        </p>
      </div>
    </motion.div>
  )
}

export default function ExtraData({ weather, extra }) {
  const { t } = useLanguage()

  // extra = { aqi, uvi } — may be null in mock mode
  const sunrise = weather?.sys?.sunrise
  const sunset = weather?.sys?.sunset

  const aqiLevel = extra?.aqi ?? null
  const uvi = extra?.uvi ?? null
  
  const AQI_LABELS = ['', t('badges.aqi.good'), t('badges.aqi.fair'), t('badges.aqi.moderate'), t('badges.aqi.poor'), t('badges.aqi.veryPoor')]

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full mx-auto mb-3 flex flex-col gap-2"
    >
      <div className="flex items-center gap-2 px-1 mb-1">
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.14em]">Details</p>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sunrise && (
          <ExtraItem icon={Sunrise} label={t('details.sunrise')} value={fmt(sunrise)} color="#fbbf24" />
        )}
        {sunset && (
          <ExtraItem icon={Sunset} label={t('details.sunset')} value={fmt(sunset)} color="#f97316" />
        )}
        <ExtraItem
          icon={Wind}
          label={t('details.uvIndex')}
          value={uvi !== null ? `${uvi}` : '—'}
          color="#a78bfa"
          badge={
            uvi !== null
              ? {
                  text: uvi <= 2 ? t('badges.uv.low') : uvi <= 5 ? t('badges.uv.moderate') : uvi <= 7 ? t('badges.uv.high') : t('badges.uv.veryHigh'),
                  color: uvi <= 2 ? '#22c55e' : uvi <= 5 ? '#f59e0b' : uvi <= 7 ? '#f97316' : '#ef4444',
                }
              : null
          }
        />
        <ExtraItem
          icon={Gauge}
          label={t('details.aqi')}
          value={aqiLevel !== null ? AQI_LABELS[aqiLevel] || '—' : '—'}
          color={aqiLevel !== null ? AQI_COLORS[aqiLevel] || '#94a3b8' : '#94a3b8'}
          badge={
            aqiLevel !== null
              ? { text: `AQI ${aqiLevel}`, color: AQI_COLORS[aqiLevel] || '#94a3b8' }
              : null
          }
        />
      </motion.div>
    </motion.div>
  )
}
