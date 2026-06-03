# ExampleIQ Booking

A ride-booking form UI for a chauffeur management system, built with Nuxt 4.

## Features

- Trip type selection — One-way or Hourly booking toggle
- Pickup section — Date/time picker, Google Places autocomplete for addresses and airports, dynamic stops with autocomplete
- Dropoff section — Location or Airport tab with Places autocomplete (hidden for Hourly)
- Distance & Travel Time — Google Maps Distance Matrix API with multi-stop route support
- Hourly booking — Number-of-hours input, shown only when Hourly is selected
- Contact section — Phone input with localStorage lookup (recognizes returning customers by name)
- Form validation — Required field checks on Continue click with error messages
- Mock API endpoint — Submits booking data to a server route, returns a booking ID
- Responsive — Adapts to desktop, tablet, and mobile viewports

## Setup

Requires **Node.js v22+**

** bash **
npm install

Copy .env.example to .env and add Google Maps API key:

NUXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here

## Development

** bash **
npm run dev

Open http://localhost:3000

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
app/
  components/
    BookingForm.vue            — Logo, trip type toggle
    BookingConfirmed.vue       — Success confirmation card
    ContactSection.vue         — Phone, name, email, passengers
    DatePicker.vue             — Custom calendar dropdown
    DropoffSection.vue         — Drop-off location/airport
    HourlySection.vue          — Hours stepper
    LocationAutocomplete.vue   — Google Places autocomplete
    PickupSection.vue          — Pickup date/time, location/airport, stops
    TimePicker.vue             — Custom time selector
    TripSummary.vue            — Distance + travel time display
  composables/
    useGoogleMaps.ts           — Google Maps API loader
  pages/
    index.vue                  — Main page, assembles all sections
server/
  api/
    submit-booking.post.ts     — Mock booking submission endpoint
```
