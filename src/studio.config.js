// Replace all example studio details before publishing.
// Empty integrations deliberately enter honest demo states; no customer data is sent.
export const studio = {
  name: 'ÉCLAT',
  address: 'г. Примерный, ул. Садовая, д. 18, студия 2',
  area: 'Ваш тихий уголок в городе',
  hours: 'Пн–Вс · 10:00–20:00',
  phone: '',
  email: 'hello@eclat.example',
  messengerUrl: '', // e.g. your verified https://wa.me/... or https://t.me/... URL
  demoActivity: true, // Simulated notifications are visibly labeled; false disables them.
  map: { url: '' }, // Verified HTTPS 2GIS studio card URL, supplied by the owner.
}

export const rituals = [
  { id: 'hair', name: 'Уход за волосами', short: 'Волосы', subtitle: 'Красивые волосы без лишних усилий.', price: 85, high: 150, duration: '60–120 мин', image: 'styling.webp', icon: 'scissors' },
  { id: 'skin', name: 'Уход за лицом', short: 'Лицо', subtitle: 'Свежесть и забота о коже.', price: 70, high: 110, duration: '45–75 мин', image: 'skin.webp', icon: 'sparkles' },
  { id: 'nails', name: 'Маникюр', short: 'Ногти', subtitle: 'Красота в деталях.', price: 40, high: 65, duration: '45–60 мин', image: 'nails.webp', icon: 'flower' },
  { id: 'brows', name: 'Брови и ресницы', short: 'Брови', subtitle: 'Выразительность, которая вам к лицу.', price: 35, high: 60, duration: '30–60 мин', image: 'makeup.webp', icon: 'eye' },
]

export const stories = [
  { id: 'skin-story', title: 'Сияние кожи', category: 'УХОД ЗА КОЖЕЙ', image: 'skin.webp', duration: '0:24', videoSrc: '', description: 'Очищение, массаж и увлажнение кожи. Здесь пока представлено иллюстративное фото; видео процедуры ещё не добавлено.' },
  { id: 'hair-story', title: 'Магия укладки', category: 'УХОД ЗА ВОЛОСАМИ', image: 'styling.webp', duration: '0:32', videoSrc: '', description: 'Внимание к деталям и лёгкая укладка. Это фотопревью: видео работы мастера ещё не добавлено.' },
  { id: 'nails-story', title: 'Детали, которые радуют', category: 'МАНИКЮР', image: 'nails.webp', duration: '0:18', videoSrc: '', description: 'От подготовки до завершающего штриха. Иллюстративное фото; видео процесса ещё не добавлено.' },
  { id: 'brow-story', title: 'Естественно красиво', category: 'БРОВИ И РЕСНИЦЫ', image: 'makeup.webp', duration: '0:21', videoSrc: '', description: 'Мягкий акцент на естественной красоте. В этом превью используется иллюстративная фотография.' },
  { id: 'studio-story', title: 'Добро пожаловать', category: 'ЖИЗНЬ ÉCLAT', image: 'studio.webp', duration: '0:28', videoSrc: '', description: 'Спокойствие, уют и время для себя. Это иллюстративное фото; настоящая экскурсия по студии появится позже.' },
]

export const money = (amount) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(amount)
export const asset = (file) => `${import.meta.env.BASE_URL}images/${file}`


