import { useState, useEffect } from 'react'

export function useGeolocation() {
  const [state, setState] = useState({
    loading: true,
    coords: null,   // { lat, lon }
    error: null,
    usingLocation: false,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ loading: false, coords: null, error: 'Geolocation not supported', usingLocation: false })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          loading: false,
          coords: { lat: pos.coords.latitude, lon: pos.coords.longitude },
          error: null,
          usingLocation: true,
        })
      },
      () => {
        // Permission denied or error — silently fall back
        setState({ loading: false, coords: null, error: null, usingLocation: false })
      },
      { timeout: 8000, maximumAge: 300000 }
    )
  }, [])

  return state
}
