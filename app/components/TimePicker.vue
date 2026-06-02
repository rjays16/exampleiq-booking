<template>
  <div class="tp-wrapper" ref="wrapperRef">
    <div class="tp-trigger" :class="{ invalid }" @click="open = !open">
      <Icon name="lucide:clock-3" class="tp-icon" />
      <span v-if="modelValue" class="tp-value">{{ modelValue }}</span>
      <span v-else class="tp-placeholder">{{ placeholder }}</span>
    </div>

    <div v-if="open" class="tp-dropdown">
      <div
        v-for="t in times"
        :key="t"
        class="tp-option"
        :class="{ 'tp-option-selected': t === modelValue }"
        @click="selectTime(t)"
      >
        {{ t }}
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
const wrapperRef = ref<HTMLElement>()

const times = computed(() => {
  const list: string[] = []
  for (let h = 0; h < 24; h++) {
    for (const m of ['00', '15', '30', '45']) {
      const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h
      const ampm = h < 12 ? 'AM' : 'PM'
      list.push(`${hour12}:${m} ${ampm}`)
    }
  }
  return list
})

function selectTime(t: string) {
  emit('update:modelValue', t)
  open.value = false
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
.tp-wrapper {
  position: relative;
}

.tp-trigger {
  display: flex;
  align-items: center;
  padding: 0 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  height: 52px;
  transition: border-color 0.15s;
}

.tp-trigger.invalid {
  border-color: #e53e3e;
}

.tp-icon {
  width: 16px;
  height: 16px;
  color: #c8a548;
  margin-right: 12px;
  flex-shrink: 0;
}

.tp-value {
  font-size: 14px;
  color: #222;
}

.tp-placeholder {
  font-size: 14px;
  color: #999;
}

.tp-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 180px;
  max-height: 240px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  z-index: 50;
}

.tp-option {
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  color: #222;
}

.tp-option:hover {
  background: #f5f5f5;
}

.tp-option-selected {
  background: #c8a548;
  color: #fff;
}

.tp-option-selected:hover {
  background: #b8942f;
}
</style>
