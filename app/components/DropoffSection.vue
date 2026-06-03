<template>
  <section class="dropoff-section">
    <h2 class="section-title">Drop off</h2>

    <div class="tabs">
      <button
        v-for="tab in dropoffTabs"
        :key="tab"
        class="tab"
        :class="dropoffTab === tab ? 'tab-active' : 'tab-inactive'"
        @click="dropoffTab = tab"
      >{{ tab }}</button>
    </div>

    <div v-if="dropoffTab === 'Location'">
      <LocationAutocomplete
        v-model="dropoffLocation"
        placeholder="Enter drop-off location"
        label="Location"
        icon="lucide:map-pin"
        :invalid="submitted && !dropoffLocation"
        error-msg="Drop-off location is required"
        @place-changed="onDropoffPlace"
      />
    </div>

    <div v-if="dropoffTab === 'Airport'">
      <LocationAutocomplete
        v-model="dropoffAirport"
        placeholder="Enter drop-off airport"
        label="Airport"
        icon="lucide:plane"
        :invalid="submitted && !dropoffAirport"
        error-msg="Drop-off airport is required"
        :types="['airport']"
        @place-changed="onDropoffPlace"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const dropoffLocation = ref('')
const dropoffAirport = ref('')
const dropoffTab = ref('Location')
const dropoffTabs = ['Location', 'Airport']

defineProps<{ submitted: boolean }>()
const emit = defineEmits<{
  'dropoff-coords': [lat: number, lng: number]
}>()

function onDropoffPlace(lat: number, lng: number) {
  emit('dropoff-coords', lat, lng)
}

defineExpose({
  dropoffLocation,
  dropoffAirport,
  dropoffTab
})
</script>

<style scoped>
.dropoff-section {
  margin-bottom: 40px;
}

.section-title {
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  color: #222;
}

.tabs {
  display: inline-flex;
  gap: 4px;
  margin-bottom: 16px;
}

.tab {
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
}

.tab-active {
  border: 1px solid #c8a548;
  color: #c8a548;
  background: #fff;
}

.tab-inactive {
  border: 1px solid #d9d9d9;
  color: #666;
  background: #fff;
}
</style>
