import { Loader } from '@googlemaps/js-api-loader'

let loader: Loader | null = null

export function useGoogleMaps() {
  const config = useRuntimeConfig()
  const apiKey = config.public.googleMapsApiKey as string

  if (!loader) {
    loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places']
    })
  }

  async function loadPlacesService(): Promise<google.maps.places.PlacesService> {
    await loader!.load()
    return new google.maps.places.PlacesService(document.createElement('div'))
  }

  async function loadAutocompleteService(): Promise<google.maps.places.AutocompleteService> {
    await loader!.load()
    return new google.maps.places.AutocompleteService()
  }

  async function getDistanceMatrix(origins: google.maps.LatLngLiteral[], destinations: google.maps.LatLngLiteral[]): Promise<google.maps.DistanceMatrixResponse> {
    await loader!.load()
    return new Promise((resolve, reject) => {
      const service = new google.maps.DistanceMatrixService()
      service.getDistanceMatrix(
        {
          origins: origins.map(o => new google.maps.LatLng(o.lat, o.lng)),
          destinations: destinations.map(d => new google.maps.LatLng(d.lat, d.lng)),
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL
        },
        (result, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK && result) {
            resolve(result)
          } else {
            reject(new Error(`Distance Matrix failed: ${status}`))
          }
        }
      )
    })
  }

  return {
    loadPlacesService,
    loadAutocompleteService,
    getDistanceMatrix
  }
}
