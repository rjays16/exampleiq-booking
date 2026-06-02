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

    <div v-if="dropoffTab === 'Airport'" class="location-field" :class="{ invalid: submitted && !dropoffAirport }">
      <label class="floating-label">Airport</label>
      <div class="location-input">
        <div class="location-value">
          <Icon name="lucide:plane" class="field-icon" />
          <input v-model="dropoffAirport" type="text" placeholder="Enter drop-off airport" class="location-text" />
        </div>
        <Icon name="lucide:chevron-down" class="chevron" />
      </div>
      <p v-if="submitted && !dropoffAirport" class="error-text">Drop-off airport is required</p>
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

.location-field {
  position: relative;
  margin-top: 8px;
}

.location-field.invalid .location-input {
  border-color: #e53e3e;
}

.floating-label {
  position: absolute;
  top: -10px;
  left: 12px;
  background: #fff;
  padding: 0 4px;
  font-size: 13px;
  color: #8a8a8a;
  z-index: 10;
}

.location-input {
  display: flex;
  height: 52px;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 0 12px;
}

.location-value {
  display: flex;
  align-items: center;
  flex: 1;
}

.field-icon {
  width: 16px;
  height: 16px;
  color: #c8a548;
  margin-right: 12px;
  flex-shrink: 0;
}

.location-text {
  border: none;
  background: transparent;
  outline: none;
  color: #444;
  font-size: 15px;
  width: 100%;
}

.chevron {
  width: 16px;
  height: 16px;
  color: #666;
  flex-shrink: 0;
}

.error-text {
  margin-top: 6px;
  font-size: 12px;
  color: #e53e3e;
}
</style>
