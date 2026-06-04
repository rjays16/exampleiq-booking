<template>
  <section class="contact-section">
    <h2 class="section-title">Contact Information</h2>

    <div class="phone-field" :class="{ invalid: submitted && !phone }">
      <div class="country-select" ref="countryRef">
        <button class="country-btn" @click="showCountries = !showCountries">
          <span class="flag">{{ selectedCountry.flag }}</span>
          <Icon name="lucide:chevron-down" class="chevron-sm" />
        </button>
        <div v-if="showCountries" class="country-dropdown">
          <button
            v-for="c in countries"
            :key="c.code"
            class="country-option"
            :class="{ 'country-option-active': c.code === selectedCountry.code }"
            @click="selectCountry(c)"
          >
            <span class="flag">{{ c.flag }}</span>
            <span class="country-name">{{ c.name }}</span>
            <span class="country-dial">{{ c.dial }}</span>
          </button>
        </div>
      </div>
      <input v-model="phone" type="text" :placeholder="selectedCountry.placeholder" class="phone-input" @blur="lookupPhone" />
      <p v-if="submitted && !phone" class="error-text">Phone number is required</p>
    </div>

    <p v-if="recognized && greetingName" class="greeting-text">Welcome back, {{ greetingName }}!</p>

    <template v-if="!recognized">
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
    </template>

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
const recognized = ref(false)
const greetingName = ref('')
const showCountries = ref(false)
const countryRef = ref<HTMLElement>()

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dial: '+1', placeholder: '+1 XXX XXX XXXX' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', dial: '+63', placeholder: '+63 XXX XXX XXXX' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dial: '+81', placeholder: '+81 XX XXXX XXXX' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dial: '+44', placeholder: '+44 XXXX XXX XXX' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dial: '+61', placeholder: '+61 X XXXX XXXX' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dial: '+1', placeholder: '+1 XXX XXX XXXX' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', dial: '+65', placeholder: '+65 XXXX XXXX' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', dial: '+82', placeholder: '+82 XX XXXX XXXX' },
]

const selectedCountry = ref(countries[0])

function selectCountry(c: typeof countries[0]) {
  selectedCountry.value = c
  showCountries.value = false
}

defineProps<{ submitted: boolean }>()
defineEmits<{ submit: [] }>()

function lookupPhone() {
  const raw = phone.value.trim()
  if (!raw) {
    recognized.value = false
    greetingName.value = ''
    return
  }

  const stored = localStorage.getItem('booking_phone_' + raw)
  if (stored) {
    recognized.value = true
    const data = JSON.parse(stored)
    greetingName.value = data.firstName + ' ' + data.lastName
  } else {
    recognized.value = false
    greetingName.value = ''
  }
}

function storeContact() {
  const raw = phone.value.trim()
  if (!raw) return
  const data = { firstName: firstName.value, lastName: lastName.value, email: email.value }
  localStorage.setItem('booking_phone_' + raw, JSON.stringify(data))
}

onMounted(() => {
  function handleClick(e: MouseEvent) {
    if (countryRef.value && !countryRef.value.contains(e.target as Node)) {
      showCountries.value = false
    }
  }
  document.addEventListener('click', handleClick)
  onUnmounted(() => document.removeEventListener('click', handleClick))
})

defineExpose({
  phone,
  firstName,
  lastName,
  email,
  passengers,
  recognized,
  storeContact
})
</script>

<style scoped>
.contact-section {
  margin-bottom: 30px;
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
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  padding: 0;
  margin-bottom: 12px;
  flex-wrap: wrap;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.phone-field:focus-within {
  border-color: #c79a3b;
  box-shadow: 0 0 0 2px rgba(199, 154, 59, 0.3);
}

.phone-field.invalid {
  border-color: #e53e3e;
}

.phone-field .error-text {
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 0 16px;
}

.country-select {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.country-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 10px 0 14px;
  height: 50px;
  border: none;
  background: none;
  cursor: pointer;
  border-right: 1px solid #e0e0e0;
}

.country-btn:hover {
  background: #f9f9f9;
}

.flag {
  font-size: 20px;
  line-height: 1;
}

.chevron-sm {
  width: 12px;
  height: 12px;
  color: #888;
}

.country-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  z-index: 100;
  max-height: 280px;
  overflow-y: auto;
  min-width: 220px;
}

.country-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 14px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
}

.country-option:hover {
  background: #f5f5f5;
}

.country-option-active {
  background: #faf9f4;
}

.country-name {
  flex: 1;
  color: #222;
}

.country-dial {
  color: #888;
  font-size: 13px;
}

.phone-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 15px;
  padding: 0 14px;
  min-width: 0;
}

.warning-text {
  margin-bottom: 16px;
  font-size: 14px;
  color: #c79a3b;
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
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  padding: 0 12px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.name-input:focus-within,
.email-input:focus-within,
.passengers-input:focus-within {
  border-color: #c79a3b;
  box-shadow: 0 0 0 2px rgba(199, 154, 59, 0.3);
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

.field-icon {
  width: 16px;
  height: 16px;
  color: #c79a3b;
  margin-right: 12px;
  flex-shrink: 0;
}

.input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 15px;
}

.input::placeholder {
  color: #bbb;
}

.error-text {
  margin-top: 6px;
  font-size: 13px;
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
  font-size: 16px;
  color: #c79a3b;
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
  height: 40px;
  border-radius: 6px;
  background-color: #c79a3b;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s;
}

.continue-btn:hover {
  background-color: #a87e2f;
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
