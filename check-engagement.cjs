// Deterministic checks for the delayed, once-per-session exit offer and demo toast.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('src/composables/useEngagement.js', 'utf8')
  .replace(/^import .*$/gm, '').replace('export function', 'function');
let mount, cleanup, handler, exits = 0, allowed = true, fine = true;
const timers = new Map(), intervals = new Map(), storage = new Map();
const context = {
  ref: value => ({ value }), studio: { demoActivity: true },
  onMounted: fn => { mount = fn }, onBeforeUnmount: fn => { cleanup = fn },
  setTimeout: (fn, ms) => { timers.set(ms, fn); return ms }, clearTimeout: id => timers.delete(id),
  setInterval: (fn, ms) => { intervals.set(ms, fn); return ms }, clearInterval: id => intervals.delete(id),
  document: { hidden: false, addEventListener: (_, fn) => { handler = fn }, removeEventListener: () => { handler = null } },
  sessionStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) },
  matchMedia: () => ({ matches: fine }), canShow: () => allowed, onExit: () => exits++,
};
vm.createContext(context);
vm.runInContext(source + '\nvar result = useEngagement({canShow, onExit});', context);
mount();
const event = { relatedTarget: null, clientY: 0 };
handler(event); assert.equal(exits, 0);
timers.get(18000)();
allowed = false; handler(event); assert.equal(exits, 0);
allowed = true; fine = false; handler(event); assert.equal(exits, 0);
fine = true; handler({ ...event, clientY: 20 }); assert.equal(exits, 0);
handler(event); handler(event); assert.equal(exits, 1);
assert.equal(storage.get('eclat-exit-seen'), '1');
intervals.get(30000)(); assert.equal(context.result.activity.value.name, 'Анна');
context.result.closeActivity(); assert.equal(context.result.activity.value, null); assert.equal(intervals.size, 0);
cleanup(); assert.equal(handler, null);
console.log('PASS: exit delay, modal guard, pointer guard, top edge, once per session, demo toast, dismissal and cleanup');
