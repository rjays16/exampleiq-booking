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

defineExpose({ hours })

watch(hours, (val) => {
  if (typeof val !== 'string') {
    hours.value = String(val)
  }
})
</script>

<style scoped>
.hourly-section {
  margin-bottom: 30px;
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
  top: -10px;
  left: 12px;
  background: #fff;
  padding: 0 4px;
  font-size: 13px;
  color: #8a8a8a;
  z-index: 10;
}

.hours-input-wrap {
  display: flex;
  align-items: center;
  height: 52px;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  padding: 0 12px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.hours-input-wrap:focus-within {
  border-color: #c79a3b;
  box-shadow: 0 0 0 2px rgba(199, 154, 59, 0.3);
}

.field-icon {
  width: 16px;
  height: 16px;
  color: #c79a3b;
  margin-right: 12px;
  flex-shrink: 0;
}

.hours-input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 15px;
  background: transparent;
}

.error-text {
  margin-top: 6px;
  font-size: 13px;
  color: #e53e3e;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 15px;
  }
}
</style>
