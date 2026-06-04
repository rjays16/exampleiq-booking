<template>
  <section class="pickup-section">
    <h2 class="section-title">Pickup</h2>

    <div class="date-time-row">
      <div class="date-field" :class="{ invalid: submitted && !pickupDate }">
        <DatePicker v-model="pickupDate" placeholder="MM/DD/YYYY" :invalid="submitted && !pickupDate" />
        <p v-if="submitted && !pickupDate" class="error-text">Date is required</p>
      </div>
      <div class="time-field" :class="{ invalid: submitted && !pickupTime }">
        <TimePicker v-model="pickupTime" placeholder="HH:MM AM/PM" :invalid="submitted && !pickupTime" />
        <p v-if="submitted && !pickupTime" class="error-text">Time is required</p>
      </div>
    </div>

    <div class="tabs">
      <button
        v-for="tab in pickupTabs"
        :key="tab"
        class="tab"
        :class="pickupTab === tab ? 'tab-active' : 'tab-inactive'"
        @click="pickupTab = tab"
      >{{ tab }}</button>
    </div>

    <div v-if="pickupTab === 'Location'">
      <LocationAutocomplete
        v-model="pickupLocation"
        placeholder="Enter pickup location"
        label="Location"
        icon="lucide:map-pin"
        :invalid="submitted && !pickupLocation"
        error-msg="Pickup location is required"
        @place-changed="onPickupPlace"
      />
    </div>

    <div v-if="pickupTab === 'Airport'">
      <LocationAutocomplete
        v-model="pickupAirport"
        placeholder="Enter pickup airport"
        label="Airport"
        icon="lucide:plane"
        :invalid="submitted && !pickupAirport"
        error-msg="Pickup airport is required"
        :types="['airport']"
        @place-changed="onPickupPlace"
      />
    </div>

    <div v-for="(stop, i) in stops" :key="i" class="stop-row">
      <div class="stop-field">
        <LocationAutocomplete
          :model-value="stop"
          :placeholder="'Enter stop ' + (i + 1)"
          :label="'Stop ' + (i + 1)"
          icon="lucide:map-pin"
          @update:model-value="(val: string) => stops[i] = val"
          @place-changed="(lat, lng) => onStopPlace(i, lat, lng)"
        />
      </div>
      <button class="remove-btn" @click="removeStop(i)" title="Remove stop">
        <Icon name="lucide:trash-2" class="remove-icon" />
      </button>
    </div>

    <button class="add-stop" @click="addStop">+ Add a stop</button>
  </section>
</template>

<script setup lang="ts">
const pickupDate = ref('')
const pickupTime = ref('')
const pickupLocation = ref('')
const pickupAirport = ref('')
const pickupTab = ref('Location')
const pickupTabs = ['Location', 'Airport']

defineProps<{ submitted: boolean }>()
const emit = defineEmits<{
  'pickup-coords': [lat: number, lng: number]
  'stop-coords': [coords: { lat: number; lng: number }[]]
}>()

const stops = ref<string[]>([])
const stopCoords = ref<{ lat: number; lng: number }[]>([])

function onPickupPlace(lat: number, lng: number) {
  emit('pickup-coords', lat, lng)
}

function onStopPlace(index: number, lat: number, lng: number) {
  stopCoords.value[index] = { lat, lng }
}

watch(stopCoords, () => {
  emit('stop-coords', stopCoords.value.filter(Boolean))
}, { deep: true })

function addStop() {
  stops.value.push('')
}

function removeStop(i: number) {
  stops.value.splice(i, 1)
  stopCoords.value.splice(i, 1)
}

defineExpose({
  pickupDate,
  pickupTime,
  pickupLocation,
  pickupAirport,
  pickupTab,
  stops
})
</script>

<style scoped>
.pickup-section {
  margin-bottom: 30px;
}

.section-title {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #222;
}

.date-time-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.date-field {
  width: 240px;
}

.time-field {
  width: 130px;
}

.field-icon {
  width: 16px;
  height: 16px;
  color: #c8a548;
  margin-right: 12px;
  flex-shrink: 0;
}

.error-text {
  margin-top: 6px;
  font-size: 13px;
  color: #e53e3e;
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
  margin-bottom: 20px;
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

.add-stop {
  font-size: 15px;
  color: #c8a548;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.stop-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
}

.stop-field {
  flex: 1;
  min-width: 0;
}

.remove-btn {
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  margin-top: 8px;
  transition: all 0.15s;
}

.remove-btn:hover {
  border-color: #e53e3e;
  background: #fef2f2;
}

.remove-icon {
  width: 20px;
  height: 20px;
  color: #94a3b8;
  transition: color 0.15s;
}

.remove-btn:hover .remove-icon {
  color: #e53e3e;
}

.stop-row:last-child {
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .date-time-row {
    flex-direction: column;
  }

  .date-field,
  .time-field {
    width: 100% !important;
  }

  .location-text {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .tabs {
    display: flex;
  }

  .tab {
    flex: 1;
    text-align: center;
  }

  .date-field {
    width: 100% !important;
  }

  .time-field {
    width: 100% !important;
  }
}
</style>
