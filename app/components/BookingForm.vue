<template>
  <div class="logo-wrapper">
    <img src="/images/logo.png" alt="ExampleIQ" class="logo" />
  </div>

  <h1 class="title">Let's get you on your way!</h1>

  <div class="trip-type">
    <button class="btn btn-active">
      <Icon name="lucide:arrow-right-circle" class="icon" />
      One-way
    </button>
    <button class="btn btn-inactive">
      <Icon name="lucide:hourglass" class="icon" />
      Hourly
    </button>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.logo-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.logo {
  height: 70px;
  width: auto;
}

.title {
  margin-bottom: 24px;
  font-size: 40px;
  font-weight: 400;
  font-style: italic;
  color: #232323;
  font-family: Georgia, serif;
}

.trip-type {
  display: flex;
  height: 46px;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #d8d8d8;
  margin-bottom: 32px;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.btn-active {
  background-color: #fffdf7;
  color: #c8a548;
  font-weight: 500;
  border-right: 1px solid #c8a548;
}

.btn-inactive {
  background-color: #fff;
  color: #666;
}

.icon {
  width: 16px;
  height: 16px;
}
</style>
