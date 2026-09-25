<script setup>
import { Motion } from 'motion-v'
import { Sparkles, Star } from 'lucide-vue-next'
import { asset } from '../studio.config'
import { useReveal } from '../composables/useReveal'
const emit = defineEmits(['book'])
const { initial, visible, transition, reducedMotion } = useReveal()
</script>

<template>
  <section class="overflow-hidden bg-[#faf8f4]">
    <div class="hero-scene relative isolate">
      <img :src="asset('hero-salon-wide.webp')" alt="Светлый интерьер салона с креслом и зеркалом в золотистой раме — сгенерированная иллюстрация" class="hero-image absolute inset-0 -z-20 h-full w-full object-cover" fetchpriority="high" width="1672" height="941" />
      <div class="hero-veil absolute inset-0 -z-10" aria-hidden="true"></div>
      <div class="container-shell hero-content relative flex flex-col justify-center">
        <Motion :initial="initial" :animate="visible" :transition="transition()" class="hero-copy max-w-[600px]">
          <div class="eyebrow mb-6 text-brand-700">КРАСОТА В КАЖДОМ ДНЕ</div>
          <h1 class="font-display text-[48px] font-normal leading-[.98] tracking-[-.035em] sm:text-[64px] lg:text-[82px]">Время для себя.<br />Только <em class="font-normal text-brand-600">ваше.</em></h1>
          <p class="mt-7 max-w-[365px] text-[13px] leading-[1.9] text-slate-600">Больше, чем уход за собой. Возможность замедлиться, почувствовать заботу и вернуться к себе.</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <button class="btn-primary" @click="emit('book')">Выбрать время</button>
            <a href="#services" class="btn-secondary !bg-white/70 backdrop-blur-sm">Смотреть услуги</a>
          </div>
          <aside aria-label="Примеры отзывов" class="mt-5 w-fit max-w-[340px] rounded-xl border border-white/80 bg-white/75 px-3 py-2.5 backdrop-blur-sm">
            <div class="flex items-center gap-2.5">
              <div class="flex -space-x-2" aria-hidden="true"><img v-for="photo in ['portrait.webp', 'hair.webp', 'makeup.webp']" :key="photo" :src="asset(photo)" alt="" class="h-7 w-7 rounded-full border-2 border-white object-cover" /></div>
              <div><p class="text-[10px] font-semibold text-brand-700">Ваша красота — ваш ритм</p><div class="mt-1 flex items-center gap-1 text-brand-600"><Star v-for="n in 5" :key="n" :size="9" fill="currentColor" aria-hidden="true" /><span class="ml-1 text-[8px] text-slate-500">Примеры отзывов</span></div></div>
            </div>
            <p class="mt-2 text-[9px] leading-relaxed text-slate-600">«Бережный уход» · «Красиво и без спешки»</p>
            <p class="mt-0.5 text-[8px] leading-relaxed text-slate-500">Демо · отзывы из 2ГИС не подключены</p>
          </aside>
        </Motion>
        <Motion :animate="reducedMotion ? {} : { y: [0, -3, 0] }" :transition="{ duration: 5, repeat: Infinity, ease: 'easeInOut' }" class="hero-offer absolute rounded-2xl border border-white/80 bg-white/80 px-4 py-3 text-brand-700 shadow-sm backdrop-blur-md">
          <a href="#quiz" class="flex min-h-11 items-center gap-3" aria-label="Пример акции: скидка 15%, перейти к тесту"><Sparkles :size="18" :stroke-width="1.3" /><span><span class="block font-display text-[28px] leading-none">−15% для себя</span><span class="mt-2 block text-[9px] font-semibold tracking-[.1em]">ПРИМЕР АКЦИИ · ПРОЙТИ ТЕСТ</span></span></a>
        </Motion>
        <span class="absolute bottom-3 right-0 rounded-full bg-white/70 px-3 py-1 text-[9px] text-slate-600">Иллюстрация интерьера · создано с ИИ</span>
      </div>
    </div>
  </section>
</template>



<style scoped>
.hero-scene, .hero-content { min-height: 660px; }
.hero-content { padding-block: 170px 110px; }
.hero-image { object-position: center 56%; }
.hero-veil { background: linear-gradient(90deg, rgba(250,248,244,.85) 0%, rgba(250,248,244,.66) 34%, rgba(250,248,244,.08) 65%, transparent 100%); }
.hero-offer { right: 0; bottom: 64px; }
@media (min-width: 1600px) { .hero-scene, .hero-content { min-height: 720px; } }
@media (max-width: 767px) {
  .hero-scene, .hero-content { min-height: 790px; }
  .hero-content { justify-content: flex-start; padding-block: 136px 310px; }
  .hero-image { object-position: 73% center; }
  .hero-veil { background: linear-gradient(180deg, rgba(250,248,244,.98) 0%, rgba(250,248,244,.93) 35%, rgba(250,248,244,.55) 56%, rgba(250,248,244,0) 76%); }
  .hero-offer { left: 0; right: auto; bottom: 52px; padding: 12px 14px; }
}
@media (max-width: 359px) { .hero-copy h1 { font-size: 43px; } }
</style>

