<script setup>
import { computed, ref } from 'vue'
import { Motion, AnimatePresence } from 'motion-v'
import { ArrowRight, ArrowLeft, Check, Sparkles, Gift, Copy, RotateCcw } from 'lucide-vue-next'
import { rituals, money } from '../studio.config'
import { useReveal } from '../composables/useReveal'
const emit = defineEmits(['book'])
const { initial, visible, viewport, transition } = useReveal()
const step = ref(0)
const choices = ref({ service: '', experience: '', visit: '' })
const copied = ref(false)
const copyMessage = ref('')
const questions = [
  { key: 'service', title: 'Какой уход вам нужен?', subtitle: 'Выберите то, что хочется именно сейчас.', options: rituals.map(r => ({ value: r.id, label: r.name, detail: `От ${money(r.price)} · ${r.duration}` })) },
  { key: 'experience', title: 'Сколько заботы вам хочется?', subtitle: 'Базовый уход или расширенная программа.', options: [{ value: 'essential', label: 'Базовый уход', detail: 'Всё необходимое · базовая цена' }, { value: 'signature', label: 'Особенный уход', detail: 'Расширенная программа · +25%' }, { value: 'luxury', label: 'Полная программа', detail: 'Максимум внимания и заботы · +50%' }] },
  { key: 'visit', title: 'Вы уже бывали у нас?', subtitle: 'Подберём демонстрационный промокод.', options: [{ value: 'first', label: 'Я впервые в Éclat', detail: 'Пример скидки на первый визит: 15%.' }, { value: 'returning', label: 'Я уже была / был у вас', detail: 'Пример скидки для постоянных гостей: 10%.' }, { value: 'occasion', label: 'Готовлюсь к празднику', detail: 'Пример праздничной скидки: 10%.' }] },
]
const question = computed(() => questions[Math.min(step.value, 2)])
const selected = computed(() => choices.value[question.value.key])
const service = computed(() => rituals.find(r => r.id === choices.value.service))
const multiplier = computed(() => ({ essential: 1, signature: 1.25, luxury: 1.5 }[choices.value.experience] || 1))
const discount = computed(() => choices.value.visit === 'first' ? 15 : 10)
const promo = computed(() => choices.value.visit === 'first' ? 'ECLAT15' : choices.value.visit === 'occasion' ? 'CELEBRATE10' : 'WELCOME10')
const estimate = computed(() => {
  if (!service.value) return null
  const factor = multiplier.value * (step.value === 3 ? (1 - discount.value / 100) : 1)
  return { low: Math.round(service.value.price * factor), high: Math.round(service.value.high * factor) }
})
function next() { if (selected.value && step.value < 3) step.value++ }
function restart() { step.value = 0; choices.value = { service: '', experience: '', visit: '' }; copied.value = false; copyMessage.value = '' }
async function copyCode() {
  try { await navigator.clipboard.writeText(promo.value); copied.value = true; copyMessage.value = 'Промокод скопирован.' }
  catch { copyMessage.value = `Скопируйте вручную: ${promo.value}` }
}
</script>

<template>
  <section id="quiz" class="container-shell py-16 md:py-20">
    <Motion :initial="initial" :while-in-view="visible" :in-view-options="viewport" :transition="transition()" class="grid overflow-hidden rounded-2xl border border-[#e9e0d2] bg-[#f5eee3] md:grid-cols-[.85fr_1.15fr]">
      <div class="relative flex flex-col justify-between overflow-hidden p-7 sm:p-10 lg:p-12">
        <div class="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-brand-200/70" aria-hidden="true"></div><div class="pointer-events-none absolute -bottom-24 -left-12 h-64 w-64 rounded-full border border-brand-200/70" aria-hidden="true"></div>
        <div class="relative"><p class="eyebrow mb-6 flex items-center gap-2 text-brand-700"><Gift :size="14" /> ПОДАРОК ДЛЯ ВАС</p><h2 class="heading !text-[48px] lg:!text-[57px]">Ваш идеальный уход.<br /><em class="font-normal text-brand-600">С приятной скидкой.</em></h2><p class="mt-6 max-w-[265px] text-[11px] leading-[1.9] text-slate-600">Три коротких вопроса — и предварительный расчёт стоимости со скидкой до 15%.</p><p class="mt-3 text-[10px] text-brand-700" lang="ru">Пройди тест – получи скидку</p></div>
        <p class="relative mt-9 flex items-center gap-2 text-[9px] text-brand-700"><Sparkles :size="13" /> 30 секунд · Без регистрации · С заботой о себе</p>
      </div>
      <div class="m-3 rounded-xl bg-white p-6 sm:m-4 sm:p-8 lg:p-10">
        <div class="mb-7 flex items-center justify-between"><p class="eyebrow !text-[10px] text-slate-500">{{ step < 3 ? `ВАШ ВЫБОР · ${step + 1} ИЗ 3` : 'ВАШ РЕЗУЛЬТАТ' }}</p><span class="text-[11px] font-semibold text-brand-700">{{ step < 3 ? Math.round((step + 1) / 3 * 100) : 100 }}%</span></div>
        <div class="mb-7 flex gap-1.5" role="progressbar" :aria-valuenow="Math.min(step + 1, 3)" aria-valuemin="0" aria-valuemax="3" aria-label="Ход теста"><div v-for="n in 3" :key="n" class="h-1 flex-1 rounded-full transition-colors" :class="n <= step + 1 ? 'bg-brand-500' : 'bg-brand-100'"></div></div>
        <AnimatePresence mode="wait">
          <Motion v-if="step < 3" :key="step" :initial="{ opacity: 0, y: 8 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0, y: -8 }" :transition="{ duration: .18 }">
            <h3 class="font-display text-[31px] leading-tight">{{ question.title }}</h3><p class="mb-6 mt-2 text-[10px] text-slate-500">{{ question.subtitle }}</p>
            <fieldset :aria-label="question.title" class="grid gap-2.5" :class="step === 0 ? 'sm:grid-cols-2' : ''">
              <label v-for="option in question.options" :key="option.value" class="relative flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-brand-500" :class="selected === option.value ? 'border-brand-500 bg-brand-50' : 'border-[#e7e6e0] hover:border-brand-200'">
                <input v-model="choices[question.key]" type="radio" :name="question.key" :value="option.value" class="sr-only" />
                <span class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border" :class="selected === option.value ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300'"><Check v-if="selected === option.value" :size="10" /></span>
                <span><span class="block text-[11px] font-semibold">{{ option.label }}</span><span class="mt-1 block text-[9px] leading-relaxed text-slate-500">{{ option.detail }}</span></span>
              </label>
            </fieldset>
            <div class="mt-6 flex items-center justify-between gap-3"><button v-if="step > 0" class="flex items-center gap-2 text-[10px] text-slate-500" @click="step--"><ArrowLeft :size="13" /> Назад</button><span v-else class="text-[9px] text-slate-500">Начнём с ваших пожеланий.</span><button class="btn-primary !px-5 !py-3" :disabled="!selected" @click="next">{{ step === 2 ? 'Показать результат' : 'Далее' }}<ArrowRight :size="14" /></button></div>
          </Motion>
          <Motion v-else key="result" :initial="{ opacity: 0, y: 8 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: .25 }" aria-live="polite">
            <p class="mb-2 flex items-center gap-2 text-[10px] font-semibold text-brand-700"><Check :size="15" /> ВАША СКИДКА {{ discount }}% ОТКРЫТА</p><h3 class="font-display text-[33px]">{{ service?.name }} — для вас.</h3><p class="mt-3 font-display text-[43px] text-brand-600">{{ money(estimate.low) }}–{{ money(estimate.high) }}</p><p class="text-[10px] text-slate-500">Предварительная цена со скидкой {{ discount }}%</p>
            <button class="mt-5 flex w-full items-center justify-between rounded-lg border border-dashed border-brand-200 bg-brand-50 px-4 py-3" :aria-label="`Скопировать промокод ${promo}`" @click="copyCode"><span class="text-[12px] font-bold tracking-[.16em]">{{ promo }}</span><Check v-if="copied" :size="15" class="text-brand-600" /><Copy v-else :size="15" class="text-brand-600" /></button><p v-if="copyMessage" class="mt-2 text-[10px] text-brand-700" role="status">{{ copyMessage }}</p>
            <button class="btn-primary mt-4 w-full" @click="emit('book', { service: choices.service, promo, experience: choices.experience })">Выбрать этот уход <ArrowRight :size="15" /></button><button class="mx-auto mt-4 flex items-center gap-1.5 text-[10px] text-slate-500" @click="restart"><RotateCcw :size="12" /> Пройти ещё раз</button>
          </Motion>
        </AnimatePresence>
        <p class="mt-5 text-[8px] leading-relaxed text-slate-400">Демонстрационные цены и акции. Стоимость и условия скидок требуют подтверждения студией. Скидки не суммируются.</p>
      </div>
    </Motion>
  </section>
</template>
