import { ref, computed } from 'vue'

// Active Landing View Tab state ('beranda', 'cara-kerja', 'paket', 'galeri', 'faq')
export const activeLandingTab = ref('beranda')

// Toast notification state
export const toast = ref({
  show: false,
  message: '',
  type: 'success' // success, error, info, warning
})

export function showToast(message, type = 'success', duration = 3000) {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, duration)
}

// Admin Auth State
export const adminAuth = ref({
  isAuthenticated: true, // default logged in for easy navigation
  user: {
    name: 'Admin Angkasa',
    email: 'admin@angkasabooth.com',
    role: 'Super Admin',
    location: 'Grand Atrium - Booth #01'
  }
})

// Hardware & Kiosk Status
export const kioskStatus = ref({
  boothId: 'BOOTH-ATRIUM-01',
  location: 'Grand Atrium, Lantai GF',
  isOnline: true,
  camera: { status: 'Optimal', name: 'Canon EOS M50 Mark II', fps: 60, resolution: '4K UHD' },
  printer: { status: 'Siap Cetak', name: 'DNP DS-RX1HS', paperRemaining: 412, totalCapacity: 700 },
  payment: { status: 'Aktif Terhubung', gateway: 'QRIS Midtrans & Xendit', ping: '18ms' },
  screenTimeout: 120, // seconds
})

// Presets data
export const presets = ref([
  {
    id: 'P01',
    name: 'Twin Classic Strips (2x3)',
    category: 'Photostrip',
    price: 35000,
    poses: 3,
    prints: 2,
    badge: 'Paling Populer',
    active: true,
    description: 'Dua strip foto vertikal klasik 3 pose. Pilihan favorit untuk pasangan & sahabat.',
    accentColor: '#8E8AE0',
    tags: ['Best Seller', '3 Pose', 'Cetak 2 Lembar'],
    previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'P02',
    name: 'Quad Grid 4-Cut',
    category: 'Grid Photo',
    price: 45000,
    poses: 4,
    prints: 2,
    badge: 'Korean Style',
    active: true,
    description: 'Format grid 2x2 ala photobooth Korea dengan frame pastel minimalis modern.',
    accentColor: '#ABA7FF',
    tags: ['Korean 4-Cut', '4 Pose', 'Cetak 2 Lembar'],
    previewImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'P03',
    name: 'Single Wide Polaroid Frame',
    category: 'Polaroid',
    price: 30000,
    poses: 1,
    prints: 1,
    badge: 'Single Shot',
    active: true,
    description: 'Satu jepretan lanskap dengan sentuhan frame polaroid estetik dan ruang tanda tangan.',
    accentColor: '#605A7D',
    tags: ['Polaroid', '1 Pose Besar', 'Cetak 1 Lembar'],
    previewImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'P04',
    name: 'VIP Deluxe Strip + Soft File',
    category: 'Paket Spesial',
    price: 60000,
    poses: 6,
    prints: 4,
    badge: 'Paket Komplit',
    active: true,
    description: 'Pengalaman maksimal 6 pose bebas, 4 strip cetak premium, dan seluruh file HD dikirim ke email.',
    accentColor: '#2A2545',
    tags: ['VIP All Access', '6 Pose', 'Cetak 4 Lembar', 'Cloud HD'],
    previewImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80'
  }
])

// Assets (Frames & Stickers)
export const assetFrames = ref([
  { id: 'F01', name: 'Lavender Ethereal Wave', category: 'Pastel Minimal', uses: 842, file: 'frame_lavender_wave.svg', active: true },
  { id: 'F02', name: 'Y2K Cyber Chrome Star', category: 'Trendy Y2K', uses: 1205, file: 'frame_y2k_chrome.svg', active: true },
  { id: 'F03', name: 'Soft Cream Vintage Film', category: 'Vintage', uses: 620, file: 'frame_vintage_film.svg', active: true },
  { id: 'F04', name: 'Midnight Indigo Geometric', category: 'Modern Dark', uses: 490, file: 'frame_indigo_geom.svg', active: true },
  { id: 'F05', name: 'Sweet Daisy Pastel Spring', category: 'Cute & Floral', uses: 774, file: 'frame_daisy_spring.svg', active: true },
])

export const assetStickers = ref([
  { id: 'S01', name: 'Sparkle Star Periwinkle', category: 'Sparkles', uses: 3210, icon: 'auto_awesome', active: true },
  { id: 'S02', name: 'Heart Ribbon Candy', category: 'Romantic', uses: 2840, icon: 'favorite', active: true },
  { id: 'S03', name: 'Y2K Flame Acid', category: 'Retro Y2K', uses: 1980, icon: 'local_fire_department', active: true },
  { id: 'S04', name: 'Cute Bunny & Kitty', category: 'Cute Emoticons', uses: 2450, icon: 'pets', active: true },
  { id: 'S05', name: 'Vintage Camera Lens', category: 'Accessories', uses: 1420, icon: 'photo_camera', active: true },
  { id: 'S06', name: 'Music Melody Groove', category: 'Fun Vibes', uses: 1110, icon: 'music_note', active: true },
])

// Sessions History (Data Sesi Photobooth)
export const sessions = ref([
  {
    id: 'SES-20261025-089',
    booth: 'Booth #01',
    customer: 'Nadia & Farhan',
    preset: 'Twin Classic Strips (2x3)',
    timestamp: '25 Okt 2026, 01:42 WIB',
    amount: 35000,
    paymentMethod: 'QRIS BCA',
    status: 'Lunas',
    printStatus: 'Tercetak (2/2)',
    posesCount: 3,
    downloadCount: 3,
    preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'SES-20261025-088',
    booth: 'Booth #01',
    customer: 'Kezia Putri & Squad',
    preset: 'Quad Grid 4-Cut',
    timestamp: '25 Okt 2026, 01:28 WIB',
    amount: 45000,
    paymentMethod: 'GoPay QRIS',
    status: 'Lunas',
    printStatus: 'Tercetak (2/2)',
    posesCount: 4,
    downloadCount: 5,
    preview: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'SES-20261025-087',
    booth: 'Booth #01',
    customer: 'Guest #4102',
    preset: 'Single Wide Polaroid',
    timestamp: '25 Okt 2026, 01:10 WIB',
    amount: 30000,
    paymentMethod: 'ShopeePay',
    status: 'Lunas',
    printStatus: 'Tercetak (1/1)',
    posesCount: 1,
    downloadCount: 1,
    preview: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'SES-20261025-086',
    booth: 'Booth #01',
    customer: 'Rian Pratama',
    preset: 'VIP Deluxe Strip',
    timestamp: '25 Okt 2026, 00:51 WIB',
    amount: 60000,
    paymentMethod: 'QRIS Mandiri',
    status: 'Lunas',
    printStatus: 'Tercetak (4/4)',
    posesCount: 6,
    downloadCount: 7,
    preview: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'SES-20261025-085',
    booth: 'Booth #01',
    customer: 'Anonim Pelanggan',
    preset: 'Twin Classic Strips (2x3)',
    timestamp: '24 Okt 2026, 23:30 WIB',
    amount: 35000,
    paymentMethod: 'QRIS',
    status: 'Kedaluwarsa',
    printStatus: 'Batal Cetak',
    posesCount: 3,
    downloadCount: 0,
    preview: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'SES-20261025-084',
    booth: 'Booth #01',
    customer: 'Dinda Amanda',
    preset: 'Quad Grid 4-Cut',
    timestamp: '24 Okt 2026, 22:58 WIB',
    amount: 45000,
    paymentMethod: 'QRIS Dana',
    status: 'Lunas',
    printStatus: 'Tercetak (2/2)',
    posesCount: 4,
    downloadCount: 4,
    preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  }
])

// Helpers for formatted currency
export function formatRupiah(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID')
}
