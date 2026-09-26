<script setup>
// FAQ + contacts + closing footer for the ÉCLAT landing page.
// All contact details come from src/studio.config.js — nothing is invented here,
// and fields left empty in the config are simply not rendered.
import { computed, ref } from 'vue'
import { Motion } from 'motion-v'
import {
  CalendarCheck,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-vue-next'
import { studio } from '../studio.config.js'
import { useReveal } from '../composables/useReveal.js'
import MapPanel from './MapPanel.vue'

const emit = defineEmits(['book', 'chat'])

const { initial, visible, viewport, transition, reducedMotion } = useReveal()

// Illustrative FAQ copy — review the wording before launch. It deliberately
// states no cancellation, refund or pricing policy that the studio has not set.
const faqs = [
  {
    id: 'booking',
    question: 'Как записаться?',
    answer:
      'Сейчас доступна демонстрационная форма: она позволяет выбрать услугу и дату, но не отправляет данные и не создаёт запись. Контакты для настоящей записи появятся после подтверждения владельцем.',
  },
  {
    id: 'rituals',
    question: 'Какие услуги представлены?',
    answer:
      'В примере представлены уход за волосами и лицом, маникюр, брови и ресницы. Реальный перечень услуг необходимо уточнить у студии.',
  },
  {
    id: 'timing',
    question: 'Сколько длится процедура?',
    answer:
      'В демонстрационном каталоге указана длительность от 30 до 120 минут. Точное время зависит от услуги и требует подтверждения студией.',
  },
  {
    id: 'prepare',
    question: 'Как подготовиться к визиту?',
    answer:
      'Подготовка зависит от выбранной процедуры. Уточните рекомендации у специалиста перед визитом.',
  },
  {
    id: 'unsure',
    question: 'Что выбрать, если я пока не знаю?',
    answer:
      'Пройдите короткий тест на этой странице, чтобы сравнить варианты и увидеть примерную стоимость. Окончательный выбор лучше обсудить со специалистом.',
  },
]

const openId = ref(faqs[0].id)
const toggle = (id) => {
  openId.value = openId.value === id ? null : id
}
const isOpen = (id) => openId.value === id

const year = new Date().getFullYear()
// Keep image source notes available to the project without exposing a separate
// public credits file or tool-specific generation metadata on the live page.
const imageSources = [
  { name: 'Иллюстрация интерьера', url: '' },
  { name: 'Hero photo', url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec' },
  { name: 'Hair', url: 'https://images.unsplash.com/photo-1524504388940-b1c172265e1' },
  { name: 'Skin', url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881' },
  { name: 'Nails', url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371' },
  { name: 'Studio', url: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250' },
  { name: 'Makeup', url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2' },
  { name: 'Portrait', url: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43' },
  { name: 'Styling', url: 'https://images.unsplash.com/photo-1560869713-7d0a29430803' },
]

const hasPhone = computed(() => Boolean(studio.phone))
const hasMessenger = computed(() => Boolean(studio.messengerUrl))
const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <footer class="bg-white text-[#272b29]">
    <!-- FAQ -->
    <section class="section-rule" aria-labelledby="faq-title">
      <div class="container-shell py-20 md:py-28">
        <div class="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <Motion
            class="self-start"
            :initial="initial"
            :while-in-view="visible"
            :in-view-options="viewport"
            :transition="transition()"
          >
            <p class="eyebrow text-[#946431]">ПОЛЕЗНО ЗНАТЬ</p>
            <h2 id="faq-title" class="heading mt-5 max-w-[13ch]">
              Ваши вопросы.<br />Наши ответы.
            </h2>
            <p class="mt-6 max-w-[38ch] text-[13.5px] leading-relaxed text-[#5b625c]">
              
Ответы на вопросы о первом визите и возможностях этой демонстрационной страницы.
            </p>
          </Motion>

          <Motion
            :initial="initial"
            :while-in-view="visible"
            :in-view-options="viewport"
            :transition="transition(0.08)"
          >
            <div class="border-y border-[#e8e6df]">
              <div v-for="item in faqs" :key="item.id" class="border-b border-[#e8e6df] last:border-b-0">
                <h3>
                  <button
                    :id="`faq-trigger-${item.id}`"
                    type="button"
                    class="flex w-full items-start justify-between gap-6 py-6 text-left"
                    :aria-expanded="isOpen(item.id)"
                    :aria-controls="`faq-panel-${item.id}`"
                    @click="toggle(item.id)"
                  >
                    <span class="pt-2 text-[15px] font-semibold leading-snug text-[#272b29]">
                      {{ item.question }}
                    </span>
                    <span class="round-button mt-0.5 shrink-0" aria-hidden="true">
                      <ChevronDown
                        :size="16"
                        class="text-[#946431] transition-transform duration-300"
                        :class="isOpen(item.id) ? 'rotate-180' : ''"
                      />
                    </span>
                  </button>
                </h3>

                <!-- Height animates to auto via Motion; the region stays mounted so
                     aria-controls always resolves to a real element. -->
                <Motion
                  :id="`faq-panel-${item.id}`"
                  role="region"
                  :aria-labelledby="`faq-trigger-${item.id}`"
                  :aria-hidden="!isOpen(item.id)"
                  :initial="false"
                  :animate="{
                    height: isOpen(item.id) ? 'auto' : 0,
                    opacity: isOpen(item.id) ? 1 : 0,
                  }"
                  :transition="{
                    duration: reducedMotion ? 0 : 0.42,
                    ease: [0.22, 1, 0.36, 1],
                  }"
                  class="overflow-hidden"
                >
                  <p class="max-w-[58ch] pb-7 pr-10 text-[13.5px] leading-relaxed text-[#5b625c]">
                    {{ item.answer }}
                  </p>
                </Motion>
              </div>
            </div>
          </Motion>
        </div>
      </div>
    </section>

    <!-- Contacts -->
    <section id="visit" class="section-rule bg-[#faf6f0]" aria-labelledby="visit-title">
      <div class="container-shell py-20 md:py-28">
        <div class="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Motion
            :initial="initial"
            :while-in-view="visible"
            :in-view-options="viewport"
            :transition="transition()"
          >
            <p class="eyebrow text-[#946431]">Контакты</p>
            <h2 id="visit-title" class="heading mt-5 max-w-[15ch]">Ваше время начинается здесь.</h2>
            <p class="mt-6 max-w-[42ch] text-[14px] leading-relaxed text-[#5b625c]">
              {{ studio.area }}<span class="mt-3 block text-[11px] text-brand-700">Адрес, часы работы и почта ниже — демонстрационные данные.</span>
            </p>

            <div class="mt-9 flex flex-wrap gap-3">
              <button type="button" class="btn-primary" @click="emit('book')">
                <CalendarCheck :size="16" aria-hidden="true" />
                Посмотреть форму записи
              </button>
              <button type="button" class="btn-secondary" @click="emit('chat')">
                <MessageCircle :size="16" aria-hidden="true" />
                Написать в студию
              </button>
            </div>

            <dl class="mt-12 grid gap-7 sm:grid-cols-2">
              <div class="flex gap-3.5">
                <span
                  class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e7d6bf] bg-white text-[#946431]"
                >
                  <MapPin :size="15" aria-hidden="true" />
                </span>
                <div>
                  <dt class="eyebrow text-[9px] text-[#8a908b]">Студия</dt>
                  <dd class="mt-1.5 text-[13.5px] leading-relaxed">{{ studio.address }}</dd>
                </div>
              </div>

              <div class="flex gap-3.5">
                <span
                  class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e7d6bf] bg-white text-[#946431]"
                >
                  <Clock :size="15" aria-hidden="true" />
                </span>
                <div>
                  <dt class="eyebrow text-[9px] text-[#8a908b]">Часы работы</dt>
                  <dd class="mt-1.5 text-[13.5px] leading-relaxed">{{ studio.hours }}</dd>
                </div>
              </div>

              <div v-if="hasPhone" class="flex gap-3.5">
                <span
                  class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e7d6bf] bg-white text-[#946431]"
                >
                  <Phone :size="15" aria-hidden="true" />
                </span>
                <div>
                  <dt class="eyebrow text-[9px] text-[#8a908b]">Телефон</dt>
                  <dd class="mt-1.5 text-[13.5px] leading-relaxed">
                    <a class="underline decoration-[#e7d6bf] underline-offset-4" :href="`tel:${studio.phone}`">
                      {{ studio.phone }}
                    </a>
                  </dd>
                </div>
              </div>

              <div class="flex gap-3.5">
                <span
                  class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e7d6bf] bg-white text-[#946431]"
                >
                  <Mail :size="15" aria-hidden="true" />
                </span>
                <div>
                  <dt class="eyebrow text-[9px] text-[#8a908b]">Эл. почта</dt>
                  <dd class="mt-1.5 break-all text-[13.5px] leading-relaxed">
                    <a
                      class="underline decoration-[#e7d6bf] underline-offset-4"
                      :href="`mailto:${studio.email}`"
                    >
                      {{ studio.email }}
                    </a>
                  </dd>
                </div>
              </div>

              <div v-if="hasMessenger" class="flex gap-3.5">
                <span
                  class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e7d6bf] bg-white text-[#946431]"
                >
                  <MessageCircle :size="15" aria-hidden="true" />
                </span>
                <div>
                  <dt class="eyebrow text-[9px] text-[#8a908b]">Мессенджер</dt>
                  <dd class="mt-1.5 text-[13.5px] leading-relaxed">
                    <a
                      class="underline decoration-[#e7d6bf] underline-offset-4"
                      :href="studio.messengerUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Открыть чат
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </Motion>

          <!-- Inset map panel, framed to sit beside the address and hours. -->
          <Motion
            class="lg:pt-2"
            :initial="initial"
            :while-in-view="visible"
            :in-view-options="viewport"
            :transition="transition(0.1)"
          >
            <div
              class="rounded-2xl border border-[#e7d6bf]/80 bg-[#fffdfa] p-2.5 shadow-[0_28px_70px_-48px_rgba(39,43,41,0.5)]"
            >
              <MapPanel />
            </div>
          </Motion>
        </div>
      </div>
    </section>

    <!-- Closing footer -->
    <div class="section-rule border-b-0">
      <div class="container-shell py-12">
        <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="font-display text-[26px] leading-none tracking-[0.32em] text-[#272b29]">
              {{ studio.name }}
            </p>
            <p class="mt-3 text-[12.5px] text-[#6b726c]">Красота с вниманием к вам.</p>
          </div>
          <p class="text-[11px] text-[#8a908b]">
            © {{ year }} {{ studio.name }}. Все права защищены.
          </p>
        </div>

        <nav aria-label="Документы и информация" class="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#f0eee8] pt-6 text-[11px]">
          <a :href="baseUrl + 'legal/requisites.html'" class="underline decoration-[#e7d6bf] underline-offset-4 transition-colors hover:text-[#946431]">Реквизиты</a>
          <a :href="baseUrl + 'legal/terms.html'" class="underline decoration-[#e7d6bf] underline-offset-4 transition-colors hover:text-[#946431]">Условия услуг</a>
          <a :href="baseUrl + 'legal/privacy.html'" class="underline decoration-[#e7d6bf] underline-offset-4 transition-colors hover:text-[#946431]">Политика конфиденциальности</a>
          <a href="https://github.com/Aleksn2003" target="_blank" rel="noopener noreferrer" class="underline decoration-[#e7d6bf] underline-offset-4 transition-colors hover:text-[#946431]">Авторство и использование · Aleksn2003</a>
          <details class="relative">
            <summary class="cursor-pointer list-none underline decoration-[#e7d6bf] underline-offset-4 transition-colors hover:text-[#946431]">Источники фотографий</summary>
            <ul class="absolute bottom-full left-0 z-10 mb-2 grid min-w-52 gap-2 rounded-xl border border-[#eee9df] bg-white p-4 shadow-lg">
              <li v-for="source in imageSources" :key="source.name">
                <a :href="source.url" target="_blank" rel="noreferrer" class="hover:text-[#946431]">{{ source.name }}</a>
              </li>
            </ul>
          </details>
        </nav>
        <p class="mt-4 max-w-3xl text-[10px] leading-relaxed text-[#8a908b]">Автор шаблона: <a href="https://github.com/Aleksn2003" target="_blank" rel="noopener noreferrer" class="underline decoration-[#e7d6bf] underline-offset-4 hover:text-[#946431]">Aleksn2003</a>. Права на созданные автором код, структуру и дизайн сохранены за автором. Повторное использование допускается только с предварительного разрешения. Просмотр и форк на GitHub регулируются <a href="https://docs.github.com/en/site-policy/github-terms/github-terms-of-service" target="_blank" rel="noopener noreferrer" class="underline decoration-[#e7d6bf] underline-offset-4 hover:text-[#946431]">условиями GitHub</a> и не предоставляют открытую лицензию.</p>
        <p class="mt-5 text-[10px] leading-relaxed text-[#8a908b]">Демонстрационная версия · условия и сведения об исполнителе уточняются.</p>
      </div>
    </div>
  </footer>
</template>
