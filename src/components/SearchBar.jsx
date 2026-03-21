import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Clock, X, ChevronDown, Heart } from 'lucide-react'
import axios from 'axios'
import { useLanguage } from '../context/LanguageContext'
import { countries } from '../data/countries'
import { useFavorites } from '../hooks/useFavorites'

const HISTORY_KEY = 'weather_history'
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct'

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [] } catch { return [] }
}
function saveHistory(city) {
  const prev = loadHistory().filter((c) => c.toLowerCase() !== city.toLowerCase())
  localStorage.setItem(HISTORY_KEY, JSON.stringify([city, ...prev].slice(0, 6)))
}
function clearHistory() {
  localStorage.removeItem(HISTORY_KEY)
}

export default function SearchBar({ onSearch, apiKey }) {
  const [input, setInput] = useState('')
  const [focused, setFocused] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [history, setHistory] = useState(loadHistory)
  const [selectedCountry, setSelectedCountry] = useState(countries[0]) // Default to "All"
  const [showCountrySelector, setShowCountrySelector] = useState(false)
  const debounceRef = useRef(null)
  const wrapperRef = useRef(null)
  const countryRef = useRef(null)
  const { t, language } = useLanguage()
  const { isFavorite, toggleFavorite } = useFavorites()

  // Dismiss dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setFocused(false)
      }
      if (!countryRef.current?.contains(e.target)) {
        setShowCountrySelector(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const fetchSuggestions = useCallback(async (q) => {
    if (!apiKey || apiKey === 'your_api_key_here' || q.length < 2) {
      setSuggestions([])
      return
    }
    try {
      // Append country code if selected
      const query = selectedCountry.code ? `${q},${selectedCountry.code}` : q
      const { data } = await axios.get(GEO_URL, {
        params: { q: query, limit: 5, appid: apiKey },
      })
      setSuggestions(data.map((d) => ({
        name: d.local_names?.[language] || d.name,
        country: d.country,
        state: d.state
      })))
    } catch {
      setSuggestions([])
    }
  }, [apiKey, selectedCountry, language])

  const handleInput = (e) => {
    const val = e.target.value
    setInput(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 350)
  }

  const submit = (city, countryCode) => {
    if (!city.trim()) return
    const fullSearch = countryCode ? `${city},${countryCode}` : city
    saveHistory(city)
    setHistory(loadHistory())
    setSuggestions([])
    setInput('')
    setFocused(false)
    onSearch(fullSearch)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submit(input, selectedCountry.code)
  }

  const showSuggestions = suggestions.length > 0
  const showHistory = input === '' && history.length > 0
  const showPopularCities = input === '' && selectedCountry.cities.length > 0
  
  const showDropdown = focused && (showSuggestions || showHistory || showPopularCities)

  return (
    <div ref={wrapperRef} className="w-full relative z-40">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.div
          animate={{ scale: focused ? 1.01 : 1 }}
          transition={{ duration: 0.2 }}
          className="relative flex items-center md:gap-2"
        >
          {/* Country Selector */}
          <div ref={countryRef} className="relative">
            <button
              type="button"
              onClick={() => setShowCountrySelector(!showCountrySelector)}
              className="flex items-center gap-2 px-3 py-3.5 glass-strong rounded-2xl text-white/80 hover:text-white transition-all cursor-pointer min-w-[60px] justify-center"
            >
              <span className="text-lg">{selectedCountry.flag}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showCountrySelector ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showCountrySelector && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 4, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute left-0 mt-2 w-56 glass-strong rounded-2xl overflow-y-auto max-h-80 z-50 py-2 shadow-2xl border border-white/10"
                >
                  <p className="px-4 py-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">{t('search.selectCountry')}</p>
                  {countries.map((c) => (
                    <button
                      key={c.code || 'all'}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(c)
                        setShowCountrySelector(false)
                        if (input.length >= 2) fetchSuggestions(input)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/10 transition-colors text-white/80 hover:text-white cursor-pointer"
                    >
                      <span className="text-lg">{c.flag}</span>
                      <span className="text-sm font-medium">{c.code === '' ? t('search.allCountries') : c.name}</span>
                      {selectedCountry.code === c.code && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1 relative">
            <Search className="absolute left-4 w-4 h-4 text-white/40 pointer-events-none z-10 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={input}
              onChange={handleInput}
              onFocus={() => setFocused(true)}
              placeholder={selectedCountry.code 
                ? t('search.placeholderWithCountry').replace('{city}', '').replace('{country}', selectedCountry.name).trim()
                : t('search.placeholder')
              }
              autoComplete="off"
              className="w-full pl-11 pr-24 py-3.5 glass-strong rounded-2xl text-white placeholder-white/40 outline-none text-sm font-medium bg-transparent relative z-10"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              className="absolute right-2 top-1.5 z-10 flex items-center gap-1.5 bg-violet-500/70 hover:bg-violet-500/90 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors duration-200 cursor-pointer"
            >
              <MapPin className="w-3 h-3" />
              {t('search.button')}
            </motion.button>
          </div>
        </motion.div>
      </motion.form>

      {/* Dropdown for suggestions/history/popular */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute left-[70px] right-0 glass-strong rounded-2xl overflow-hidden z-40"
            style={{ boxShadow: '0 16px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            {/* Suggestions */}
            {showSuggestions && suggestions.map((s, i) => (
              <div key={i} className="flex items-center hover:bg-white/10 transition-colors group">
                <button
                  type="button"
                  onMouseDown={() => submit(s.name, s.country)}
                  className="flex-1 flex items-center gap-3 px-4 py-3 text-left cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                  <span className="text-white text-sm font-medium">{s.name}</span>
                  <span className="text-white/40 text-xs ml-auto">{s.state ? `${s.state}, ` : ''}{s.country}</span>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.stopPropagation(); toggleFavorite(s.name) }}
                  className="px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorite(s.name) ? 'fill-rose-500 text-rose-500' : 'text-white/40 hover:text-white'}`} />
                </button>
              </div>
            ))}

            {/* Popular Cities for selected country */}
            {showPopularCities && (
              <div className="border-t border-white/5">
                <div className="px-4 py-2 bg-white/5">
                  <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="w-2.5 h-2.5" />
                    Cities in {selectedCountry.name}
                  </p>
                </div>
                <div className="max-h-[260px] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-2 gap-px bg-white/5">
                    {selectedCountry.cities.map((city, i) => (
                      <div key={i} className="flex items-center bg-transparent hover:bg-white/10 transition-colors group">
                        <button
                          type="button"
                          onMouseDown={() => submit(city, selectedCountry.code)}
                          className="flex-1 flex items-center gap-3 px-4 py-2.5 text-left cursor-pointer overflow-hidden"
                        >
                          <span className="text-white/70 text-sm truncate">{city}</span>
                        </button>
                        <button
                          type="button"
                          onMouseDown={(e) => { e.stopPropagation(); toggleFavorite(city) }}
                          className="px-3 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex-shrink-0"
                        >
                          <Heart className={`w-3 h-3 ${isFavorite(city) ? 'fill-rose-500 text-rose-500' : 'text-white/30'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* History (shown when input is empty and no country selected cities or at bottom) */}
            {showHistory && (
              <>
                <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 bg-black/20">
                  <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{t('search.recent')}</p>
                  <button
                    type="button"
                    onMouseDown={() => { clearHistory(); setHistory([]) }}
                    className="text-white/20 hover:text-white/50 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                {history.map((city, i) => (
                  <div key={i} className="flex items-center hover:bg-white/10 transition-colors group">
                    <button
                      type="button"
                      onMouseDown={() => submit(city)}
                      className="flex-1 flex items-center gap-3 px-4 py-2.5 text-left cursor-pointer"
                    >
                      <Clock className="w-3 h-3 text-white/30 flex-shrink-0" />
                      <span className="text-white/70 text-sm">{city}</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => { e.stopPropagation(); toggleFavorite(city) }}
                      className="px-4 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Heart className={`w-3 h-3 ${isFavorite(city) ? 'fill-rose-500 text-rose-500' : 'text-white/30'}`} />
                    </button>
                  </div>
                ))}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
