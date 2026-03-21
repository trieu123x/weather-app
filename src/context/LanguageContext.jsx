import { createContext, useContext, useState, useEffect } from 'react'

const translations = {
  vi: {
    app: {
      title: 'Thời tiết',
      subtitle: 'Dự báo thời gian thực',
      usingLocation: 'Đang dùng vị trí của bạn',
      demoMode: 'Chế độ Demo',
      demoDesc: 'Đang hiển thị dữ liệu mẫu',
    },
    search: {
      placeholder: 'Tìm kiếm thành phố...',
      placeholderWithCountry: 'Tìm {city} tại {country}...',
      button: 'Tìm',
      recent: 'Lịch sử tìm kiếm',
      favorites: 'YÊU THÍCH',
      selectCountry: 'Chọn quốc gia',
      allCountries: 'Tất cả quốc gia',
    },
    weather: {
      high: 'CAO',
      low: 'THẤP',
    },
    details: {
      humidity: 'ĐỘ ẨM',
      wind: 'SỨC GIÓ',
      feelsLike: 'CẢM GIÁC THỰC',
      sunrise: 'BÌNH MINH',
      sunset: 'HOÀNG HÔN',
      uvIndex: 'CHỈ SỐ UV',
      aqi: 'CHẤT LƯỢNG K.KHÍ',
    },
    forecast: {
      title: 'DỰ BÁO 5 NGÀY',
      today: 'HÔM NAY',
    },
    map: {
      toggle: 'Bản đồ Thời tiết',
      precipitation: 'Lượng mưa',
      clouds: 'Mây',
      wind: 'Gió',
    },
    badges: {
      uv: {
        low: 'Thấp',
        moderate: 'T.Bình',
        high: 'Cao',
        veryHigh: 'Rất cao',
        extreme: 'Cực độ',
      },
      aqi: {
        good: 'Tốt',
        fair: 'Khá',
        moderate: 'T.Bình',
        poor: 'Kém',
        veryPoor: 'Rất kém',
      }
    },
    days: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    months: ['Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12']
  },
  en: {
    app: {
      title: 'Weather',
      subtitle: 'Real-time forecasts',
      usingLocation: 'Using your location',
      demoMode: 'Demo Mode',
      demoDesc: 'Displaying offline sample data',
    },
    search: {
      placeholder: 'Search for a city...',
      placeholderWithCountry: 'Search {city} in {country}...',
      button: 'Search',
      recent: 'Recent Searches',
      favorites: 'FAVORITES',
      selectCountry: 'Select Country',
      allCountries: 'All Countries',
    },
    weather: {
      high: 'HIGH',
      low: 'LOW',
    },
    details: {
      humidity: 'HUMIDITY',
      wind: 'WIND',
      feelsLike: 'FEELS LIKE',
      sunrise: 'SUNRISE',
      sunset: 'SUNSET',
      uvIndex: 'UV INDEX',
      aqi: 'AIR QUALITY',
    },
    forecast: {
      title: '5-DAY FORECAST',
      today: 'TODAY',
    },
    map: {
      toggle: 'Weather Map',
      precipitation: 'Precipitation',
      clouds: 'Clouds',
      wind: 'Wind',
    },
    badges: {
      uv: {
        low: 'Low',
        moderate: 'Moderate',
        high: 'High',
        veryHigh: 'Very High',
        extreme: 'Extreme',
      },
      aqi: {
        good: 'Good',
        fair: 'Fair',
        moderate: 'Moderate',
        poor: 'Poor',
        veryPoor: 'Very Poor',
      }
    },
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('weather_lang') || 'vi' // Default to VI based on prompt
  })

  useEffect(() => {
    localStorage.setItem('weather_lang', language)
  }, [language])

  // Translation function: looks up 'section.key'
  const t = (path) => {
    const keys = path.split('.')
    let result = translations[language]
    for (const key of keys) {
      if (result[key] === undefined) return path // fallback to key path if missing
      result = result[key]
    }
    return result
  }

  // Raw dictionary for days/months arrays
  const dict = translations[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dict }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
