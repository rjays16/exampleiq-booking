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
      <h1
        class="mb-6 text-[40px] font-normal text-[#232323]"
      >
        Let's get you on your way!
      </h1>

      <!-- Trip Type -->
      <div
        class="mb-8 flex h-[46px] overflow-hidden rounded-md border border-[#d8d8d8]"
      >
        <button
          class="flex flex-1 items-center justify-center gap-2 border border-[#c8a548] bg-[#fffdf7] font-medium text-[#c8a548]"
        >
          <Icon
            name="lucide:arrow-right-circle"
            class="h-4 w-4"
          />
          One-way
        </button>

        <button
          class="flex flex-1 items-center justify-center gap-2 text-[#666]"
        >
          <Icon
            name="lucide:hourglass"
            class="h-4 w-4"
          />
          Hourly
        </button>
      </div>

      <!-- Pickup -->
      <section class="mb-10">
        <h2
          class="mb-4 text-[16px] font-semibold text-[#222]"
        >
          Pickup
        </h2>

        <div class="mb-4 flex gap-3">
          <div
            class="flex h-[70px] flex-1 items-center rounded border border-[#d9d9d9] px-4"
          >
            <Icon
              name="lucide:calendar"
              class="mr-3 h-4 w-4 text-[#c8a548]"
            />

            <input
              type="text"
              value="05/13/2023"
              class="w-full border-none bg-transparent outline-none"
            />
          </div>

          <div
            class="flex w-[170px] items-center rounded border border-[#d9d9d9] px-4"
          >
            <Icon
              name="lucide:clock-3"
              class="mr-3 h-4 w-4 text-[#c8a548]"
            />

            <input
              type="text"
              value="3:00 PM"
              class="w-full border-none bg-transparent outline-none"
            />
          </div>
        </div>

        <!-- Pickup Tabs -->
        <div class="mb-3 inline-flex">
          <button
            class="rounded-l-md border border-[#c8a548] bg-[#fffdf7] px-5 py-2 text-[#c8a548]"
          >
            Location
          </button>

          <button
            class="rounded-r-md border border-l-0 border-[#d9d9d9] px-5 py-2 text-[#666]"
          >
            Airport
          </button>
        </div>

        <div class="mb-5">
          <label
            class="mb-1 ml-3 block text-[12px] text-[#8a8a8a]"
          >
            Location
          </label>

          <div
            class="flex h-[52px] items-center justify-between rounded border border-[#d9d9d9] px-3"
          >
            <div class="flex items-center">
              <Icon
                name="lucide:map-pin"
                class="mr-3 h-4 w-4 text-[#c8a548]"
              />

              <span class="text-[#444]">
                Clintons Bar &amp; Grille, High Street,
                Clinton, MA, USA
              </span>
            </div>

            <Icon
              name="lucide:chevron-down"
              class="h-4 w-4 text-[#666]"
            />
          </div>
        </div>

        <button
          class="text-[14px] text-[#c8a548]"
        >
          + Add a stop
        </button>
      </section>

      <!-- Dropoff -->
      <section class="mb-10">
        <h2
          class="mb-4 text-[16px] font-semibold text-[#222]"
        >
          Drop off
        </h2>

        <div class="mb-3 inline-flex">
          <button
            class="rounded-l-md border border-[#c8a548] bg-[#fffdf7] px-5 py-2 text-[#c8a548]"
          >
            Location
          </button>

          <button
            class="rounded-r-md border border-l-0 border-[#d9d9d9] px-5 py-2 text-[#666]"
          >
            Airport
          </button>
        </div>

        <div>
          <label
            class="mb-1 ml-3 block text-[12px] text-[#8a8a8a]"
          >
            Location
          </label>

          <div
            class="flex h-[52px] items-center justify-between rounded border border-[#d9d9d9] px-3"
          >
            <div class="flex items-center">
              <Icon
                name="lucide:map-pin"
                class="mr-3 h-4 w-4 text-[#c8a548]"
              />

              <span class="text-[#444]">
                Logan Airport Terminal B, Boston, MA,
                USA
              </span>
            </div>

            <Icon
              name="lucide:chevron-down"
              class="h-4 w-4 text-[#666]"
            />
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section>
        <h2
          class="mb-4 text-[16px] font-semibold text-[#222]"
        >
          Contact Information
        </h2>

        <div
          class="mb-3 flex h-[44px] items-center rounded border border-[#d9d9d9] px-4"
        >
          <span class="mr-4 text-lg">🇺🇸</span>

          <input
            value="+1 774 415 3244"
            class="w-full bg-transparent outline-none"
          />
        </div>

        <p
          class="mb-4 text-[13px] text-[#666]"
        >
          We don't have that phone number on file.
          Please provide additional contact
          information.
        </p>

        <div class="mb-3 grid grid-cols-2 gap-4">
          <div>
            <label
              class="mb-1 block text-[12px] text-[#777]"
            >
              First name
            </label>

            <div
              class="flex h-[40px] items-center rounded border border-[#d9d9d9] px-3"
            >
              <Icon
                name="lucide:user"
                class="mr-3 h-4 w-4 text-[#c8a548]"
              />

              <input
                placeholder="First name"
                class="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label
              class="mb-1 block text-[12px] text-[#777]"
            >
              Last name
            </label>

            <div
              class="flex h-[40px] items-center rounded border border-[#d9d9d9] px-3"
            >
              <Icon
                name="lucide:user"
                class="mr-3 h-4 w-4 text-[#c8a548]"
              />

              <input
                placeholder="Last name"
                class="w-full outline-none"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label
            class="mb-1 block text-[12px] text-[#777]"
          >
            Email
          </label>

          <div
            class="flex h-[40px] items-center rounded border border-[#d9d9d9] px-3"
          >
            <Icon
              name="lucide:mail"
              class="mr-3 h-4 w-4 text-[#c8a548]"
            />

            <input
              placeholder="name@example.com"
              class="w-full outline-none"
            />
          </div>
        </div>

        <div class="mb-6">
          <div
            class="mb-3 text-[15px] text-[#333]"
          >
            How many passengers are expected for
            the trip?
          </div>

          <div class="w-[190px]">
            <label
              class="mb-1 block text-[12px] text-[#777]"
            >
              # Passengers
            </label>

            <div
              class="flex h-[40px] items-center rounded border border-[#d9d9d9] px-3"
            >
              <Icon
                name="lucide:hash"
                class="mr-3 h-4 w-4 text-[#c8a548]"
              />

              <input
                value="1"
                class="w-full outline-none"
              />
            </div>
          </div>
        </div>

        <button
          class="h-[46px] w-full rounded bg-[#c8a548] font-semibold text-white transition hover:opacity-95"
        >
          Continue
        </button>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
</script>