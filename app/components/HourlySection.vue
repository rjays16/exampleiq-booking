<template>
  <section class="hourly-section">
    <h2 class="section-title">Hourly Booking</h2>

    <div class="hours-field" :class="{ invalid: submitted && (!hours || Number(hours) < 1) }">
      <label class="floating-label">Number of hours</label>
      <div class="hours-input-wrap">
        <Icon name="lucide:clock" class="field-icon" />
        <input v-model="hours" type="number" min="1" max="24" placeholder=" " class="hours-input" />
      </div>
      <p v-if="submitted && !hours" class="error-text">Number of hours is required</p>
      <p v-if="submitted && hours && Number(hours) < 1" class="error-text">Minimum 1 hour required</p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ submitted: boolean }>()
const hours = defineModel<string>({ default: '' })
</script>

<style scoped>
.hourly-section {
  margin-bottom: 40px;
}

.section-title {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #222;
}

.hours-field {
  position: relative;
  margin-top: 8px;
}

.hours-field.invalid .hours-input-wrap {
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

.hours-input-wrap {
  display: flex;
  align-items: center;
  height: 52px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 0 12px;
}

.field-icon {
  width: 16px;
  height: 16px;
  color: #c8a548;
  margin-right: 12px;
  flex-shrink: 0;
}

.hours-input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
}

.error-text {
  margin-top: 6px;
  font-size: 12px;
  color: #e53e3e;
}
</style>
