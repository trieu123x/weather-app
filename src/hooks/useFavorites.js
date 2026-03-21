import { useState, useEffect, useCallback } from 'react'

const KEY = 'weather_favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = useCallback(
    (city) => favorites.some((f) => f.toLowerCase() === city.toLowerCase()),
    [favorites]
  )

  const toggleFavorite = useCallback((city) => {
    setFavorites((prev) =>
      prev.some((f) => f.toLowerCase() === city.toLowerCase())
        ? prev.filter((f) => f.toLowerCase() !== city.toLowerCase())
        : [...prev, city].slice(0, 8)   // max 8 favorites
    )
  }, [])

  const removeFavorite = useCallback((city) => {
    setFavorites((prev) => prev.filter((f) => f.toLowerCase() !== city.toLowerCase()))
  }, [])

  return { favorites, isFavorite, toggleFavorite, removeFavorite }
}
