<template>
  <div class="location-field" :class="{ invalid }" ref="wrapperRef">
    <label class="floating-label">{{ label }}</label>
    <div class="location-input">
      <div class="location-value">
        <Icon :name="icon" class="field-icon" />
        <input
          ref="inputRef"
          type="text"
          :placeholder="placeholder"
          class="location-text"
          :value="modelValue"
          @input="onInput"
          @focus="showPredictions = true"
          @keydown.down.prevent="highlightNext"
          @keydown.up.prevent="highlightPrev"
          @keydown.enter.prevent="selectHighlighted"
          @keydown.escape="showPredictions = false"
        />
      </div>
      <Icon name="lucide:chevron-down" class="chevron" />
    </div>
    <p v-if="invalid && errorMsg" class="error-text">{{ errorMsg }}</p>

    <div v-if="showPredictions && predictions.length" class="predictions-dropdown">
      <div
        v-for="(p, i) in predictions"
        :key="p.place_id"
        class="prediction-item"
        :class="{ highlighted: i === highlightedIndex }"
        @click="selectPrediction(p)"
        @mouseenter="highlightedIndex = i"
      >
        <Icon name="lucide:map-pin" class="prediction-icon" />
        <div class="prediction-text">
          <span class="prediction-main">{{ p.structured_formatting?.main_text || p.description }}</span>
          <span class="prediction-secondary">{{ p.structured_formatting?.secondary_text || '' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  placeholder?: string
  label?: string
  icon?: string
  invalid?: boolean
  errorMsg?: string
  types?: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'place-changed': [lat: number, lng: number, address: string]
}>()

const inputRef = ref<HTMLInputElement>()
const wrapperRef = ref<HTMLElement>()
const predictions = ref<google.maps.places.AutocompletePrediction[]>([])
const showPredictions = ref(false)
const highlightedIndex = ref(-1)

let autocompleteService: google.maps.places.AutocompleteService | null = null
let debounceTimer: ReturnType<typeof setTimeout> | null = null

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)

  if (debounceTimer) clearTimeout(debounceTimer)
  if (!target.value.trim()) {
    predictions.value = []
    showPredictions.value = false
    return
  }

  debounceTimer = setTimeout(() => fetchPredictions(target.value), 300)
}

async function fetchPredictions(input: string) {
  if (!autocompleteService) return
  try {
    const resp = await autocompleteService.getPlacePredictions({
      input,
      types: props.types || ['address']
    })
    predictions.value = resp.predictions
    showPredictions.value = true
    highlightedIndex.value = -1
  } catch {
    // silently fail
  }
}

function highlightNext() {
  if (!predictions.value.length) return
  highlightedIndex.value = (highlightedIndex.value + 1) % predictions.value.length
}

function highlightPrev() {
  if (!predictions.value.length) return
  highlightedIndex.value = highlightedIndex.value <= 0
    ? predictions.value.length - 1
    : highlightedIndex.value - 1
}

function selectHighlighted() {
  if (highlightedIndex.value >= 0 && predictions.value[highlightedIndex.value]) {
    selectPrediction(predictions.value[highlightedIndex.value])
  }
}

async function selectPrediction(prediction: google.maps.places.AutocompletePrediction) {
  showPredictions.value = false
  emit('update:modelValue', prediction.description)

  const placesService = new google.maps.places.PlacesService(document.createElement('div'))
  placesService.getDetails({ placeId: prediction.place_id }, (place: any, status: any) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
      emit('place-changed', place.geometry.location.lat(), place.geometry.location.lng(), prediction.description)
    }
  })
}

onMounted(async () => {
  const { loadPlaces } = useGoogleMaps()
  try {
    await loadPlaces()
    autocompleteService = new google.maps.places.AutocompleteService()
  } catch {
    return
  }
})

function onClickOutside(e: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    showPredictions.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
.location-field {
  position: relative;
  margin-top: 8px;
  margin-bottom: 20px;
}

.location-field.invalid .location-input {
  border-color: #e53e3e;
}

.floating-label {
  position: absolute;
  top: -10px;
  left: 12px;
  background: #fff;
  padding: 0 4px;
  font-size: 13px;
  color: #8a8a8a;
  z-index: 10;
}

.location-input {
  display: flex;
  height: 52px;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 0 12px;
}

.location-value {
  display: flex;
  align-items: center;
  flex: 1;
}

.field-icon {
  width: 16px;
  height: 16px;
  color: #c8a548;
  margin-right: 12px;
  flex-shrink: 0;
}

.location-text {
  border: none;
  background: transparent;
  outline: none;
  color: #444;
  font-size: 15px;
  width: 100%;
}

.location-text::placeholder {
  color: #bbb;
}

.chevron {
  width: 16px;
  height: 16px;
  color: #666;
  flex-shrink: 0;
}

.error-text {
  margin-top: 6px;
  font-size: 13px;
  color: #e53e3e;
}

.predictions-dropdown {
  position: absolute;
  top: calc(100% - 16px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  z-index: 100;
  max-height: 240px;
  overflow-y: auto;
}

.prediction-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  cursor: pointer;
}

.prediction-item:hover,
.prediction-item.highlighted {
  background: #f5f5f5;
}

.prediction-icon {
  width: 14px;
  height: 14px;
  color: #c8a548;
  flex-shrink: 0;
}

.prediction-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.prediction-main {
  font-size: 14px;
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.prediction-secondary {
  font-size: 12px;
  color: #888;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
