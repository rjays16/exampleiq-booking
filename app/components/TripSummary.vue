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
}>()

const distance = ref('')
const duration = ref('')
const prevKey = ref('')

watch([() => props.pickupCoords, () => props.dropoffCoords], async ([pickup, dropoff]) => {
  if (!pickup || !dropoff) {
    distance.value = ''
    duration.value = ''
    return
  }

  const key = `${pickup.lat},${pickup.lng}-${dropoff.lat},${dropoff.lng}`
  if (key === prevKey.value) return
  prevKey.value = key

  const { getDistanceMatrix } = useGoogleMaps()
  try {
    const result = await getDistanceMatrix([pickup], [dropoff])
    distance.value = result.distance
    duration.value = result.duration
  } catch {
    distance.value = ''
    duration.value = ''
  }
}, { immediate: false })
</script>

<style scoped>
.trip-summary {
  margin-bottom: 32px;
}

.summary-row {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 24px;
  background: #faf9f4;
  border: 1px solid #e8e3d6;
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
  color: #c8a548;
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
  background: #e0ddd0;
}

@media (max-width: 480px) {
  .summary-row {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .summary-divider {
    width: 100%;
    height: 1px;
  }
}
</style>
