<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="max-w-3xl mx-auto">

      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <img
          src="/images/logo.png"
          alt="ExampleIQ"
          class="w-48"
        />
      </div>

      <div class="bg-white rounded-lg shadow-sm p-8">

        <!-- Heading -->
        <h1 class="text-3xl font-semibold mb-6">
          Let's get you on your way!
        </h1>

        <!-- Trip Type -->
        <div class="grid grid-cols-2 gap-0 mb-8 rounded-lg overflow-hidden border border-gray-300">

          <button
            class="flex items-center justify-center gap-2 py-3 bg-yellow-600 text-white font-medium text-sm"
          >
            <Icon name="mdi:arrow-right-circle" />
            <span>One-way</span>
          </button>

          <button
            class="flex items-center justify-center gap-2 py-3 bg-white text-gray-600 font-medium text-sm"
          >
            <Icon name="mdi:timer-sand" />
            <span>Hourly</span>
          </button>

        </div>

        <!-- Form Fields Card -->
        <div class="border border-gray-200 rounded-lg divide-y divide-gray-100">

          <div class="flex items-center gap-4 p-4">
            <Icon name="mdi:map-marker" class="text-yellow-600 text-xl shrink-0" />
            <span class="flex-1 text-gray-800">Pickup Location</span>
            <Icon name="mdi:chevron-right" class="text-gray-400" />
          </div>

          <div class="flex items-center gap-4 p-4">
            <Icon name="mdi:phone" class="text-yellow-600 text-xl shrink-0" />
            <span class="flex-1 text-gray-800">Phone Number</span>
            <Icon name="mdi:chevron-right" class="text-gray-400" />
          </div>

          <div class="flex items-center gap-4 p-4">
            <Icon name="mdi:calendar" class="text-yellow-600 text-xl shrink-0" />
            <span class="flex-1 text-gray-800">Pickup Date</span>
            <Icon name="mdi:chevron-right" class="text-gray-400" />
          </div>

        </div>

      </div>

    </div>
  </div>
</template>