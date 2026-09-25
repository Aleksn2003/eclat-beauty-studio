<script setup>
import { Motion } from 'motion-v'
import { CalendarDays } from 'lucide-vue-next'
import { rituals, money, asset } from '../studio.config'
import { useReveal } from '../composables/useReveal'

const emit = defineEmits(['book'])
const { initial, visible, viewport, transition } = useReveal()
</script>

<template>
  <section id="services" class="border-y border-[#eeeae3] bg-[#faf8f4] py-16 md:py-24" aria-labelledby="services-title">
    <div class="container-shell">
      <Motion :initial="initial" :while-in-view="visible" :in-view-options="viewport" :transition="transition()" class="mb-9 flex flex-wrap items-end justify-between gap-5 md:mb-11">
        <div>
          <p class="eyebrow mb-3 text-brand-600">ИСКУССТВО ЗАБОТЫ</p>
          <h2 id="services-title" class="heading">Выберите время <em class="font-normal text-brand-600">для себя.</em></h2>
        </div>
        <p class="max-w-[315px] text-[12px] leading-[1.8] text-slate-600">Четыре направления ухода — начните с того, что откликается вам сегодня.</p>
      </Motion>

      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Motion v-for="(ritual, index) in rituals" :key="ritual.id" :initial="initial" :while-in-view="visible" :in-view-options="viewport" :transition="transition(index * .06)" class="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8e4dc] bg-white shadow-[0_14px_35px_-30px_rgba(39,43,41,.5)] transition-shadow hover:shadow-[0_22px_45px_-28px_rgba(39,43,41,.45)]">
          <div class="relative aspect-[5/3.6] overflow-hidden bg-brand-100">
            <img :src="asset(ritual.image)" :alt="`Иллюстративное фото: ${ritual.name.toLowerCase()}`" loading="lazy" class="editorial-photo h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-brand-700 backdrop-blur-sm">0{{ index + 1 }} / 04</span>
          </div>
          <div class="flex flex-1 flex-col px-5 pb-5 pt-6">
            <h3 class="font-display text-[32px] leading-[1.02]">{{ ritual.name }}</h3>
            <p class="mt-2 min-h-[2.5em] text-[12px] leading-relaxed text-slate-600">{{ ritual.subtitle }}</p>
            <div class="mt-auto flex flex-wrap items-end justify-between gap-2 pt-6">
              <div>
                <p class="text-[12px] text-slate-600">{{ ritual.duration }}</p>
                <p class="mt-1 text-[12px] text-slate-600">от <strong class="ml-1 text-[17px] font-semibold text-ink">{{ money(ritual.price) }}</strong></p>
              </div>
              <button type="button" class="flex min-h-11 items-center gap-2 rounded-lg border border-brand-200 px-3.5 text-[11px] font-semibold text-brand-700 transition-colors hover:bg-brand-50" :aria-label="`Выбрать: ${ritual.name}`" @click="emit('book', { service: ritual.id })"><CalendarDays :size="16" aria-hidden="true" />Выбрать</button>
            </div>
          </div>
        </Motion>
      </div>
      <p class="mt-6 text-center text-[12px] leading-relaxed text-slate-600">Иллюстративные фото · цены и длительность приведены для примера. <a href="#quiz" class="font-semibold text-brand-700 underline underline-offset-4">Помочь с выбором?</a></p>
    </div>
  </section>
</template>
