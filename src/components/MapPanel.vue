<script setup>
import { computed, ref } from 'vue'
import { MapPin, ArrowUpRight } from 'lucide-vue-next'
import { studio } from '../studio.config'
const helpOpen = ref(false)
const mapUrl = computed(() => {
  try { const url = new URL(studio.map.url); return url.protocol === 'https:' && (url.hostname === '2gis.ru' || url.hostname.endsWith('.2gis.ru')) ? url.href : '' } catch { return '' }
})
</script>

<template>
  <div class="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-[#efede7] bg-white px-6 py-14 text-center md:min-h-[360px]">
    <span class="flex h-16 w-16 items-center justify-center rounded-full border border-brand-200 bg-brand-50 text-brand-600"><MapPin :size="26" /></span>
    <p class="mt-6 font-display text-[28px]">Ваш маршрут в Éclat</p>
    <p class="mt-2 max-w-[30ch] text-[13px] leading-relaxed text-slate-500">{{ mapUrl ? 'Посмотрите расположение студии и постройте маршрут в 2ГИС.' : 'Здесь появится карта 2ГИС с подтверждённым адресом студии.' }}</p>
    <p class="eyebrow mt-6 rounded-full border border-brand-100 px-3.5 py-1.5 !text-[10px] text-slate-500">2ГИС · {{ mapUrl ? 'Маршрут до студии' : 'Адрес пока не подтверждён' }}</p>
    <a v-if="mapUrl" :href="mapUrl" target="_blank" rel="noopener noreferrer" class="btn-secondary mt-7">Открыть в 2ГИС <ArrowUpRight :size="15" /></a>
    <button v-else class="btn-secondary mt-7" :aria-expanded="helpOpen" aria-controls="map-help" @click="helpOpen = !helpOpen">О карте</button>
    <p v-if="helpOpen" id="map-help" class="mt-4 max-w-[40ch] text-[11px] leading-relaxed text-slate-500">Это демонстрационная страница. Настоящий адрес и карточка студии в 2ГИС ещё не предоставлены. Пример адреса рядом не обозначает реальное расположение студии.</p>
  </div>
</template>
