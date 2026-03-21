import { motion } from 'framer-motion'
import { Droplets, Wind, Thermometer } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

function DetailItem({ icon: Icon, label, value, accent }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.06, y: -2 }}
      className="
        glass-strong rounded-2xl
        flex flex-col items-center justify-center
        gap-2 py-4 px-3
        text-white cursor-default
        transition-all duration-200 relative overflow-hidden
      "
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
    >
      {/* Accent top bar */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full ${accent}`} />

      <div className="p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <Icon className="w-4 h-4 text-white/70" />
      </div>
      <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.14em]">{label}</p>
      <p className="text-white font-bold text-xl leading-none">{value}</p>
    </motion.div>
  )
}

export default function WeatherDetails({ weather }) {
  const { main: { humidity, feels_like }, wind: { speed } } = weather
  const { t } = useLanguage()

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 gap-3 w-full"
    >
      <DetailItem icon={Droplets} label={t('details.humidity')} value={`${humidity}%`} accent="bg-blue-400/60" />
      <DetailItem icon={Wind}     label={t('details.wind')}     value={`${Math.round(speed)} m/s`} accent="bg-teal-400/60" />
      <DetailItem icon={Thermometer} label={t('details.feelsLike')} value={`${Math.round(feels_like)}°`} accent="bg-violet-400/60" />
    </motion.div>
  )
}
