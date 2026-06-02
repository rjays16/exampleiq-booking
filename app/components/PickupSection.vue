<template>
  <section class="mb-10">
    <h2 class="mb-4 text-[16px] font-semibold text-[#222]">Pickup</h2>

    <!-- Pickup Date + Time -->
    <div class="mb-4 flex gap-3">
      <div class="w-fit rounded border border-[#d9d9d9] p-3">
        <div class="flex h-[52px] w-[400px] items-center rounded border border-[#d9d9d9] px-4">
          <Icon name="lucide:calendar" class="mr-3 h-4 w-4 text-[#c8a548]" />
          <input type="text" value="05/13/2023" class="w-full border-none bg-transparent outline-none" />
        </div>
      </div>
      <div class="w-fit rounded border border-[#d9d9d9] p-3">
        <div class="flex h-[52px] w-[150px] items-center rounded border border-[#d9d9d9] px-4">
          <Icon name="lucide:clock-3" class="mr-3 h-4 w-4 text-[#c8a548]" />
          <input type="text" value="3:00 PM" class="w-full border-none bg-transparent outline-none" />
        </div>
      </div>
    </div>

    <!-- Pickup Tabs -->
    <div class="mb-4 inline-flex gap-1">
      <button class="rounded border border-[#c8a548] px-5 py-2 text-[#c8a548] bg-white">
        Location
      </button>
      <button class="rounded border border-[#d9d9d9] px-5 py-2 text-[#666]">
        Airport
      </button>
    </div>

    <!-- Pickup Floating Label Location -->
    <div class="mb-5 relative mt-2">
      <label class="absolute -top-2 left-3 bg-white px-1 text-[11px] text-[#8a8a8a] z-10">
        Location
      </label>
      <div class="flex h-[52px] items-center justify-between rounded border border-[#d9d9d9] px-3">
        <div class="flex items-center">
          <Icon name="lucide:map-pin" class="mr-3 h-4 w-4 text-[#c8a548]" />
          <span class="text-[#444]">Clintons Bar &amp; Grille, High Street, Clinton, MA, USA</span>
        </div>
        <Icon name="lucide:chevron-down" class="h-4 w-4 text-[#666]" />
      </div>
    </div>

    <button class="text-[14px] text-[#c8a548]">+ Add a stop</button>
  </section>
</template>

<script setup lang="ts">
</script>
