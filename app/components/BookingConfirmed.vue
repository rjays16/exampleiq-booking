<template>
  <div class="success-wrapper">
    <div class="success-card">
      <Icon name="lucide:check-circle" class="success-icon" />
      <h2 class="success-title">Booking Confirmed!</h2>
      <p class="success-id">Booking ID: <strong>{{ booking.bookingId }}</strong></p>
      <p class="success-msg">{{ booking.message }}</p>

      <div class="success-details">
        <div class="detail-row">
          <span class="detail-label">Trip Type</span>
          <span class="detail-value">{{ booking.data.tripType === 'hourly' ? 'Hourly' : 'One-way' }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Pickup</span>
          <span class="detail-value">{{ booking.data.pickupDate }} at {{ booking.data.pickupTime }}</span>
        </div>
        <div v-if="booking.data.pickupLocation" class="detail-row">
          <span class="detail-label">Pickup Location</span>
          <span class="detail-value">{{ booking.data.pickupLocation }}</span>
        </div>
        <div v-for="(stop, i) in booking.data.stops" :key="i" class="detail-row">
          <span class="detail-label">Stop {{ i + 1 }}</span>
          <span class="detail-value">{{ stop }}</span>
        </div>
        <div v-if="booking.data.dropoffLocation" class="detail-row">
          <span class="detail-label">Drop-off Location</span>
          <span class="detail-value">{{ booking.data.dropoffLocation }}</span>
        </div>
        <div v-if="booking.data.pickupAirport" class="detail-row">
          <span class="detail-label">Pickup Airport</span>
          <span class="detail-value">{{ booking.data.pickupAirport }}</span>
        </div>
        <div v-if="booking.data.dropoffAirport" class="detail-row">
          <span class="detail-label">Drop-off Airport</span>
          <span class="detail-value">{{ booking.data.dropoffAirport }}</span>
        </div>
        <div v-if="booking.data.hours" class="detail-row">
          <span class="detail-label">Hours</span>
          <span class="detail-value">{{ booking.data.hours }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Passengers</span>
          <span class="detail-value">{{ booking.data.passengers }}</span>
        </div>
        <div v-if="booking.data.firstName" class="detail-row">
          <span class="detail-label">Name</span>
          <span class="detail-value">{{ booking.data.firstName }} {{ booking.data.lastName }}</span>
        </div>
        <div v-if="booking.data.email" class="detail-row">
          <span class="detail-label">Email</span>
          <span class="detail-value">{{ booking.data.email }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Phone</span>
          <span class="detail-value">{{ booking.data.phone }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  booking: {
    success: boolean
    message: string
    bookingId: string
    data: Record<string, any>
  }
}>()
</script>

<style scoped>
.success-wrapper {
  display: flex;
  justify-content: center;
  padding-top: 40px;
}

.success-card {
  width: 100%;
  max-width: 520px;
  text-align: center;
  padding: 40px 32px;
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
  margin-bottom: 24px;
}

.success-details {
  text-align: left;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #f8fafc;
  padding: 20px 24px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e2e8f0;
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
  .success-card {
    padding: 32px 24px;
  }

  .success-title {
    font-size: 24px;
  }

  .success-details {
    padding: 16px 20px;
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
