<template>
  <section class="pickup-section">
    <h2 class="section-title">Pickup</h2>

    <!-- Pickup Date + Time -->
    <div class="date-time-row">
      <div class="field-card">
        <div class="field-inner field-date">
          <Icon name="lucide:calendar" class="field-icon" />
          <input type="text" value="05/13/2023" class="field-input" />
        </div>
      </div>
      <div class="field-card">
        <div class="field-inner field-time">
          <Icon name="lucide:clock-3" class="field-icon" />
          <input type="text" value="3:00 PM" class="field-input" />
        </div>
      </div>
    </div>

    <!-- Pickup Tabs -->
    <div class="tabs">
      <button class="tab tab-active">Location</button>
      <button class="tab tab-inactive">Airport</button>
    </div>

    <!-- Pickup Floating Label Location -->
    <div class="location-field">
      <label class="floating-label">Location</label>
      <div class="location-input">
        <div class="location-value">
          <Icon name="lucide:map-pin" class="field-icon" />
          <span class="location-text">Clintons Bar &amp; Grille, High Street, Clinton, MA, USA</span>
        </div>
        <Icon name="lucide:chevron-down" class="chevron" />
      </div>
    </div>

    <button class="add-stop">+ Add a stop</button>
  </section>
</template>

<script setup lang="ts">
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

.field-inner {
  display: flex;
  height: 52px;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 0 16px;
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
}

.location-text {
  color: #444;
  font-size: 14px;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
