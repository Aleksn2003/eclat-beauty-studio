import { onMounted, onBeforeUnmount, ref } from 'vue'
import { studio } from '../studio.config'

export function useEngagement({ canShow, onExit }) {
  const activity = ref(null)
  const dismissedActivity = ref(false)
  let interval, hideTimer, eligibleTimer
  let exitEligible = false
  let exitShown = false
  let count = 0
  const examples = [
    { name: 'Анна', service: 'уход за лицом', specialist: 'Ольга' },
    { name: 'София', service: 'уход за волосами', specialist: 'Мия' },
    { name: 'Эмма', service: 'маникюр', specialist: 'Ольга' },
  ]
  function closeActivity() { activity.value = null; dismissedActivity.value = true; clearTimeout(hideTimer); clearInterval(interval) }
  function onMouseOut(event) {
    if (event.relatedTarget !== null || event.clientY > 4 || !exitEligible || exitShown || !canShow() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return
    exitShown = true
    try { sessionStorage.setItem('eclat-exit-seen', '1') } catch { /* Storage can be disabled; in-memory guard still works. */ }
    onExit()
  }
  onMounted(() => {
    try { exitShown = sessionStorage.getItem('eclat-exit-seen') === '1' } catch { /* No persistence required. */ }
    eligibleTimer = setTimeout(() => { exitEligible = true }, 18000)
    document.addEventListener('mouseout', onMouseOut)
    if (studio.demoActivity) interval = setInterval(() => {
      if (!canShow() || document.hidden || dismissedActivity.value) return
      activity.value = examples[count++ % examples.length]
      hideTimer = setTimeout(() => { activity.value = null }, 6500)
    }, 30000)
  })
  onBeforeUnmount(() => { clearTimeout(eligibleTimer); clearTimeout(hideTimer); clearInterval(interval); document.removeEventListener('mouseout', onMouseOut) })
  return { activity, closeActivity }
}
