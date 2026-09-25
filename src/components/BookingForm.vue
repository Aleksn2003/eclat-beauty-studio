<script setup>
import { computed, ref } from 'vue'
import { ArrowUpRight, Check, CalendarDays, ShieldCheck } from 'lucide-vue-next'
import { rituals } from '../studio.config'
const props = defineProps({ selection: { type: Object, default: () => ({}) } })
const emit = defineEmits(['done'])
const name = ref('')
const email = ref('')
const service = ref(props.selection.service || '')
const selectedRitual = computed(() => rituals.find((ritual) => ritual.id === service.value))
const date = ref('')
const consent = ref(false)
const complete = ref(false)
const error = ref('')
const today = computed(() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` })
function submit() {
  error.value = ''
  if (!name.value.trim() || !email.value.trim() || !service.value || !date.value || !consent.value) { error.value = 'Заполните все поля и подтвердите, что ознакомились с условиями демонстрации.'; return }
  if (date.value < today.value) { error.value = 'Выберите сегодняшнюю или будущую дату.'; return }
  complete.value = true
}
</script>

<template>
  <div v-if="complete" class="py-5 text-center" role="status">
    <span class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600"><Check :size="25" /></span>
    <p class="eyebrow mb-3 text-brand-600">ДЕМОНСТРАЦИЯ ЗАВЕРШЕНА</p><h2 class="heading !text-[42px]">Ваш выбор готов.</h2>
    <p class="my-6 text-[12px] leading-relaxed text-slate-600">Это пример формы: запись не создана, данные не отправлены и не сохранены. Для настоящей записи потребуются подтверждённые контакты студии.</p>
    <button class="btn-primary" @click="emit('done')">Вернуться на сайт <ArrowUpRight :size="15" /></button>
  </div>
  <div v-else>
    <p class="eyebrow mb-4 flex items-center gap-2 text-brand-600"><CalendarDays :size="14" /> ВРЕМЯ ДЛЯ СЕБЯ</p>
    <h2 class="heading !text-[45px]">Ваш следующий <em class="font-normal text-brand-600">визит.</em></h2>
    <p class="mb-6 mt-4 text-[12px] leading-relaxed text-slate-600">Попробуйте выбрать услугу и дату. Форма работает в деморежиме и ничего не отправляет.</p>
    <div v-if="selectedRitual" role="status" aria-live="polite" class="mb-5 flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-brand-700">
      <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white"><Check :size="14" aria-hidden="true" /></span>
      <p class="text-[12px] leading-relaxed"><span class="font-semibold">Вы выбрали: {{ selectedRitual.name }}.</span><span class="block text-slate-600">Услугу можно изменить ниже.</span></p>
    </div>
    <p v-if="selection.promo" class="mb-5 rounded-lg bg-brand-50 px-4 py-3 text-[11px] text-brand-700">Промокод: <strong>{{ selection.promo }}</strong><span class="block text-[9px]">Пример акции. Условия требуют подтверждения. Скидки не суммируются.</span></p>
    <form class="space-y-4" @submit.prevent="submit">
      <div><label for="booking-name" class="field-label">Ваше имя</label><input id="booking-name" v-model="name" autofocus autocomplete="name" required maxlength="100" placeholder="Имя и фамилия" class="field" /></div>
      <div><label for="booking-email" class="field-label">Электронная почта</label><input id="booking-email" v-model="email" type="email" autocomplete="email" required maxlength="254" placeholder="you@example.com" class="field" /></div>
      <div class="grid gap-4 sm:grid-cols-2"><div><label for="booking-service" class="field-label">Услуга</label><select id="booking-service" v-model="service" required class="field"><option disabled value="">Выберите услугу</option><option v-for="r in rituals" :key="r.id" :value="r.id">{{ r.name }}</option></select></div><div><label for="booking-date" class="field-label">Желаемая дата</label><input id="booking-date" v-model="date" type="date" :min="today" required class="field" /></div></div>
      <label class="flex cursor-pointer items-start gap-2.5 text-[12px] leading-relaxed text-slate-600"><input v-model="consent" type="checkbox" required class="mt-0.5 h-3.5 w-3.5 shrink-0 accent-brand-600" /><span>Я понимаю, что это демонстрация: данные остаются в форме и никуда не отправляются.</span></label>
      <p v-if="error" role="alert" class="rounded-lg bg-red-50 p-3 text-[11px] text-red-700">{{ error }}</p>
      <button type="submit" class="btn-primary w-full">Проверить мой выбор <ArrowUpRight :size="15" /></button>
      <p class="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-600"><ShieldCheck :size="12" /> Деморежим · Данные не покидают браузер</p>
    </form>
  </div>
</template>
