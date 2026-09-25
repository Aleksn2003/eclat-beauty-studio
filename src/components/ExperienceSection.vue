<script setup>
import { Motion } from 'motion-v'
import { Heart, Sparkles } from 'lucide-vue-next'
import { asset } from '../studio.config'
import { useReveal } from '../composables/useReveal'

const { initial, visible, viewport, transition } = useReveal()
</script>

<template>
  <section class="container-shell py-16 md:py-24" aria-labelledby="approach-title">
    <Motion :initial="initial" :while-in-view="visible" :in-view-options="viewport" :transition="transition()" class="mb-8">
      <p class="eyebrow mb-3 text-brand-600">ФИЛОСОФИЯ ÉCLAT</p>
      <h2 id="approach-title" class="heading">Красота в <em class="font-normal text-brand-600">вашем ритме.</em></h2>
    </Motion>
    <div class="grid gap-4 md:grid-cols-[1.15fr_.85fr]">
      <Motion :initial="initial" :while-in-view="visible" :in-view-options="viewport" :transition="transition(.04)" class="relative flex min-h-[330px] overflow-hidden rounded-[24px] bg-[#d8cbbb] text-white md:min-h-[460px]">
        <img :src="asset('approach-room.webp')" alt="Сгенерированная иллюстрация светлого интерьера для ухода за собой" loading="lazy" class="absolute inset-0 h-full w-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#211b16]/80 via-[#211b16]/20 to-transparent" aria-hidden="true"></div>
        <div class="relative mt-auto max-w-[470px] p-7 md:p-10">
          <p class="mb-3 text-[11px] font-semibold tracking-[.16em]">ВАШЕ ВРЕМЯ</p>
          <h3 class="font-display text-[38px] leading-[1.05] md:text-[48px]">Момент, в котором можно замедлиться.</h3>
          <p class="mt-4 text-[12px] leading-relaxed text-white/85">Место для ухода за собой и внимания к тому, что хочется именно вам.</p>
        </div>
        <span class="absolute right-4 top-4 rounded-full bg-white/85 px-2.5 py-1 text-[10px] text-ink">Иллюстрация · создано с ИИ</span>
      </Motion>
      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
        <Motion :initial="initial" :while-in-view="visible" :in-view-options="viewport" :transition="transition(.09)" class="flex min-h-[210px] flex-col justify-between rounded-[24px] bg-[#f4ece2] p-7 md:p-8">
          <Heart :size="24" :stroke-width="1.25" class="text-brand-600" aria-hidden="true" />
          <div><h3 class="font-display text-[30px] leading-none md:text-[36px]">Забота в деталях.</h3><p class="mt-3 max-w-[37ch] text-[12px] leading-[1.75] text-slate-600">Внимание к ощущениям, пожеланиям и маленьким вещам, из которых складывается визит.</p></div>
        </Motion>
        <Motion :initial="initial" :while-in-view="visible" :in-view-options="viewport" :transition="transition(.14)" class="flex min-h-[210px] flex-col justify-between rounded-[24px] bg-[#e8e5dc] p-7 md:p-8">
          <Sparkles :size="24" :stroke-width="1.25" class="text-brand-600" aria-hidden="true" />
          <div><h3 class="font-display text-[30px] leading-none md:text-[36px]">Быть собой — красиво.</h3><p class="mt-3 max-w-[37ch] text-[12px] leading-[1.75] text-slate-600">Уход, который поддерживает вашу естественность, а не задаёт чужой образ.</p></div>
        </Motion>
      </div>
    </div>
  </section>
</template>

