<template>
  <div class="logo-wrapper">
    <img src="/images/logo.png" alt="ExampleIQ" class="logo" />
  </div>

  <h1 class="title">Let's get you on your way!</h1>

  <div class="trip-type" :class="{ invalid: submitted && !tripType }">
    <button
      class="btn"
      :class="tripType === 'one-way' ? 'btn-active' : 'btn-inactive'"
      @click="tripType = 'one-way'"
    >
      <Icon name="lucide:arrow-right-circle" class="icon" />
      One-way
    </button>
    <span class="divider"></span>
    <button
      class="btn"
      :class="tripType === 'hourly' ? 'btn-active' : 'btn-inactive'"
      @click="tripType = 'hourly'"
    >
      <Icon name="lucide:hourglass" class="icon" />
      Hourly
    </button>
  </div>
  <p v-if="submitted && !tripType" class="error-text">Please select a trip type</p>
</template>

<script setup lang="ts">
const tripType = ref('')

defineProps<{ submitted: boolean }>()
</script>

<style scoped>
.logo-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.logo {
  height: 70px;
  width: auto;
}

.title {
  margin-bottom: 24px;
  font-size: 40px;
  font-weight: 400;
  font-style: italic;
  color: #232323;
  font-family: Georgia, serif;
}

.trip-type {
  display: flex;
  height: 46px;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #d8d8d8;
  margin-bottom: 32px;
}

.trip-type.invalid {
  border-color: #e53e3e;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.divider {
  width: 1px;
  background: #d8d8d8;
}

.btn-active {
  background-color: #fffdf7;
  color: #c8a548;
  font-weight: 500;
}

.btn-inactive {
  background-color: #fff;
  color: #666;
}

.icon {
  width: 16px;
  height: 16px;
}

.error-text {
  margin-top: 6px;
  font-size: 12px;
  color: #e53e3e;
}

@media (max-width: 768px) {
  .title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 24px;
  }
}
</style>
