<template>
  <section class="contact-section">
    <h2 class="section-title">Contact Information</h2>

    <div class="phone-field" :class="{ invalid: submitted && !phone }">
      <span class="flag">🇺🇸</span>
      <input v-model="phone" type="text" placeholder="+1 XXX XXX XXXX" class="phone-input" />
      <p v-if="submitted && !phone" class="error-text">Phone number is required</p>
    </div>

    <p class="warning-text">
      We don't have that phone number on file. Please provide additional contact information.
    </p>

    <div class="name-row">
      <div class="name-field" :class="{ invalid: submitted && !firstName }">
        <label class="floating-label">First name</label>
        <div class="name-input">
          <Icon name="lucide:user" class="field-icon" />
          <input v-model="firstName" placeholder="First name" class="input" />
        </div>
        <p v-if="submitted && !firstName" class="error-text">Required</p>
      </div>

      <div class="name-field" :class="{ invalid: submitted && !lastName }">
        <label class="floating-label">Last name</label>
        <div class="name-input">
          <Icon name="lucide:user" class="field-icon" />
          <input v-model="lastName" placeholder="Last name" class="input" />
        </div>
        <p v-if="submitted && !lastName" class="error-text">Required</p>
      </div>
    </div>

    <div class="email-field" :class="{ invalid: submitted && !email }">
      <label class="floating-label">Email</label>
      <div class="email-input">
        <Icon name="lucide:mail" class="field-icon" />
        <input v-model="email" placeholder="name@example.com" class="input" />
      </div>
      <p v-if="submitted && !email" class="error-text">Email is required</p>
    </div>

    <div class="passengers-section">
      <div class="passengers-question">
        How many passengers are expected for the trip?
      </div>

      <div class="passengers-field" :class="{ invalid: submitted && (!passengers || Number(passengers) < 1) }">
        <label class="floating-label"># Passengers</label>
        <div class="passengers-input">
          <Icon name="lucide:hash" class="field-icon" />
          <input v-model="passengers" type="number" min="1" class="input" />
        </div>
        <p v-if="submitted && (!passengers || Number(passengers) < 1)" class="error-text">At least 1 passenger required</p>
      </div>
    </div>

    <button class="continue-btn" @click="$emit('submit')">Continue</button>
  </section>
</template>

<script setup lang="ts">
const phone = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const passengers = ref('')

defineProps<{ submitted: boolean }>()
defineEmits<{ submit: [] }>()
</script>

<style scoped>
.contact-section {
  margin-bottom: 40px;
}

.section-title {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #222;
}

.phone-field {
  position: relative;
  display: flex;
  min-height: 52px;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 0 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.phone-field.invalid {
  border-color: #e53e3e;
}

.phone-field .error-text {
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;
}

.flag {
  margin-right: 12px;
  font-size: 18px;
}

.phone-input {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  flex: 1;
}

.warning-text {
  margin-bottom: 16px;
  font-size: 13px;
  color: #c8a548;
}

.name-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 12px;
}

.name-field,
.email-field,
.passengers-field {
  position: relative;
  margin-top: 8px;
}

.name-field.invalid .name-input,
.email-field.invalid .email-input,
.passengers-field.invalid .passengers-input {
  border-color: #e53e3e;
}

.name-input,
.email-input,
.passengers-input {
  display: flex;
  height: 52px;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 0 12px;
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

.field-icon {
  width: 16px;
  height: 16px;
  color: #c8a548;
  margin-right: 12px;
  flex-shrink: 0;
}

.input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
}

.input::placeholder {
  color: #bbb;
}

.error-text {
  margin-top: 6px;
  font-size: 12px;
  color: #e53e3e;
}

.email-field {
  position: relative;
  margin-top: 8px;
  margin-bottom: 16px;
}

.passengers-section {
  margin-bottom: 24px;
}

.passengers-question {
  margin-bottom: 16px;
  font-size: 15px;
  color: #c8a548;
  font-weight: 500;
}

.passengers-field {
  width: 190px;
  position: relative;
  margin-top: 8px;
}

.name-field .error-text,
.email-field .error-text,
.passengers-field .error-text {
  margin-top: 4px;
  margin-bottom: 4px;
}

.continue-btn {
  width: 100%;
  height: 46px;
  border-radius: 4px;
  background-color: #c8a548;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.continue-btn:hover {
  opacity: 0.95;
}

@media (max-width: 768px) {
  .name-row {
    grid-template-columns: 1fr;
  }

  .passengers-field {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .passengers-question {
    font-size: 14px;
  }
}
</style>
