<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { Motion } from 'motion-v'
import { X } from 'lucide-vue-next'
const props = defineProps({ open: Boolean, title: { type: String, required: true } })
const emit = defineEmits(['close'])
const dialog = ref(null)
let previousFocus = null
let previousOverflow = ''
let scrollLocked = false
function unlockScroll() { if (scrollLocked) { document.body.style.overflow = previousOverflow; scrollLocked = false } }
watch(() => props.open, async (open) => {
  await nextTick()
  if (!dialog.value) return
  if (open && !dialog.value.open) {
    previousFocus = document.activeElement
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    scrollLocked = true
    dialog.value.showModal() // Native dialog gives focus trapping, inert background and Escape support.
    await nextTick()
    dialog.value.querySelector('[autofocus], input, button')?.focus()
  } else if (!open && dialog.value.open) {
    dialog.value.close()
    unlockScroll()
    if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true })
  }
}, { immediate: true })
function backdrop(event) { if (event.target === dialog.value) emit('close') }
onBeforeUnmount(() => { dialog.value?.close(); unlockScroll() })
</script>

<template>
  <dialog ref="dialog" :aria-label="title" class="m-auto max-h-[90dvh] w-[calc(100%-32px)] max-w-[530px] overflow-y-auto rounded-2xl border border-brand-100 bg-white p-0 text-ink shadow-2xl backdrop:bg-slate-900/30 backdrop:backdrop-blur-sm" @cancel.prevent="emit('close')" @click="backdrop">
    <Motion v-if="open" :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: .22 }" class="relative p-7 sm:p-9">
      <button class="round-button absolute right-4 top-4 z-10 !h-8 !w-8" aria-label="Закрыть окно" @click="emit('close')"><X :size="15" /></button>
      <slot />
    </Motion>
  </dialog>
</template>
