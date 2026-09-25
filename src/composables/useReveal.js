import { computed } from 'vue'
import { useReducedMotion } from 'motion-v'

export function useReveal() {
  const reducedMotion = useReducedMotion()
  const initial = computed(() => ({ opacity: 0, y: reducedMotion.value ? 0 : 24 }))
  const visible = { opacity: 1, y: 0 }
  const viewport = { once: true, amount: 0.12 }
  const transition = (delay = 0) => ({ duration: reducedMotion.value ? 0 : 0.65, delay: reducedMotion.value ? 0 : delay, ease: [0.22, 1, 0.36, 1] })
  return { initial, visible, viewport, transition, reducedMotion }
}
