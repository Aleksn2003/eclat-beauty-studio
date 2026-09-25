<script setup>
import { computed, ref } from 'vue'
import { Motion, AnimatePresence } from 'motion-v'
import { MoveHorizontal, CalendarDays } from 'lucide-vue-next'
import { asset } from '../studio.config'
import { useReveal } from '../composables/useReveal'
const emit = defineEmits(['book'])
const { initial, visible, viewport, transition } = useReveal()
const activeCategory = ref('all')
const categories = [{ id: 'all', name: 'Все работы' }, { id: 'hair', name: 'Волосы' }, { id: 'skin', name: 'Лицо' }, { id: 'nails', name: 'Ногти' }, { id: 'brows', name: 'Брови' }]
// These are visual comparison DEMOS, not real client before/after claims.
// Replace before and after with a consented, matched client photo pair before launch.
const portfolio = [
  { id: 1, category: 'hair', title: 'Мягкость и характер', label: 'ОКРАШИВАНИЕ И УКЛАДКА', before: 'hair.jpg', after: 'hair.jpg', position: '50% 30%' },
  { id: 2, category: 'skin', title: 'Естественное сияние', label: 'УХОД ЗА ЛИЦОМ', before: 'portrait.jpg', after: 'portrait.jpg', position: '50% 35%' },
  { id: 3, category: 'nails', title: 'Завершающий штрих', label: 'МАНИКЮР И ПОКРЫТИЕ', before: 'nails.jpg', after: 'nails.jpg', position: '50% 50%' },
  { id: 4, category: 'brows', title: 'Мягкая выразительность', label: 'БРОВИ И РЕСНИЦЫ', before: 'makeup.jpg', after: 'makeup.jpg', position: '50% 40%' },
]
const visibleCards = computed(() => activeCategory.value === 'all' ? portfolio : portfolio.filter(item => item.category === activeCategory.value))
const comparisons = ref(Object.fromEntries(portfolio.map(item => [item.id, 48])))
function moveTab(event, index) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? categories.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + categories.length) % categories.length
  activeCategory.value = categories[next].id
  document.getElementById(`category-${categories[next].id}`)?.focus()
}
</script>

<template>
  <section id="portfolio" class="bg-[#faf8f4] py-16 md:py-20">
    <div class="container-shell">
      <Motion :initial="initial" :while-in-view="visible" :in-view-options="viewport" :transition="transition()" class="text-center"><p class="eyebrow mb-3 text-brand-600">БОЛЬШЕ ЕСТЕСТВЕННОСТИ</p><h2 class="heading">Маленькие перемены. <em class="font-normal text-brand-600">Заметная красота.</em></h2><p class="mx-auto mt-5 max-w-md text-[11px] leading-relaxed text-slate-500">Образы для вдохновения: естественные, индивидуальные, близкие вам.</p></Motion>
      <div role="tablist" aria-label="Фильтр портфолио по услуге" class="mx-auto mb-9 mt-7 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border border-[#e8e4dc] bg-white p-1.5">
        <button v-for="(category, index) in categories" :id="`category-${category.id}`" :key="category.id" role="tab" :aria-selected="activeCategory === category.id" aria-controls="portfolio-panel" :tabindex="activeCategory === category.id ? 0 : -1" class="rounded-full px-4 py-2 text-[10px] font-semibold transition-colors sm:px-6" :class="activeCategory === category.id ? 'bg-brand-600 text-white' : 'text-slate-500 hover:bg-brand-50'" @click="activeCategory = category.id" @keydown="moveTab($event, index)">{{ category.name }}</button>
      </div>
      <div id="portfolio-panel" role="tabpanel" :aria-labelledby="`category-${activeCategory}`" tabindex="0" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          <Motion v-for="card in visibleCards" :key="card.id" layout :initial="{ opacity: 0, y: 16 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0, scale: .98 }" :transition="{ duration: .25 }" class="min-w-0">
            <div class="comparison-frame group relative aspect-[1.02] overflow-hidden rounded-2xl bg-brand-100">
              <img draggable="false" :src="asset(card.after)" :alt="`${card.title}, иллюстративное фото`" :style="{ objectPosition: card.position }" loading="lazy" class="pointer-events-none absolute h-full w-full select-none object-cover" />
              <img draggable="false" :src="asset(card.before)" alt="То же стоковое фото с цветовым фильтром; это не результат процедуры" loading="lazy" class="pointer-events-none absolute h-full w-full select-none object-cover" :style="{ clipPath: `inset(0 ${100 - comparisons[card.id]}% 0 0)`, filter: 'saturate(.5) brightness(.86)', objectPosition: card.position }" />
              <div class="pointer-events-none absolute inset-y-0 w-[2px] bg-brand-200" :style="{ left: `${comparisons[card.id]}%` }"><span class="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center comparison-handle rounded-full border border-brand-200 bg-white text-brand-700 shadow-md"><MoveHorizontal :size="16" /></span></div>
              <span class="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[8px] font-semibold tracking-wider">ДО</span><span class="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[8px] font-semibold tracking-wider">ПОСЛЕ</span>
              <span class="absolute bottom-3 left-3 rounded-full bg-white/90 px-2 py-1 text-[8px] text-slate-600">Демо сравнения · не результат процедуры</span>
              <input v-model.number="comparisons[card.id]" type="range" min="3" max="97" :aria-label="`Сравнение до и после: ${card.title}`" class="comparison-range absolute inset-0 h-full w-full cursor-ew-resize" :aria-valuetext="`До: ${comparisons[card.id]}%, после: ${100 - comparisons[card.id]}%`" />
            </div>
            <div class="mt-5 flex items-center justify-between gap-3"><div><p class="text-[8px] font-semibold tracking-[.14em] text-brand-600">{{ card.label }}</p><h3 class="mt-1 font-display text-[24px]">{{ card.title }}</h3></div><button class="flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-brand-200 px-3 text-[10px] font-semibold text-brand-700 transition-colors hover:bg-brand-50" :aria-label="`Выбрать услугу: ${card.title}`" @click="emit('book', { service: card.category })"><CalendarDays :size="15" />Выбрать</button></div>
          </Motion>
        </AnimatePresence>
      </div>
      <p class="mt-6 text-center text-[9px] text-slate-500">Передвигайте ползунок для сравнения. Здесь одно фото с разной цветокоррекцией: это демонстрация интерфейса, а не результат процедуры.</p>
    </div>
  </section>
</template>

<style scoped>
.comparison-frame { user-select: none; }
.comparison-range { appearance: none; -webkit-appearance: none; margin: 0; padding: 0; border: 0; border-radius: inherit; background: transparent; color: transparent; outline: none; touch-action: pan-y; }
.comparison-range::-webkit-slider-runnable-track { height: 2px; background: transparent; border: none; }
.comparison-range::-webkit-slider-thumb { appearance: none; -webkit-appearance: none; width: 36px; height: 36px; margin-top: -17px; border: none; border-radius: 50%; background: transparent; box-shadow: none; }
.comparison-range::-moz-range-track, .comparison-range::-moz-range-progress { height: 2px; background: transparent; border: none; }
.comparison-range::-moz-range-thumb { width: 36px; height: 36px; border: none; background: transparent; box-shadow: none; }
.comparison-range:focus-visible { outline: 3px solid #946431; outline-offset: -5px; }
.comparison-frame:has(.comparison-range:focus-visible) .comparison-handle { box-shadow: 0 0 0 3px #946431, 0 0 0 6px #fff; }
</style>

