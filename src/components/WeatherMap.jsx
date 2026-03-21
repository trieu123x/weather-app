import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const OWM_LAYERS = {
  precipitation: 'precipitation_new',
  clouds: 'clouds_new',
  wind: 'wind_new',
}

export default function WeatherMap({ coords, isMock, apiKey }) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [activeLayer, setActiveLayer] = useState('precipitation')
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const layerRef = useRef(null)

  // Lazy-load leaflet CSS when map opens
  useEffect(() => {
    if (open && !document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }
  }, [open])

  // Init map
  useEffect(() => {
    if (!open || !mapRef.current) return

    import('leaflet').then((L) => {
      if (mapInstanceRef.current) return // already initialized

      const lat = coords?.lat ?? 21.0285
      const lon = coords?.lon ?? 105.8542

      const map = L.map(mapRef.current, {
        center: [lat, lon],
        zoom: 8,
        zoomControl: true,
        attributionControl: false,
      })

      // Base tile
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map)

      // OWM overlay
      const owmLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/${OWM_LAYERS[activeLayer]}/{z}/{x}/{y}.png?appid=${apiKey || 'demo'}`,
        { maxZoom: 19, opacity: 0.6 }
      )
      owmLayer.addTo(map)
      layerRef.current = owmLayer

      // City marker
      const marker = L.circleMarker([lat, lon], {
        radius: 8,
        fillColor: '#a78bfa',
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      }).addTo(map)

      mapInstanceRef.current = map
    })

    return () => {
      if (mapInstanceRef.current && !open) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [open, coords])

  // Update layer when activeLayer changes
  useEffect(() => {
    if (!mapInstanceRef.current || !layerRef.current) return
    import('leaflet').then((L) => {
      mapInstanceRef.current.removeLayer(layerRef.current)
      const owmLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/${OWM_LAYERS[activeLayer]}/{z}/{x}/{y}.png?appid=${apiKey || 'demo'}`,
        { maxZoom: 19, opacity: 0.6 }
      )
      owmLayer.addTo(mapInstanceRef.current)
      layerRef.current = owmLayer
    })
  }, [activeLayer, apiKey])

  // Cleanup on close
  const handleClose = () => {
    setOpen(false)
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto mb-3">
      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => (open ? handleClose() : setOpen(true))}
        className="
          w-full glass-strong rounded-2xl px-4 py-3
          flex items-center justify-between
          text-white/70 hover:text-white
          transition-colors duration-200 cursor-pointer
        "
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}
      >
        <div className="flex items-center gap-2.5">
          <Map className="w-4 h-4 text-teal-400" />
          <span className="text-xs font-semibold">{t('map.toggle')}</span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          className="text-white/40 text-xs"
        >
          ▼
        </motion.span>
      </motion.button>

      {/* Map panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 280 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden mt-2 glass-strong rounded-2xl"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
          >
            {/* Layer switcher */}
            <div className="flex gap-1 p-2">
              {Object.keys(OWM_LAYERS).map((l) => (
                <button
                  key={l}
                  onClick={() => setActiveLayer(l)}
                  className={`flex-1 text-[9px] font-bold uppercase tracking-wider py-1.5 rounded-lg transition-all duration-200 capitalize ${
                    activeLayer === l
                      ? 'bg-white/20 text-white'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {t(`map.${l}`)}
                </button>
              ))}
            </div>

            {/* Map container */}
            <div ref={mapRef} style={{ height: 228, width: '100%' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
