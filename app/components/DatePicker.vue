<template>
  <div class="dp-wrapper" ref="wrapperRef">
    <div class="dp-trigger" :class="{ invalid }" @click="open = !open">
      <Icon name="lucide:calendar" class="dp-icon" />
      <span v-if="modelValue" class="dp-value">{{ modelValue }}</span>
      <span v-else class="dp-placeholder">{{ placeholder }}</span>
    </div>

    <div v-if="open" class="dp-dropdown">
      <div class="dp-header">
        <button class="dp-nav" @click="prevMonth">&lsaquo;</button>
        <span class="dp-label">{{ monthLabel }} {{ yearLabel }}</span>
        <button class="dp-nav" @click="nextMonth">&rsaquo;</button>
      </div>
      <div class="dp-weekdays">
        <span v-for="d in weekdays" :key="d" class="dp-weekday">{{ d }}</span>
      </div>
      <div class="dp-grid">
        <span v-for="(day, i) in days" :key="i" class="dp-day" :class="dayClasses(day)" @click="selectDay(day)">
          {{ day?.value ?? '' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  placeholder?: string
  invalid?: boolean
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const open = ref(false)
const viewMonth = ref(new Date().getMonth())
const viewYear = ref(new Date().getFullYear())
const wrapperRef = ref<HTMLElement>()

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const monthLabel = computed(() => {
  const names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return names[viewMonth.value]
})

const yearLabel = computed(() => String(viewYear.value))

interface Day { value: number; month: number; year: number }

const days = computed(() => {
  const first = new Date(viewYear.value, viewMonth.value, 1).getDay()
  const total = new Date(viewYear.value, viewMonth.value + 1, 0).getDate()
  const prevTotal = new Date(viewYear.value, viewMonth.value, 0).getDate()
  const result: (Day | null)[] = []
  for (let i = first - 1; i >= 0; i--) {
    result.push({ value: prevTotal - i, month: viewMonth.value - 1, year: viewYear.value })
  }
  for (let i = 1; i <= total; i++) {
    result.push({ value: i, month: viewMonth.value, year: viewYear.value })
  }
  while (result.length % 7 !== 0) {
    const next = result.length - first - total + 1
    result.push({ value: next, month: viewMonth.value + 1, year: viewYear.value })
  }
  return result
})

function prevMonth() {
  if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- }
  else { viewMonth.value-- }
}

function nextMonth() {
  if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ }
  else { viewMonth.value++ }
}

function pad(n: number) { return String(n).padStart(2, '0') }

function selectDay(day: Day | null) {
  if (!day || day.month !== viewMonth.value) return
  emit('update:modelValue', `${pad(day.month + 1)}/${pad(day.value)}/${day.year}`)
  open.value = false
}

function dayClasses(day: Day | null) {
  if (!day) return []
  const cls: string[] = []
  if (day.month !== viewMonth.value) cls.push('dp-day-other')
  const fmt = `${pad(day.month + 1)}/${pad(day.value)}/${day.year}`
  if (day.month === viewMonth.value && fmt === props.modelValue) cls.push('dp-day-selected')
  return cls
}

onMounted(() => {
  function handleClick(e: MouseEvent) {
    if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
      open.value = false
    }
  }
  document.addEventListener('click', handleClick)
  onUnmounted(() => document.removeEventListener('click', handleClick))
})
</script>

<style scoped>
.dp-wrapper {
  position: relative;
}

.dp-trigger {
  display: flex;
  align-items: center;
  padding: 0 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  height: 52px;
  transition: border-color 0.15s;
}

.dp-trigger.invalid {
  border-color: #e53e3e;
}

.dp-icon {
  width: 16px;
  height: 16px;
  color: #c8a548;
  margin-right: 12px;
  flex-shrink: 0;
}

.dp-value {
  font-size: 14px;
  color: #222;
}

.dp-placeholder {
  font-size: 14px;
  color: #999;
}

.dp-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 280px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  padding: 12px;
  z-index: 50;
}

.dp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.dp-nav {
  background: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 16px;
  color: #444;
}

.dp-nav:hover {
  background: #f5f5f5;
}

.dp-label {
  font-size: 14px;
  font-weight: 600;
  color: #222;
}

.dp-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 4px;
}

.dp-weekday {
  font-size: 12px;
  font-weight: 600;
  color: #888;
  padding: 4px 0;
}

.dp-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 2px;
}

.dp-day {
  font-size: 13px;
  padding: 6px 0;
  border-radius: 4px;
  cursor: pointer;
  color: #222;
}

.dp-day:hover {
  background: #f0f0f0;
}

.dp-day-other {
  color: #ccc;
}

.dp-day-selected {
  background: #c8a548;
  color: #fff;
}

.dp-day-selected:hover {
  background: #b8942f;
}
</style>
