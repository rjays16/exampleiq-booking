<template>
  <div class="page">
    <div class="container">

      <template v-if="bookingResult">
        <div class="success-wrapper">
          <div class="success-card">
            <Icon name="lucide:check-circle" class="success-icon" />
            <h2 class="success-title">Booking Confirmed!</h2>
            <p class="success-id">Booking ID: <strong>{{ bookingResult.bookingId }}</strong></p>
            <p class="success-msg">{{ bookingResult.message }}</p>
            <div class="success-details">
              <div class="detail-row">
                <span class="detail-label">Trip Type</span>
                <span class="detail-value">{{ bookingResult.data.tripType === 'hourly' ? 'Hourly' : 'One-way' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Pickup</span>
                <span class="detail-value">{{ bookingResult.data.pickupDate }} at {{ bookingResult.data.pickupTime }}</span>
              </div>
              <div class="detail-row" v-if="bookingResult.data.pickupLocation">
                <span class="detail-label">Pickup Location</span>
                <span class="detail-value">{{ bookingResult.data.pickupLocation }}</span>
              </div>
              <div class="detail-row" v-if="bookingResult.data.dropoffLocation">
                <span class="detail-label">Drop-off Location</span>
                <span class="detail-value">{{ bookingResult.data.dropoffLocation }}</span>
              </div>
              <div class="detail-row" v-if="bookingResult.data.pickupAirport">
                <span class="detail-label">Pickup Airport</span>
                <span class="detail-value">{{ bookingResult.data.pickupAirport }}</span>
              </div>
              <div class="detail-row" v-if="bookingResult.data.dropoffAirport">
                <span class="detail-label">Drop-off Airport</span>
                <span class="detail-value">{{ bookingResult.data.dropoffAirport }}</span>
              </div>
              <div class="detail-row" v-if="bookingResult.data.hours">
                <span class="detail-label">Hours</span>
                <span class="detail-value">{{ bookingResult.data.hours }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Passengers</span>
                <span class="detail-value">{{ bookingResult.data.passengers }}</span>
              </div>
              <div class="detail-row" v-if="bookingResult.data.firstName">
                <span class="detail-label">Name</span>
                <span class="detail-value">{{ bookingResult.data.firstName }} {{ bookingResult.data.lastName }}</span>
              </div>
              <div class="detail-row" v-if="bookingResult.data.email">
                <span class="detail-label">Email</span>
                <span class="detail-value">{{ bookingResult.data.email }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone</span>
                <span class="detail-value">{{ bookingResult.data.phone }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>

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

.success-wrapper {
  display: flex;
  justify-content: center;
  padding-top: 60px;
}

.success-card {
  width: 100%;
  max-width: 520px;
  text-align: center;
  padding: 48px 40px;
}

.success-icon {
  width: 56px;
  height: 56px;
  color: #22c55e;
  margin-bottom: 20px;
}

.success-title {
  font-size: 28px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
}

.success-id {
  font-size: 15px;
  color: #666;
  margin-bottom: 4px;
}

.success-msg {
  font-size: 14px;
  color: #888;
  margin-bottom: 32px;
}

.success-details {
  text-align: left;
  border: 1px solid #e8e3d6;
  border-radius: 6px;
  background: #faf9f4;
  padding: 20px 24px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e8e3d6;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 13px;
  color: #888;
}

.detail-value {
  font-size: 14px;
  color: #222;
  font-weight: 500;
  text-align: right;
  max-width: 60%;
}

@media (max-width: 768px) {
  .container {
    padding: 16px 20px;
  }

  .success-card {
    padding: 32px 20px;
  }

  .success-title {
    font-size: 24px;
  }

  .detail-row {
    flex-direction: column;
    gap: 4px;
  }

  .detail-value {
    text-align: left;
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 12px 16px;
  }

  .success-wrapper {
    padding-top: 32px;
  }

  .success-card {
    padding: 24px 16px;
  }

  .success-icon {
    width: 40px;
    height: 40px;
  }

  .success-title {
    font-size: 20px;
  }

  .success-details {
    padding: 12px 16px;
  }
}
</style>
