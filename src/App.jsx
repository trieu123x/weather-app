import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios'

// Hooks
import { useWeatherTheme } from './hooks/useWeatherTheme'
import { useGeolocation }  from './hooks/useGeolocation'
import { useFavorites }    from './hooks/useFavorites'
import { useLanguage }     from './context/LanguageContext'

// Components
import WeatherBackground  from './components/WeatherBackground'
import SearchBar          from './components/SearchBar'
import WeatherCard        from './components/WeatherCard'
import WeatherDetails     from './components/WeatherDetails'
import ForecastRow        from './components/ForecastRow'
import TemperatureChart   from './components/TemperatureChart'
import ExtraData          from './components/ExtraData'
import WeatherMap         from './components/WeatherMap'
import FavoriteBar        from './components/FavoriteBar'

import './index.css'

const API_KEY  = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const GEO_URL  = 'https://api.openweathermap.org/geo/1.0'

const HAS_KEY = API_KEY && API_KEY !== 'your_api_key_here'

// ─── Mock builders ──────────────────────────────────────────────────────────
const buildMockWeather = (name, lat = 21.0285, lon = 105.8542) => {
  const snowyCities = ['Sapporo', 'Moscow', 'Harbin', 'Toronto', 'Oslo']
  const isSnowy = snowyCities.includes(name)
  return {
    id: Math.random(),
    name,
    coord: { lat, lon },
    sys: {
      country: isSnowy ? 'RU' : 'VN',
      sunrise: Math.floor(Date.now() / 1000) - 3600 * 6,
      sunset:  Math.floor(Date.now() / 1000) + 3600 * 6,
    },
    main: { temp: isSnowy ? -5 : 32, temp_max: isSnowy ? -2 : 35, temp_min: isSnowy ? -10 : 27, humidity: 74, feels_like: isSnowy ? -8 : 38 },
    weather: [{ description: isSnowy ? 'snowing' : 'partly cloudy', icon: isSnowy ? '13d' : '02d' }],
    wind: { speed: 3.5 },
  }
}

const buildMockForecast = () => {
  const now = Math.floor(Date.now() / 1000)
  const icons = ['02d', '01d', '10d', '03d', '01d', '10d', '02d', '01n']
  const temps = [32, 35, 28, 30, 33, 29, 31, 27]
  return {
    list: icons.map((icon, i) => ({
      dt: now + i * 10800,
      main: { temp: temps[i], temp_max: temps[i] + 2, temp_min: temps[i] - 3, humidity: 70, feels_like: temps[i] + 4 },
      weather: [{ description: 'demo', icon }],
      wind: { speed: 2 + i * 0.5 },
    })),
  }
}

const MOCK_EXTRA = { uvi: 7, aqi: 2 }
// ────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [city, setCity]         = useState('Hanoi')
  const [weather, setWeather]   = useState(null)
  const [forecast, setForecast] = useState(null)
  const [extra, setExtra]       = useState(null)       // { uvi, aqi }
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [isMock, setIsMock]     = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem('weather_dark') !== 'false' } catch { return true }
  })

  const geo                          = useGeolocation()
  const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites()
  const theme                        = useWeatherTheme(weather?.weather?.[0]?.icon)
  const { language, setLanguage, t } = useLanguage()

  // Re-fetch weather when language changes
  useEffect(() => {
    if (city && weather?.name !== 'Your Location') {
      fetchByCity(city)
    } else if (geo.coords) {
      fetchByCoords(geo.coords.lat, geo.coords.lon)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem('weather_dark', darkMode)
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  // ── Fetch by city name ─────────────────────────────────────────────────────
  const fetchByCity = useCallback(async (cityName) => {
    setLoading(true)
    setError(null)
    setIsMock(false)

    if (!HAS_KEY) {
      await new Promise((r) => setTimeout(r, 700))
      setWeather(buildMockWeather(cityName))
      setForecast(buildMockForecast())
      setExtra(MOCK_EXTRA)
      setIsMock(true)
      setLoading(false)
      return
    }

    try {
      const [w, f] = await Promise.all([
        axios.get(`${BASE_URL}/weather`,  { params: { q: cityName, appid: API_KEY, units: 'metric', lang: language } }),
        axios.get(`${BASE_URL}/forecast`, { params: { q: cityName, appid: API_KEY, units: 'metric', lang: language } }),
      ])
      setWeather(w.data)
      setForecast(f.data)
      // Extra: AQI + UV via One Call
      fetchExtra(w.data.coord.lat, w.data.coord.lon)
    } catch (err) {
      if (err.response?.status === 401) {
        setWeather(buildMockWeather(cityName))
        setForecast(buildMockForecast())
        setExtra(MOCK_EXTRA)
        setIsMock(true)
      } else if (err.response?.status === 404) {
        setError(`City "${cityName}" not found.`)
      } else {
        setError('Unable to fetch weather. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // ── Fetch by coords (geolocation) ─────────────────────────────────────────
  const fetchByCoords = useCallback(async (lat, lon) => {
    setLoading(true)
    setError(null)
    setIsMock(false)

    if (!HAS_KEY) {
      await new Promise((r) => setTimeout(r, 700))
      setWeather(buildMockWeather('Your Location', lat, lon))
      setForecast(buildMockForecast())
      setExtra(MOCK_EXTRA)
      setIsMock(true)
      setCity('Your Location')
      setLoading(false)
      return
    }

    try {
      const [w, f] = await Promise.all([
        axios.get(`${BASE_URL}/weather`,  { params: { lat, lon, appid: API_KEY, units: 'metric', lang: language } }),
        axios.get(`${BASE_URL}/forecast`, { params: { lat, lon, appid: API_KEY, units: 'metric', lang: language } }),
      ])
      setWeather(w.data)
      setForecast(f.data)
      setCity(w.data.name)
      fetchExtra(lat, lon)
    } catch {
      fetchByCity('Hanoi')
    } finally {
      setLoading(false)
    }
  }, [fetchByCity])

  // ── Fetch extra (AQI + UV) ─────────────────────────────────────────────────
  const fetchExtra = async (lat, lon) => {
    if (!HAS_KEY) return
    try {
      const [aqiRes, uvRes] = await Promise.allSettled([
        axios.get(`${BASE_URL}/air_pollution`, { params: { lat, lon, appid: API_KEY } }),
        axios.get(`https://api.openweathermap.org/data/3.0/onecall`, {
          params: { lat, lon, appid: API_KEY, exclude: 'minutely,hourly,daily,alerts' },
        }),
      ])
      const aqi = aqiRes.status === 'fulfilled' ? aqiRes.value.data?.list?.[0]?.main?.aqi : null
      const uvi = uvRes.status === 'fulfilled'  ? uvRes.value.data?.current?.uvi ?? null  : null
      setExtra({ aqi, uvi })
    } catch {
      setExtra(null)
    }
  }

  // ── On load: try geolocation, else default city ───────────────────────────
  useEffect(() => {
    if (geo.loading) return
    if (geo.coords) {
      fetchByCoords(geo.coords.lat, geo.coords.lon)
    } else {
      fetchByCity('Hanoi')
    }
  }, [geo.loading, geo.coords])

  const handleSearch = (newCity) => {
    setCity(newCity)
    fetchByCity(newCity)
  }

  // ── Dark mode text classes ────────────────────────────────────────────────
  const textPrimary   = darkMode ? 'text-white/90' : 'text-slate-800'
  const textSecondary = darkMode ? 'text-white/40' : 'text-slate-500'

  return (
    <div
      data-theme={darkMode ? 'dark' : 'light'}
      className="min-h-screen w-full relative overflow-x-hidden"
    >
      {/* Dynamic Weather Background */}
      <WeatherBackground theme={theme} darkMode={darkMode} />

      {/* ── Main scroll area ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center px-4 py-8 min-h-screen w-full max-w-6xl mx-auto">
        {/* Header bar */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 mb-6"
        >
          {/* Brand */}
          <div className="order-1 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌍</span>
              <h1 className="text-xl font-extrabold tracking-tight">
                {t('app.title')}
              </h1>
            </div>
            <p className={`text-[10px] mt-0.5 ${textSecondary}`}>
              {geo.usingLocation ? `📍 ${t('app.usingLocation')}` : t('app.subtitle')}
            </p>
          </div>

          {/* Search */}
          <div className="order-3 w-full lg:order-2 lg:w-[400px]">
            <SearchBar onSearch={handleSearch} apiKey={HAS_KEY ? API_KEY : ''} />
          </div>

          {/* Toggles */}
          <div className="order-2 flex items-center justify-end gap-3 lg:order-3">
            {/* Language Toggles */}
            <div className="flex items-center gap-1.5 bg-black/10 dark:bg-white/5 rounded-full p-1">
              <button
                onClick={() => setLanguage('vi')}
                className={`w-7 h-7 flex items-center justify-center rounded-full transition-all ${
                  language === 'vi' ? 'bg-white dark:bg-white/20 shadow-sm opacity-100' : 'opacity-40 hover:opacity-100'
                }`}
              >
                🇻🇳
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`w-7 h-7 flex items-center justify-center rounded-full transition-all ${
                  language === 'en' ? 'bg-white dark:bg-white/20 shadow-sm opacity-100' : 'opacity-40 hover:opacity-100'
                }`}
              >
                🇺🇸
              </button>
            </div>

            {/* Demo Badge */}
            {isMock && (
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold"
                style={{
                  background: 'rgba(234,179,8,0.12)',
                  border: '1px solid rgba(234,179,8,0.25)',
                  color: '#fde68a',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                {t('app.demoMode')}
              </motion.span>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode((d) => !d)}
              className="glass-strong rounded-xl px-3 py-2 text-sm cursor-pointer transition-colors duration-200"
            >
              {darkMode ? '☀️' : '🌙'}
            </motion.button>
          </div>
        </motion.div>

        {/* Favorites */}
        <FavoriteBar
          favorites={favorites}
          currentCity={weather?.name}
          onSelect={handleSearch}
          onRemove={removeFavorite}
        />

        {/* Content */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {/* Loading */}
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-28"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  className="w-9 h-9 rounded-full mb-5"
                  style={{
                    border: '2px solid rgba(255,255,255,0.08)',
                    borderTopColor: '#a78bfa',
                    boxShadow: '0 0 16px rgba(167,139,250,0.4)',
                  }}
                />
                <p className={`text-sm font-medium ${textSecondary}`}>Fetching weather…</p>
              </motion.div>
            )}

            {/* Error */}
            {error && !loading && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="glass-strong rounded-3xl p-8 text-center"
              >
                <p className="text-5xl mb-4">⚠️</p>
                <p className={`font-bold text-lg mb-2 ${textPrimary}`}>Oops!</p>
                <p className={`text-sm leading-relaxed ${textSecondary}`}>{error}</p>
              </motion.div>
            )}

            {/* Weather data */}
            {weather && forecast && !loading && !error && (
              <motion.div
                key={weather.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* ── Left Column ── */}
                <div className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-8 w-full max-w-sm mx-auto lg:max-w-none">
                  <WeatherCard
                    weather={weather}
                    isFav={isFavorite(weather.name)}
                    onToggleFav={() => toggleFavorite(weather.name)}
                  />
                  <WeatherDetails weather={weather} />
                </div>

                {/* ── Right Column ── */}
                <div className="lg:col-span-8 flex flex-col gap-6 w-full max-w-sm mx-auto lg:max-w-none">
                  <ExtraData weather={weather} extra={extra} />
                  <TemperatureChart forecast={forecast} />
                  <ForecastRow forecast={forecast} />
                  <WeatherMap
                    coords={weather.coord}
                    isMock={isMock}
                    apiKey={HAS_KEY ? API_KEY : ''}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className={`mt-10 text-xs text-center ${textSecondary}`}
        >
          Updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </motion.p>
      </div>
    </div>
  )
}
