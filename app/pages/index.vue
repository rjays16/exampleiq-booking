<template>
  <div class="page">
    <div class="container">
      <BookingForm v-model="tripType" :submitted="submitted" />
      <PickupSection :submitted="submitted" @pickup-coords="onPickupCoords" />
      <DropoffSection :submitted="submitted" @dropoff-coords="onDropoffCoords" />
      <TripSummary :pickup-coords="pickupCoords" :dropoff-coords="dropoffCoords" />
      <HourlySection v-if="tripType === 'hourly'" v-model="hours" :submitted="submitted" />
      <ContactSection :submitted="submitted" @submit="handleSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
const submitted = ref(false)
const tripType = ref('')
const hours = ref('1')
const pickupCoords = ref<{ lat: number; lng: number } | null>(null)
const dropoffCoords = ref<{ lat: number; lng: number } | null>(null)

function onPickupCoords(lat: number, lng: number) {
  pickupCoords.value = { lat, lng }
}

function onDropoffCoords(lat: number, lng: number) {
  dropoffCoords.value = { lat, lng }
}

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
