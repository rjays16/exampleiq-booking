<template>
  <div class="page">
    <div class="container">
      <BookingForm v-model="tripType" :submitted="submitted" />
      <PickupSection :submitted="submitted" />
      <DropoffSection :submitted="submitted" />
      <HourlySection v-if="tripType === 'hourly'" v-model="hours" :submitted="submitted" />
      <ContactSection :submitted="submitted" @submit="handleSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
const submitted = ref(false)
const tripType = ref('')
const hours = ref('1')

function handleSubmit() {
  submitted.value = true
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background-color: #fff;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 32px;
}

@media (max-width: 768px) {
  .container {
    padding: 16px 20px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 12px 16px;
  }
}
</style>
