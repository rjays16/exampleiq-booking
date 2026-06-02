<template>
  <section class="mb-10">
    <h2 class="mb-4 text-[16px] font-semibold text-[#222]">Drop off</h2>

    <div class="mb-4 inline-flex gap-1">
      <button class="rounded border border-[#c8a548] px-5 py-2 text-[#c8a548] bg-white">
        Location
      </button>
      <button class="rounded border border-[#d9d9d9] px-5 py-2 text-[#666]">
        Airport
      </button>
    </div>

    <!-- Dropoff Floating Label Location -->
    <div class="relative mt-2">
      <label class="absolute -top-2 left-3 bg-white px-1 text-[11px] text-[#8a8a8a] z-10">
        Location
      </label>
      <div class="flex h-[52px] items-center justify-between rounded border border-[#d9d9d9] px-3">
        <div class="flex items-center">
          <Icon name="lucide:map-pin" class="mr-3 h-4 w-4 text-[#c8a548]" />
          <span class="text-[#444]">Logan Airport Terminal B, Boston, MA, USA</span>
        </div>
        <Icon name="lucide:chevron-down" class="h-4 w-4 text-[#666]" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
