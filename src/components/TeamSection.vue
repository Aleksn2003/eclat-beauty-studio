<script setup>
import { Motion } from 'motion-v'
import { CalendarDays, ExternalLink } from 'lucide-vue-next'
import { asset } from '../studio.config'
import { useReveal } from '../composables/useReveal'

const emit = defineEmits(['book'])
const { initial, visible, viewport, transition } = useReveal()

// Example profiles. Add only verified certificates with public URLs or local files.
const team = [
  {
    name: 'Анна', specialty: 'Стилист по волосам',
    bio: 'Начинает с разговора о ваших привычках: как вы укладываете волосы и чего ждёте от перемен. Ей близки мягкие формы и цвет, который легко поддерживать в повседневном ритме.',
    focus: ['Стрижки', 'Укладки', 'Окрашивание'], image: 'hair.jpg', position: '50% 30%', service: 'hair', credentials: [],
  },
  {
    name: 'Мария', specialty: 'Специалист по уходу за лицом',
    bio: 'Ставит на первое место комфорт и внимательное отношение к состоянию кожи. Объясняет этапы ухода простыми словами и помогает выбрать спокойный ритуал без лишней спешки.',
    focus: ['Уход', 'Увлажнение', 'Комфорт кожи'], image: 'portrait.jpg', position: '50% 62%', service: 'skin', credentials: [],
  },
  {
    name: 'Елена', specialty: 'Мастер бровей и ресниц',
    bio: 'Любит естественные акценты, которые поддерживают черты лица. Перед началом обсуждает желаемую форму и выразительность, чтобы результат был близок вашему привычному образу.',
    focus: ['Форма', 'Цвет', 'Ресницы'], image: 'makeup.jpg', position: '50% 35%', service: 'brows', credentials: [],
  },
]
</script>

<template>
  <section id="team" class="border-t border-[#eeeae3] bg-[#faf8f4] py-16 md:py-24" aria-labelledby="team-title">
    <div class="container-shell">
      <Motion :initial="initial" :while-in-view="visible" :in-view-options="viewport" :transition="transition()" class="mb-9 flex flex-wrap items-end justify-between gap-5 md:mb-11">
        <div><p class="eyebrow mb-3 text-brand-600">ЗАБОТА В ЛИЦАХ</p><h2 id="team-title" class="heading">Наши <em class="font-normal text-brand-600">мастера.</em></h2></div>
        <p class="max-w-[370px] text-[12px] leading-[1.8] text-slate-600">Профили демонстрационные: имена, специализации и биографии вымышлены, фотографии — иллюстративные. Подтверждённые дипломы и сертификаты пока не предоставлены.</p>
      </Motion>
      <div class="grid gap-5">
        <Motion v-for="(person, index) in team" :key="person.name" :initial="initial" :while-in-view="visible" :in-view-options="viewport" :transition="transition(index * .06)" class="flex flex-col overflow-hidden rounded-[24px] border border-[#e8e4dc] bg-white shadow-[0_16px_34px_-30px_rgba(39,43,41,.4)] md:min-h-[315px] md:flex-row">
          <div class="relative h-[250px] w-full shrink-0 bg-brand-100 md:h-auto md:w-[38%]" :class="{ 'md:order-2': index % 2 === 1 }">
            <img :src="asset(person.image)" :alt="`Иллюстративный портрет для демопрофиля ${person.name}`" :style="{ objectPosition: person.position }" loading="lazy" class="editorial-photo absolute inset-0 h-full w-full object-cover" />
            <span class="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-brand-700 backdrop-blur-sm">0{{ index + 1 }} / 03</span>
          </div>
          <div class="flex min-w-0 flex-1 flex-col p-6 sm:p-8 md:p-9" :class="{ 'md:order-1': index % 2 === 1 }">
            <p class="eyebrow mb-3 text-brand-600">{{ person.specialty }}</p>
            <h3 class="font-display text-[42px] leading-none md:text-[48px]">{{ person.name }}</h3>
            <p class="mt-5 max-w-[58ch] text-[13px] leading-[1.85] text-slate-600">{{ person.bio }}</p>
            <div class="mt-5 flex flex-wrap gap-2" aria-label="Направления работы">
              <span v-for="item in person.focus" :key="item" class="rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[11px] text-brand-700">{{ item }}</span>
            </div>
            <div v-if="person.credentials.length" class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
              <span class="font-semibold text-ink">Обучение и сертификаты</span>
              <a v-for="document in person.credentials" :key="document.title" :href="document.url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-brand-700 underline underline-offset-4">{{ document.title }} <ExternalLink :size="12" aria-hidden="true" /></a>
            </div>
            <div class="mt-auto flex items-center justify-between gap-4 border-t border-[#eeeae3] pt-4 max-md:mt-6">
              <span class="text-[10px] text-slate-500">Демо-профиль</span>
              <button type="button" class="inline-flex min-h-11 items-center gap-2 text-[11px] font-semibold text-brand-700 transition-colors hover:text-brand-600" :aria-label="`Посмотреть форму: ${person.specialty}`" @click="emit('book', { service: person.service })"><CalendarDays :size="16" aria-hidden="true" />Выбрать услугу</button>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>
