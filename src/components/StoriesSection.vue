<script setup>
import { ref } from 'vue'
import { Motion } from 'motion-v'
import { ArrowLeft, ArrowRight, Play, Film } from 'lucide-vue-next'
import { stories, asset } from '../studio.config'
import { useReveal } from '../composables/useReveal'
const emit = defineEmits(['story'])
const track = ref(null)
const { initial, visible, viewport, transition, reducedMotion } = useReveal()
function scroll(direction) { track.value?.scrollBy({ left: direction * 280, behavior: reducedMotion.value ? 'instant' : 'smooth' }) }
</script>

<template>
  <section id="stories" class="container-shell py-16 md:py-20">
    <Motion :initial="initial" :while-in-view="visible" :in-view-options="viewport" :transition="transition()" class="mb-8 flex items-end justify-between gap-4">
      <div><p class="eyebrow mb-3 text-brand-600">КРАСОТА ЗА КАДРОМ</p><h2 class="heading">Моменты <em class="font-normal text-brand-600">Éclat.</em></h2></div>
      <div class="flex items-center gap-2"><span class="mr-5 hidden text-[11px] text-slate-500 md:block">Маленькие моменты большой заботы.</span><button class="round-button" aria-label="Предыдущие истории" @click="scroll(-1)"><ArrowLeft :size="16" /></button><button class="round-button" aria-label="Следующие истории" @click="scroll(1)"><ArrowRight :size="16" /></button></div>
    </Motion>
    <div ref="track" tabindex="0" role="region" aria-label="Истории студии: листайте по горизонтали" class="hide-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4 pt-1">
      <Motion v-for="(story, index) in stories" :key="story.id" :initial="initial" :while-in-view="visible" :in-view-options="viewport" :transition="transition(index * .06)" class="group w-[210px] shrink-0 snap-start md:w-[calc((100%-64px)/5)] md:min-w-[175px]">
        <button :aria-label="`Открыть ${story.title}: ${story.videoSrc ? 'видео' : 'фотопревью'}`" class="relative block aspect-[3/4.05] w-full overflow-hidden rounded-2xl bg-brand-100 text-left" @click="emit('story', story)">
          <img :src="asset(story.image)" :alt="story.title" loading="lazy" class="editorial-photo h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span class="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[8px] font-semibold tracking-wide text-ink backdrop-blur">{{ story.videoSrc ? story.duration : 'ФОТОПРЕВЬЮ' }}</span>
          <span class="absolute bottom-3.5 right-3.5 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/90 text-ink shadow-sm backdrop-blur transition-transform group-hover:scale-110"><Play :size="14" fill="currentColor" :stroke-width="1" class="ml-0.5" /></span>
        </button>
        <p class="mt-4 text-[8px] font-semibold tracking-[.14em] text-brand-600">{{ story.category }}</p><h3 class="mt-1 font-display text-[23px]">{{ story.title }}</h3>
      </Motion>
    </div>
    <p class="mt-3 flex items-center gap-1.5 text-[12px] text-slate-600"><Film :size="13" /> За кулисами · иллюстративные фото, видео студии пока не добавлены</p>
  </section>
</template>
