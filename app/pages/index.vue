<template>
  <div class="page">
    <div class="container">
      <BookingForm />
      <PickupSection />
      <DropoffSection />
      <ContactSection />
    </div>
  </div>
</template>

<script setup lang="ts">
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
