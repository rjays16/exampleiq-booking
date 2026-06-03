<template>
  <div class="page">
    <div class="container">

      <BookingConfirmed v-if="bookingResult" :booking="bookingResult" />

      <template v-else>
        <BookingForm v-model="tripType" :submitted="submitted" />
        <PickupSection ref="pickupRef" :submitted="submitted" @pickup-coords="onPickupCoords" />
        <DropoffSection ref="dropoffRef" :submitted="submitted" @dropoff-coords="onDropoffCoords" />
        <TripSummary :pickup-coords="pickupCoords" :dropoff-coords="dropoffCoords" />
        <HourlySection v-if="tripType === 'hourly'" ref="hourlyRef" v-model="hours" :submitted="submitted" />
        <ContactSection ref="contactRef" :submitted="submitted" @submit="handleSubmit" />

        <p v-if="submitError" class="submit-error">{{ submitError }}</p>
        <p v-if="submitting" class="submitting-text">Submitting booking...</p>
      </template>

    </div>
  </div>
</template>

<script setup lang="ts">
const submitted = ref(false)
const submitting = ref(false)
const submitError = ref('')
const tripType = ref('')
const hours = ref('1')
const pickupCoords = ref<{ lat: number; lng: number } | null>(null)
const dropoffCoords = ref<{ lat: number; lng: number } | null>(null)
const bookingResult = ref<{
  success: boolean
  message: string
  bookingId: string
  data: Record<string, any>
} | null>(null)

const pickupRef = ref<InstanceType<typeof PickupSection> | null>(null)
const dropoffRef = ref<InstanceType<typeof DropoffSection> | null>(null)
const contactRef = ref<InstanceType<typeof ContactSection> | null>(null)
const hourlyRef = ref<InstanceType<typeof HourlySection> | null>(null)

function onPickupCoords(lat: number, lng: number) {
  pickupCoords.value = { lat, lng }
}

function onDropoffCoords(lat: number, lng: number) {
  dropoffCoords.value = { lat, lng }
}

function isValid(): boolean {
  if (!tripType.value) return false
  const p = pickupRef.value
  const d = dropoffRef.value
  const c = contactRef.value
  if (!p || !d || !c) return false
  if (!p.pickupDate || !p.pickupTime) return false
  if (p.pickupTab === 'Location' && !p.pickupLocation) return false
  if (p.pickupTab === 'Airport' && !p.pickupAirport) return false
  if (d.dropoffTab === 'Location' && !d.dropoffLocation) return false
  if (d.dropoffTab === 'Airport' && !d.dropoffAirport) return false
  if (!c.phone) return false
  if (!c.passengers || Number(c.passengers) < 1) return false
  if (tripType.value === 'hourly') {
    const h = hourlyRef.value
    if (!h || !h.hours || Number(h.hours) < 1) return false
  }
  return true
}

async function handleSubmit() {
  submitted.value = true

  if (!isValid()) return

  submitting.value = true
  submitError.value = ''

  const p = pickupRef.value!
  const d = dropoffRef.value!
  const c = contactRef.value!

  const payload: Record<string, any> = {
    tripType: tripType.value,
    pickupDate: p.pickupDate,
    pickupTime: p.pickupTime,
    pickupTab: p.pickupTab,
    pickupLocation: p.pickupTab === 'Location' ? p.pickupLocation : '',
    pickupAirport: p.pickupTab === 'Airport' ? p.pickupAirport : '',
    dropoffTab: d.dropoffTab,
    dropoffLocation: d.dropoffTab === 'Location' ? d.dropoffLocation : '',
    dropoffAirport: d.dropoffTab === 'Airport' ? d.dropoffAirport : '',
    stops: p.stops.filter(Boolean),
    phone: c.phone,
    passengers: Number(c.passengers),
    recognized: c.recognized
  }

  if (c.firstName || c.lastName) {
    payload.firstName = c.firstName
    payload.lastName = c.lastName
  }
  if (c.email) {
    payload.email = c.email
  }
  if (tripType.value === 'hourly') {
    payload.hours = Number(hours.value)
  }

  try {
    const result = await $fetch('/api/submit-booking', {
      method: 'POST',
      body: payload
    })
    bookingResult.value = result as any
    contactRef.value?.storeContact()
  } catch (err: any) {
    submitError.value = err.data?.message || err.message || 'Submission failed. Please try again.'
  } finally {
    submitting.value = false
  }
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

.submit-error {
  margin-top: 16px;
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #e53e3e;
  border-radius: 4px;
  color: #e53e3e;
  font-size: 14px;
}

.submitting-text {
  margin-top: 16px;
  font-size: 14px;
  color: #888;
  text-align: center;
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
