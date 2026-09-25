<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { Motion, AnimatePresence } from 'motion-v'
import { MessageCircle, Menu, X } from 'lucide-vue-next'

const emit = defineEmits(['book', 'chat'])
const menuOpen = ref(false)
const activeHref = ref('')
const links = [
  { label: 'Услуги', href: '#services' },
  { label: 'Истории Éclat', href: '#stories' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Контакты', href: '#visit' },
]
function book() { menuOpen.value = false; emit('book') }
let frame = 0
function updateActive() {
  const topLimit = Math.max(125, window.innerHeight * .32)
  activeHref.value = links.find(({ href }) => {
    const rect = document.querySelector(href)?.getBoundingClientRect()
    return rect && rect.top <= topLimit && rect.bottom > 125
  })?.href || ''
}
function scheduleActiveUpdate() {
  if (frame) return
  frame = window.requestAnimationFrame(() => { frame = 0; updateActive() })
}
onMounted(() => {
  updateActive()
  window.addEventListener('scroll', scheduleActiveUpdate, { passive: true })
  window.addEventListener('resize', scheduleActiveUpdate)
})
onUnmounted(() => {
  window.removeEventListener('scroll', scheduleActiveUpdate)
  window.removeEventListener('resize', scheduleActiveUpdate)
  if (frame) window.cancelAnimationFrame(frame)
})
</script>

<template>
  <a class="fixed left-4 top-3 z-[100] -translate-y-24 rounded-lg bg-white px-5 py-3 shadow-lg focus:translate-y-0" href="#main">Перейти к содержимому</a>
  <header class="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
    <div class="pointer-events-auto mx-auto flex h-[68px] w-full max-w-[1240px] items-center justify-between gap-3 rounded-full border border-white/80 bg-white/92 px-4 shadow-[0_14px_40px_-20px_rgba(39,43,41,.4)] backdrop-blur-xl md:h-[74px] md:px-6">
      <a href="#" aria-label="Éclat — главная" class="flex shrink-0 flex-col items-center">
        <span class="font-display text-[31px] leading-none tracking-[.13em] md:text-[35px]">ÉCLAT<span class="ml-0.5 align-top text-[9px]">®</span></span>
        <span class="logo-subline mt-1 text-[8px] font-semibold tracking-[.32em]">КРАСОТА С ЗАБОТОЙ</span>
      </a>
      <nav aria-label="Основная навигация" class="hidden items-center gap-6 lg:flex">
        <a v-for="link in links" :key="link.href" :href="link.href" :aria-current="activeHref === link.href ? 'location' : undefined" class="border-b px-0.5 py-1 text-[12px] font-medium transition-colors hover:border-brand-600 hover:text-brand-700 focus-visible:border-brand-600" :class="activeHref === link.href ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-600'">{{ link.label }}</a>
      </nav>
      <div class="flex shrink-0 items-center gap-2">
        <button type="button" aria-label="Написать в студию" class="round-button hidden !h-10 !w-10 sm:flex" @click="emit('chat')"><MessageCircle :size="16" :stroke-width="1.5" /></button>
        <button type="button" class="btn-primary !rounded-full !px-5 !py-3.5 max-sm:!px-4" @click="book">Записаться</button>
        <button type="button" class="round-button !h-10 !w-10 lg:hidden" :aria-expanded="menuOpen" aria-controls="mobile-menu" :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'" @click="menuOpen = !menuOpen"><X v-if="menuOpen" :size="17" /><Menu v-else :size="17" /></button>
      </div>
    </div>
    <AnimatePresence>
      <Motion v-if="menuOpen" id="mobile-menu" :initial="{ opacity: 0, y: -8 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0, y: -8 }" class="pointer-events-auto mx-auto mt-2 w-full max-w-[1240px] overflow-hidden rounded-[22px] border border-white/80 bg-white/96 shadow-[0_18px_45px_-20px_rgba(39,43,41,.35)] backdrop-blur-xl lg:hidden">
        <nav aria-label="Мобильная навигация" class="flex flex-col gap-1 p-3">
          <a v-for="link in links" :key="link.href" :href="link.href" :aria-current="activeHref === link.href ? 'location' : undefined" class="rounded-xl px-4 py-3 text-[13px] hover:bg-brand-50" :class="activeHref === link.href ? 'bg-brand-50 font-semibold text-brand-700' : ''" @click="menuOpen = false">{{ link.label }}</a>
          <button type="button" class="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-[13px] hover:bg-brand-50" @click="menuOpen = false; emit('chat')"><MessageCircle :size="16" /> Написать нам</button>
        </nav>
      </Motion>
    </AnimatePresence>
  </header>
</template>
