<template>
  <section class="pickup-section">
    <h2 class="section-title">Pickup</h2>

    <div class="date-time-row">
      <div class="field-card" :class="{ invalid: submitted && !pickupDate }">
        <div class="field-inner field-date">
          <Icon name="lucide:calendar" class="field-icon" />
          <input v-model="pickupDate" type="text" placeholder="MM/DD/YYYY" class="field-input" />
        </div>
        <p v-if="submitted && !pickupDate" class="error-text">Date is required</p>
      </div>
      <div class="field-card" :class="{ invalid: submitted && !pickupTime }">
        <div class="field-inner field-time">
          <Icon name="lucide:clock-3" class="field-icon" />
          <input v-model="pickupTime" type="text" placeholder="HH:MM AM/PM" class="field-input" />
        </div>
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

    <div class="location-field" :class="{ invalid: submitted && !pickupLocation }">
      <label class="floating-label">Location</label>
      <div class="location-input">
        <div class="location-value">
          <Icon name="lucide:map-pin" class="field-icon" />
          <input v-model="pickupLocation" type="text" placeholder="Enter pickup location" class="location-text" />
        </div>
        <Icon name="lucide:chevron-down" class="chevron" />
      </div>
      <p v-if="submitted && !pickupLocation" class="error-text">Pickup location is required</p>
    </div>

    <button class="add-stop">+ Add a stop</button>
  </section>
</template>

<script setup lang="ts">
const pickupDate = ref('05/13/2023')
const pickupTime = ref('3:00 PM')
const pickupLocation = ref('Clintons Bar & Grille, High Street, Clinton, MA, USA')
const pickupTab = ref('Location')
const pickupTabs = ['Location', 'Airport']

defineProps<{ submitted: boolean }>()
</script>

<style scoped>
.pickup-section {
  margin-bottom: 40px;
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

.field-card {
  width: fit-content;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 12px;
}

.field-card.invalid {
  border-color: #e53e3e;
}

.field-inner {
  display: flex;
  height: 52px;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 0 16px;
}

.field-card.invalid .field-inner {
  border-color: #e53e3e;
}

.field-date {
  width: 400px;
}

.field-time {
  width: 150px;
}

.field-icon {
  width: 16px;
  height: 16px;
  color: #c8a548;
  margin-right: 12px;
  flex-shrink: 0;
}

.field-input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
}

.error-text {
  margin-top: 6px;
  font-size: 12px;
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
  font-size: 14px;
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
  top: -8px;
  left: 12px;
  background: #fff;
  padding: 0 4px;
  font-size: 11px;
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
  font-size: 14px;
  width: 100%;
}

.chevron {
  width: 16px;
  height: 16px;
  color: #666;
  flex-shrink: 0;
}

.add-stop {
  font-size: 14px;
  color: #c8a548;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

@media (max-width: 768px) {
  .date-time-row {
    flex-direction: column;
  }

  .field-card {
    width: 100%;
  }

  .field-inner {
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

  .field-date {
    width: 100% !important;
  }

  .field-time {
    width: 100% !important;
  }
}
</style>
