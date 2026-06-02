<template>
  <section>
    <h2 class="mb-4 text-[16px] font-semibold text-[#222]">Contact Information</h2>

    <div class="mb-3 flex h-[52px] items-center rounded border border-[#d9d9d9] px-4">
      <span class="mr-3 text-lg">🇺🇸</span>
      <input value="+1 774 415 3244" class="w-full bg-transparent outline-none" />
    </div>

    <p class="mb-4 text-[13px] text-[#c8a548]">
      We don't have that phone number on file. Please provide additional contact information.
    </p>

    <div class="mb-3 grid grid-cols-2 gap-4">
      <!-- First Name -->
      <div class="relative mt-2">
        <label class="absolute -top-2 left-3 bg-white px-1 text-[11px] text-[#8a8a8a] z-10">First name</label>
        <div class="flex h-[52px] items-center rounded border border-[#d9d9d9] px-3">
          <Icon name="lucide:user" class="mr-3 h-4 w-4 text-[#c8a548]" />
          <input placeholder="First name" class="w-full outline-none placeholder:text-[#bbb]" />
        </div>
      </div>

      <!-- Last Name -->
      <div class="relative mt-2">
        <label class="absolute -top-2 left-3 bg-white px-1 text-[11px] text-[#8a8a8a] z-10">Last name</label>
        <div class="flex h-[52px] items-center rounded border border-[#d9d9d9] px-3">
          <Icon name="lucide:user" class="mr-3 h-4 w-4 text-[#c8a548]" />
          <input placeholder="Last name" class="w-full outline-none placeholder:text-[#bbb]" />
        </div>
      </div>
    </div>

    <!-- Email -->
    <div class="mb-4 relative mt-2">
      <label class="absolute -top-2 left-3 bg-white px-1 text-[11px] text-[#8a8a8a] z-10">Email</label>
      <div class="flex h-[52px] items-center rounded border border-[#d9d9d9] px-3">
        <Icon name="lucide:mail" class="mr-3 h-4 w-4 text-[#c8a548]" />
        <input placeholder="name@example.com" class="w-full outline-none placeholder:text-[#bbb]" />
      </div>
    </div>

    <div class="mb-6">
      <div class="mb-4 text-[15px] text-[#c8a548] font-medium">
        How many passengers are expected for the trip?
      </div>

      <!-- Passengers -->
      <div class="w-[190px] relative mt-2">
        <label class="absolute -top-2 left-3 bg-white px-1 text-[11px] text-[#8a8a8a] z-10"># Passengers</label>
        <div class="flex h-[52px] items-center rounded border border-[#d9d9d9] px-3">
          <Icon name="lucide:hash" class="mr-3 h-4 w-4 text-[#c8a548]" />
          <input value="1" class="w-full outline-none" />
        </div>
      </div>
    </div>

    <button class="h-[46px] w-full rounded bg-[#c8a548] font-semibold text-white transition hover:opacity-95">
      Continue
    </button>
  </section>
</template>

<script setup lang="ts">
</script>
