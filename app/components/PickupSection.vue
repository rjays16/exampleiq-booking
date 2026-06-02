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

    <div v-if="pickupTab === 'Airport'" class="location-field" :class="{ invalid: submitted && !pickupAirport }">
      <label class="floating-label">Airport</label>
      <div class="location-input">
        <div class="location-value">
          <Icon name="lucide:plane" class="field-icon" />
          <input v-model="pickupAirport" type="text" placeholder="Enter pickup airport" class="location-text" />
        </div>
        <Icon name="lucide:chevron-down" class="chevron" />
      </div>
      <p v-if="submitted && !pickupAirport" class="error-text">Pickup airport is required</p>
    </div>

    <div v-for="(stop, i) in stops" :key="i" class="stop-field">
      <label class="floating-label">Stop {{ i + 1 }}</label>
      <div class="location-input">
        <div class="location-value">
          <Icon name="lucide:map-pin" class="field-icon" />
          <input v-model="stops[i]" type="text" :placeholder="'Enter stop ' + (i + 1)" class="location-text" />
        </div>
        <button class="remove-btn" @click="removeStop(i)">
          <Icon name="lucide:x" class="remove-icon" />
        </button>
      </div>
    </div>

    <button class="add-stop" @click="addStop">+ Add a stop</button>
  </section>
</template>

<script setup lang="ts">
const pickupDate = ref('')
const pickupTime = ref('')
const pickupLocation = ref('Clintons Bar & Grille, High Street, Clinton, MA, USA')
const pickupAirport = ref('')
const pickupTab = ref('Location')
const pickupTabs = ['Location', 'Airport']

defineProps<{ submitted: boolean }>()
const emit = defineEmits<{
  'pickup-coords': [lat: number, lng: number]
}>()

const stops = ref<string[]>([])

function onPickupPlace(lat: number, lng: number) {
  emit('pickup-coords', lat, lng)
}

function addStop() {
  stops.value.push('')
}

function removeStop(i: number) {
  stops.value.splice(i, 1)
}
</script>

<style scoped>
.pickup-section {
  margin-bottom: 40px;
}

.section-title {
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  color: #222;
}

.date-time-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.date-field {
  width: 400px;
}

.time-field {
  width: 180px;
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

.stop-field {
  position: relative;
  margin-top: 8px;
  margin-bottom: 8px;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.remove-icon {
  width: 16px;
  height: 16px;
  color: #999;
}

.remove-btn:hover .remove-icon {
  color: #e53e3e;
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
