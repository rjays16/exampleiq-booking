<template>
  <section class="contact-section">
    <h2 class="section-title">Contact Information</h2>

    <div class="phone-field">
      <span class="flag">🇺🇸</span>
      <input value="+1 774 415 3244" class="phone-input" />
    </div>

    <p class="warning-text">
      We don't have that phone number on file. Please provide additional contact information.
    </p>

    <div class="name-row">
      <div class="name-field">
        <label class="floating-label">First name</label>
        <div class="name-input">
          <Icon name="lucide:user" class="field-icon" />
          <input placeholder="First name" class="input" />
        </div>
      </div>

      <div class="name-field">
        <label class="floating-label">Last name</label>
        <div class="name-input">
          <Icon name="lucide:user" class="field-icon" />
          <input placeholder="Last name" class="input" />
        </div>
      </div>
    </div>

    <div class="email-field">
      <label class="floating-label">Email</label>
      <div class="email-input">
        <Icon name="lucide:mail" class="field-icon" />
        <input placeholder="name@example.com" class="input" />
      </div>
    </div>

    <div class="passengers-section">
      <div class="passengers-question">
        How many passengers are expected for the trip?
      </div>

      <div class="passengers-field">
        <label class="floating-label"># Passengers</label>
        <div class="passengers-input">
          <Icon name="lucide:hash" class="field-icon" />
          <input value="1" class="input" />
        </div>
      </div>
    </div>

    <button class="continue-btn">Continue</button>
  </section>
</template>

<script setup lang="ts">
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
  display: flex;
  height: 52px;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 0 16px;
  margin-bottom: 12px;
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
</style>
