<template>
  <section v-if="distance && duration" class="trip-summary">
    <div class="summary-row">
      <div class="summary-item">
        <Icon name="lucide:route" class="summary-icon" />
        <span class="summary-label">Distance</span>
        <span class="summary-value">{{ distance }}</span>
      </div>
      <div class="summary-divider"></div>
      <div class="summary-item">
        <Icon name="lucide:clock" class="summary-icon" />
        <span class="summary-label">Travel Time</span>
        <span class="summary-value">{{ duration }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  pickupCoords: { lat: number; lng: number } | null
  dropoffCoords: { lat: number; lng: number } | null
  stopCoords: { lat: number; lng: number }[]
}>()

const distance = ref('')
const duration = ref('')
const prevKey = ref('')

watch(
  [() => props.pickupCoords, () => props.dropoffCoords, () => props.stopCoords.map(c => `${c.lat},${c.lng}`).join('|')],
  async ([pickup, dropoff]) => {
    if (!pickup || !dropoff) {
      distance.value = ''
      duration.value = ''
      return
    }

    const stops = props.stopCoords.filter(Boolean)
    const key = `${pickup.lat},${pickup.lng}-${dropoff.lat},${dropoff.lng}|${stops.map(s => `${s.lat},${s.lng}`).join(';')}`
    if (key === prevKey.value) return
    prevKey.value = key

    const { getDistanceMatrix } = useGoogleMaps()
    const legs: { origin: { lat: number; lng: number }; destination: { lat: number; lng: number } }[] = []

    if (stops.length === 0) {
      legs.push({ origin: pickup, destination: dropoff })
    } else {
      legs.push({ origin: pickup, destination: stops[0] })
      for (let i = 0; i < stops.length - 1; i++) {
        legs.push({ origin: stops[i], destination: stops[i + 1] })
      }
      legs.push({ origin: stops[stops.length - 1], destination: dropoff })
    }

    try {
      let totalMeters = 0
      let totalSeconds = 0
      let unit = 'mi'

      for (const leg of legs) {
        const result = await getDistanceMatrix([leg.origin], [leg.destination])
        totalMeters += result.distanceValue
        totalSeconds += result.durationValue
        unit = result.distance.includes('km') ? 'km' : 'mi'
      }

      const miles = totalMeters / 1609.344
      const hours = Math.floor(totalSeconds / 3600)
      const mins = Math.round((totalSeconds % 3600) / 60)

      distance.value = miles.toFixed(1) + ' ' + unit
      duration.value = hours > 0 ? `${hours} hr ${mins} mins` : `${mins} mins`
    } catch {
      distance.value = ''
      duration.value = ''
    }
  },
  { immediate: false, deep: true }
)
</script>

<style scoped>
.trip-summary {
  margin-bottom: 32px;
}

.summary-row {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 14px 20px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.summary-icon {
  width: 20px;
  height: 20px;
  color: #c79a3b;
  flex-shrink: 0;
}

.summary-label {
  font-size: 13px;
  color: #888;
}

.summary-value {
  font-size: 15px;
  font-weight: 600;
  color: #222;
}

.summary-divider {
  width: 1px;
  height: 28px;
  background: #e2e8f0;
}

@media (max-width: 768px) {
  .summary-row {
    padding: 12px 16px;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .summary-row {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .summary-divider {
    width: 100%;
    height: 1px;
  }
}
</style>
