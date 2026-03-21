import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MapPin, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function FavoriteBar({ favorites, currentCity, onSelect, onRemove }) {
  const { t } = useLanguage()

  if (!favorites?.length) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35 }}
        className="w-full relative z-30 mb-4"
      >
        <div className="flex items-center gap-1.5 mb-2 px-1">
          <Heart className="w-3 h-3 text-rose-400" fill="currentColor" />
          <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.14em]">{t('search.favorites')}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {favorites.map((city) => {
            const isActive = city.toLowerCase() === currentCity?.toLowerCase()
            return (
              <motion.div
                key={city}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="flex items-center gap-1.5"
              >
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelect(city)}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold
                    transition-all duration-200 cursor-pointer
                    ${isActive
                      ? 'bg-violet-500/40 text-white border border-violet-400/50'
                      : 'glass text-white/70 hover:text-white border border-white/10 hover:border-white/20'}
                  `}
                >
                  {isActive && <MapPin className="w-2.5 h-2.5 text-violet-300" />}
                  {city}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemove(city)}
                  className="text-white/20 hover:text-rose-400 transition-colors duration-150 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
