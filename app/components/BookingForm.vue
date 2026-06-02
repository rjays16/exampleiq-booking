<template>
  <div class="min-h-screen bg-white">
    <div class="mx-auto max-w-[1100px] px-8 py-6">

      <!-- Logo -->
      <div class="flex justify-center mb-10">
        <img
          src="/images/logo.png"
          alt="ExampleIQ"
          class="h-[70px] w-auto"
        />
      </div>

      <!-- Title -->
      <h1 class="mb-6 text-[40px] font-normal italic text-[#232323]" style="font-family: Georgia, serif;">
        Let's get you on your way!
      </h1>

      <!-- Trip Type -->
      <div class="mb-8 flex h-[46px] overflow-hidden rounded border border-[#d8d8d8]">
        <button class="flex flex-1 items-center justify-center gap-2 border-r border-[#c8a548] bg-[#fffdf7] font-medium text-[#c8a548]">
          <Icon name="lucide:arrow-right-circle" class="h-4 w-4" />
          One-way
        </button>
        <button class="flex flex-1 items-center justify-center gap-2 text-[#666]">
          <Icon name="lucide:hourglass" class="h-4 w-4" />
          Hourly
        </button>
      </div>

      <PickupSection />
      <DropoffSection />
      <ContactSection />

    </div>
  </div>
</template>

<script setup lang="ts">
</script>
