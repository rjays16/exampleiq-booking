<template>
  <div class="page">
    <div class="container">

      <BookingConfirmed v-if="bookingResult" :booking="bookingResult" />

      <template v-else>
      <BookingForm v-model="tripType" :submitted="submitted" />
      <PickupSection ref="pickupRef" :submitted="submitted" @pickup-coords="onPickupCoords" @stop-coords="onStopCoords" />
      <DropoffSection v-if="tripType !== 'hourly'" ref="dropoffRef" :submitted="submitted" @dropoff-coords="onDropoffCoords" />
      <TripSummary v-if="tripType !== 'hourly'" :pickup-coords="pickupCoords" :dropoff-coords="dropoffCoords" :stop-coords="stopCoords" />
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
const stopCoords = ref<{ lat: number; lng: number }[]>([])
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

function onStopCoords(coords: { lat: number; lng: number }[]) {
  stopCoords.value = coords
}

function isValid(): boolean {
  if (!tripType.value) return false
  const p = pickupRef.value
  const c = contactRef.value
  if (!p || !c) return false
  if (!p.pickupDate || !p.pickupTime) return false
  if (p.pickupTab === 'Location' && !p.pickupLocation) return false
  if (p.pickupTab === 'Airport' && !p.pickupAirport) return false
  if (tripType.value !== 'hourly') {
    const d = dropoffRef.value
    if (!d) return false
    if (d.dropoffTab === 'Location' && !d.dropoffLocation) return false
    if (d.dropoffTab === 'Airport' && !d.dropoffAirport) return false
  }
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
  const d = dropoffRef.value
  const c = contactRef.value!

  const payload: Record<string, any> = {
    tripType: tripType.value,
    pickupDate: p.pickupDate,
    pickupTime: p.pickupTime,
    pickupTab: p.pickupTab,
    pickupLocation: p.pickupTab === 'Location' ? p.pickupLocation : '',
    pickupAirport: p.pickupTab === 'Airport' ? p.pickupAirport : '',
    stops: p.stops.filter(Boolean),
    phone: c.phone,
    passengers: Number(c.passengers),
    recognized: c.recognized
  }

  if (tripType.value !== 'hourly' && d) {
    payload.dropoffTab = d.dropoffTab
    payload.dropoffLocation = d.dropoffTab === 'Location' ? d.dropoffLocation : ''
    payload.dropoffAirport = d.dropoffTab === 'Airport' ? d.dropoffAirport : ''
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
  background-color: #f8fafc;
  padding: 20px 0;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.container {
  max-width: 576px;
  margin: 0 auto;
  background: #fff;
  padding: 32px;
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
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 16px;
  }
}

@media (max-width: 650px) {
  .container {
    max-width: 100%;
  }
}
</style>
