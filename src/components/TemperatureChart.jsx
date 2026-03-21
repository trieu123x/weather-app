import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts'
import { motion } from 'framer-motion'
import { Thermometer } from 'lucide-react'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div
      className="px-3 py-2 rounded-xl text-white text-xs font-semibold"
      style={{ background: 'rgba(30,20,60,0.85)', border: '1px solid rgba(255,255,255,0.15)' }}
    >
      <p className="text-white/50 mb-0.5">{label}</p>
      <p className="text-violet-300">{payload[0].value}°C</p>
    </div>
  )
}

export default function TemperatureChart({ forecast }) {
  if (!forecast?.list) return null

  // Take next 8 readings (24 hours, every 3h)
  const data = forecast.list.slice(0, 8).map((item) => {
    const date = new Date(item.dt * 1000)
    const h = date.getHours()
    const label = h === 0 ? 'midnight' : h < 12 ? `${h}am` : h === 12 ? '12pm' : `${h - 12}pm`
    return { label, temp: Math.round(item.main.temp) }
  })

  const temps = data.map((d) => d.temp)
  const min = Math.min(...temps) - 2
  const max = Math.max(...temps) + 2

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong rounded-3xl p-5 w-full max-w-sm mx-auto mb-3"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg" style={{ background: 'rgba(167,139,250,0.15)' }}>
          <Thermometer className="w-3.5 h-3.5 text-violet-300" />
        </div>
        <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.14em]">
          24h Temperature
        </p>
      </div>

      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
          <defs>
            <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontFamily: 'Inter' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[min, max]}
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontFamily: 'Inter' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#a78bfa"
            strokeWidth={2}
            fill="url(#tempGrad)"
            dot={{ fill: '#a78bfa', strokeWidth: 0, r: 3 }}
            activeDot={{ fill: '#fff', r: 4, strokeWidth: 2, stroke: '#a78bfa' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
