/**
 * useMobileSession – shared reactive state for mobile photobooth flow.
 * Used by MobileEditorView and any child components.
 */
import { ref, computed } from 'vue'

// ──────────────────────────────────────────────
// Session state (set when QR is scanned)
// ──────────────────────────────────────────────
const sessionId   = ref('')
const sessionPkg  = ref('Paket Standard')
const sessionPhotos = ref([
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
])

// ──────────────────────────────────────────────
// Decoration state
// ──────────────────────────────────────────────
const selectedFrame  = ref('#0a0714')
const selectedFilter = ref('none')
const placedStickers = ref([])
const stripText      = ref('')
const textOnPhoto    = ref('')
const textTargetPhoto = ref(0)
const textColor      = ref('#ffffff')

// ──────────────────────────────────────────────
// Data: Frames
// ──────────────────────────────────────────────
const frames = [
  { name: 'Cosmos',    hex: '#0a0714', dark: true },
  { name: 'Midnight',  hex: '#0f172a', dark: true },
  { name: 'Deep Purple', hex: '#1e1040', dark: true },
  { name: 'Rose Dark', hex: '#1a0a12', dark: true },
  { name: 'Putih',     hex: '#ffffff', dark: false },
  { name: 'Lavender',  hex: '#f1ebff', dark: false },
  { name: 'Blush Pink',hex: '#fce7f3', dark: false },
  { name: 'Sky Blue',  hex: '#e0f2fe', dark: false },
  { name: 'Mint',      hex: '#d1fae5', dark: false },
  { name: 'Cream',     hex: '#fef3c7', dark: false },
  { name: 'Peach',     hex: '#ffedd5', dark: false },
  { name: 'Lilac',     hex: '#ede9fe', dark: false },
]

// ──────────────────────────────────────────────
// Data: Filters
// ──────────────────────────────────────────────
const filters = [
  { name: 'Normal',    value: 'none' },
  { name: 'Vivid',     value: 'saturate(1.9) contrast(1.1)' },
  { name: 'Vintage',   value: 'sepia(0.55) contrast(1.1) brightness(0.9)' },
  { name: 'Cool',      value: 'hue-rotate(30deg) saturate(1.3)' },
  { name: 'Warm',      value: 'sepia(0.3) saturate(1.5) brightness(1.05)' },
  { name: 'B&W',       value: 'grayscale(1) contrast(1.25)' },
  { name: 'Dreamy',    value: 'brightness(1.1) contrast(0.85) saturate(1.4) blur(0.4px)' },
  { name: 'Moody',     value: 'brightness(0.82) contrast(1.35) saturate(0.75)' },
  { name: 'Cinematic', value: 'contrast(1.2) saturate(0.65) brightness(0.88) sepia(0.18)' },
]

// ──────────────────────────────────────────────
// Data: Stickers
// ──────────────────────────────────────────────
const stickerCategories = [
  { name: 'Populer',   list: ['✨','💖','⭐','🌟','💫','🔥','🎀','🌸','🦋','💎','🎉','🎊'] },
  { name: 'Wajah',     list: ['😍','🥰','😎','🤩','😘','🥳','😄','😜','🤗','😇','🙈','💅'] },
  { name: 'Alam',      list: ['🌺','🌈','🌙','☀️','🌊','🍓','🍀','🌻','🌴','🦄','🐱','🦋'] },
  { name: 'Budaya',    list: ['🎵','🎶','🎸','🎤','🏆','👑','💍','🎓','🎭','🎪','🚀','🌏'] },
  { name: 'Cinta',     list: ['❤️','💕','💞','💓','💗','💝','💟','♥️','🫶','💏','👫','🤝'] },
]

// ──────────────────────────────────────────────
// Computed helpers
// ──────────────────────────────────────────────
const isDarkFrame = computed(() => frames.find(f => f.hex === selectedFrame.value)?.dark ?? true)
const currentFrameName = computed(() => frames.find(f => f.hex === selectedFrame.value)?.name || 'Custom')
const currentFilterName = computed(() => filters.find(f => f.value === selectedFilter.value)?.name || 'Custom')

// ──────────────────────────────────────────────
// Actions
// ──────────────────────────────────────────────
function addSticker(emoji) {
  const photoIdx = Math.floor(Math.random() * sessionPhotos.value.length)
  placedStickers.value.push({
    id: Date.now() + Math.random(),
    emoji,
    photoIdx,
    x: 15 + Math.random() * 70,
    y: 15 + Math.random() * 70,
    size: 18 + Math.floor(Math.random() * 12),
    rotation: -20 + Math.random() * 40,
  })
}

function resetDecor() {
  selectedFrame.value = '#0a0714'
  selectedFilter.value = 'none'
  placedStickers.value = []
  stripText.value = ''
  textOnPhoto.value = ''
  textTargetPhoto.value = 0
}

export function useMobileSession() {
  return {
    // Session
    sessionId, sessionPkg, sessionPhotos,
    // Decor state
    selectedFrame, selectedFilter, placedStickers,
    stripText, textOnPhoto, textTargetPhoto, textColor,
    // Data
    frames, filters, stickerCategories,
    // Computed
    isDarkFrame, currentFrameName, currentFilterName,
    // Actions
    addSticker, resetDecor,
  }
}
