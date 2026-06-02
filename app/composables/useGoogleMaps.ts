declare const google: any

export function useGoogleMaps() {
  const config = useRuntimeConfig()
  const apiKey = config.public.googleMapsApiKey as string

  let loaded = false
  let loadPromise: Promise<void> | null = null

  async function loadPlaces() {
    if (loaded) return
    if (loadPromise) return loadPromise

    loadPromise = new Promise<void>((resolve, reject) => {
      if (typeof google !== 'undefined' && google.maps?.places) {
        loaded = true
        resolve()
        return
      }

      const existing = document.querySelector('script[src*="maps.googleapis.com"]')
      if (existing) {
        const check = setInterval(() => {
          if (typeof google !== 'undefined' && google.maps?.places) {
            clearInterval(check)
            loaded = true
            resolve()
          }
        }, 100)
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=__gmap_loaded`
      script.async = true
      script.defer = true
      ;(window as any).__gmap_loaded = () => {
        loaded = true
        resolve()
      }
      script.onerror = reject
      document.head.appendChild(script)
    })

    return loadPromise
  }

  async function getDistanceMatrix(origins: { lat: number; lng: number }[], destinations: { lat: number; lng: number }[]) {
    await loadPlaces()
    return new Promise<{ distance: string; duration: string }>((resolve, reject) => {
      const service = new google.maps.DistanceMatrixService()
      service.getDistanceMatrix(
        {
          origins: origins.map((o: any) => new google.maps.LatLng(o.lat, o.lng)),
          destinations: destinations.map((d: any) => new google.maps.LatLng(d.lat, d.lng)),
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL
        },
        (result: any, status: any) => {
          if (status === google.maps.DistanceMatrixStatus.OK && result) {
            const element = result.rows[0]?.elements[0]
            if (element?.status === 'OK') {
              resolve({
                distance: element.distance.text,
                duration: element.duration.text
              })
            } else {
              reject(new Error('No route found'))
            }
          } else {
            reject(new Error(`Distance Matrix failed: ${status}`))
          }
        }
      )
    })
  }

  return {
    loadPlaces,
    getDistanceMatrix
  }
}
