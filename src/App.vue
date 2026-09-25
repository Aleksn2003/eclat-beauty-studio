<script setup>
import { computed, ref } from 'vue'
import { Motion, AnimatePresence, MotionConfig } from 'motion-v'
import { ArrowUpRight, Gift, MessageCircle, CalendarCheck, X } from 'lucide-vue-next'
import StudioHeader from './components/StudioHeader.vue'
import HeroSection from './components/HeroSection.vue'
import StoriesSection from './components/StoriesSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import QuizSection from './components/QuizSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import TeamSection from './components/TeamSection.vue'
import StudioFooter from './components/StudioFooter.vue'
import BaseModal from './components/BaseModal.vue'
import BookingForm from './components/BookingForm.vue'
import { useEngagement } from './composables/useEngagement'
import { asset, studio } from './studio.config'

// One discriminated modal state prevents competing dialogs or stacked overlays.
const activeModal = ref(null) // null | booking | story | chat | exit
const bookingSelection = ref({})
const activeStory = ref(null)
const modalTitle = computed(() => ({ booking: 'Запись в студию', story: activeStory.value?.title || 'История студии', chat: 'Написать в студию', exit: 'Подарок к первому визиту' }[activeModal.value] || 'Окно студии'))
function openBooking(selection = {}) { bookingSelection.value = selection && typeof selection === 'object' ? selection : {}; activeModal.value = 'booking' }
function openStory(story) { activeStory.value = story; activeModal.value = 'story' }
function openChat() {
  if (studio.messengerUrl && /^https:\/\//.test(studio.messengerUrl)) window.open(studio.messengerUrl, '_blank', 'noopener,noreferrer')
  else activeModal.value = 'chat'
}
const { activity, closeActivity } = useEngagement({ canShow: () => activeModal.value === null, onExit: () => { activeModal.value = 'exit' } })
</script>

<template>
  <MotionConfig reduced-motion="user">
    <StudioHeader @book="openBooking" @chat="openChat" />
    <main id="main">
      <HeroSection @book="openBooking" />
      <ServicesSection @book="openBooking" />
      <ExperienceSection />
      <StoriesSection @story="openStory" />
      <QuizSection @book="openBooking" />
      <PortfolioSection @book="openBooking" />
      <TeamSection @book="openBooking" />
    </main>
    <StudioFooter @book="openBooking" @chat="openChat" />

    <AnimatePresence>
      <Motion v-if="activity && !activeModal" key="activity" :initial="{ opacity: 0, y: 25 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0, y: 15 }" class="fixed bottom-5 left-5 z-30 flex max-w-[calc(100%-40px)] items-start gap-3 rounded-2xl border border-brand-100 bg-white/95 p-4 pr-8 shadow-lg shadow-slate-900/5 backdrop-blur-lg" role="status" aria-live="polite">
        <span class="rounded-full bg-brand-50 p-2.5 text-brand-600"><CalendarCheck :size="18" /></span><div><p class="text-[11px] font-semibold">{{ activity.name }} выбирает время для себя</p><p class="mt-1 text-[9px] text-slate-500">Услуга: {{ activity.service }}. Мастер: {{ activity.specialist }}.</p><p class="mt-1.5 text-[8px] text-brand-700">ПРИМЕР УВЕДОМЛЕНИЯ · ДЕМО</p></div><button aria-label="Закрыть и отключить демонстрационные уведомления" class="absolute right-2 top-2 rounded-full p-1 text-slate-400" @click="closeActivity"><X :size="12" /></button>
      </Motion>
    </AnimatePresence>

    <BaseModal :open="activeModal !== null" :title="modalTitle" @close="activeModal = null">
      <BookingForm v-if="activeModal === 'booking'" :selection="bookingSelection" @done="activeModal = null" />
      <div v-else-if="activeModal === 'story' && activeStory">
        <p class="eyebrow mb-3 pr-6 text-brand-600">{{ activeStory.category }}</p><h2 class="font-display text-[40px]">{{ activeStory.title }}</h2>
        <video v-if="activeStory.videoSrc" :key="activeStory.id" controls playsinline preload="metadata" :poster="asset(activeStory.image)" class="mt-5 max-h-[50dvh] w-full rounded-xl bg-brand-50"><source :src="activeStory.videoSrc" type="video/mp4" /><p>Ваш браузер не поддерживает видео.</p></video>
        <img v-else :src="asset(activeStory.image)" :alt="activeStory.title" class="mt-5 max-h-[45dvh] w-full rounded-xl object-cover" />
        <p class="mt-4 text-[11px] leading-relaxed text-slate-500">{{ activeStory.description }}</p><p v-if="!activeStory.videoSrc" class="mt-3 text-[9px] text-brand-700">Фотопревью — видео пока не добавлено.</p><button class="btn-primary mt-5" @click="openBooking()">Выбрать время для себя <ArrowUpRight :size="15" /></button>
      </div>
      <div v-else-if="activeModal === 'chat'" class="py-3">
        <MessageCircle :size="29" :stroke-width="1.4" class="mb-6 text-brand-600" /><p class="eyebrow mb-4 text-brand-600">ПОГОВОРИМ О КРАСОТЕ</p><h2 class="heading !text-[43px]">Живое общение.<br /><em class="font-normal text-brand-600">Внимание к вам.</em></h2><p class="mt-6 text-[12px] leading-relaxed text-slate-600">Мессенджер пока не подключён. Вы можете посмотреть демонстрационную форму записи: введённые данные никуда не отправляются.</p><button class="btn-primary mt-6" @click="openBooking()">Посмотреть форму <ArrowUpRight :size="15" /></button><p class="mt-5 text-[9px] text-slate-400">Контакт студии появится после подтверждения владельцем.</p>
      </div>
      <div v-else-if="activeModal === 'exit'" class="py-5 text-center">
        <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600"><Gift :size="27" :stroke-width="1.3" /></div><p class="eyebrow mb-4 text-brand-600">ПЕРЕД ТЕМ КАК УЙТИ</p><h2 class="heading !text-[45px]">Оставьте немного<br /><em class="font-normal text-brand-600">красоты на потом.</em></h2><p class="mx-auto mt-5 max-w-xs text-[12px] leading-relaxed text-slate-600">Пример предложения: скидка 15% на первый визит в Éclat. Условия акции должны быть подтверждены студией.</p><p class="my-6 rounded-xl border border-dashed border-brand-200 bg-brand-50 py-4 text-lg font-semibold tracking-[.2em]">ECLAT15</p><button class="btn-primary w-full" @click="openBooking({ promo: 'ECLAT15' })">Выбрать услугу <ArrowUpRight :size="15" /></button><button class="mt-4 text-[10px] text-slate-500 underline underline-offset-4" @click="activeModal = null">Пока нет, спасибо</button><p class="mt-5 text-[8px] text-slate-400">Демонстрационная акция для новых клиентов. Условия не подтверждены.</p>
      </div>
    </BaseModal>
  </MotionConfig>
</template>

