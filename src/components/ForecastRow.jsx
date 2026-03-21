import { motion } from 'framer-motion'
import ForecastCard from './ForecastCard'
import { useLanguage } from '../context/LanguageContext'

export default function ForecastRow({ forecast }) {
  const { t } = useLanguage()
  const daily = []
  const seen = new Set()
  const todayKey = (() => {
    const d = new Date(); return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
  })()

  for (const item of forecast.list) {
    const date = new Date(item.dt * 1000)
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    if (!seen.has(key)) {
      seen.add(key)
      daily.push({ item, isToday: key === todayKey })
    }
    if (daily.length === 5) break
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-sm mx-auto"
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.14em]">
          {t('forecast.title')}
        </p>
        <div className="h-px flex-1 bg-white/10 mx-3" />
      </div>
      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
        {daily.map(({ item, isToday }, i) => (
          <ForecastCard key={item.dt} item={item} index={i} isToday={isToday} />
        ))}
      </div>
    </motion.div>
  )
}
