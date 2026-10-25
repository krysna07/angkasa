<template>
  <AdminLayout title="Ringkasan Operasional" subtitle="Pantau performa sesi, pendapatan, dan kesehatan perangkat photobooth">
    <!-- Stat Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pendapatan Hari Ini</span>
          <div class="w-9 h-9 rounded-xl bg-secondary-fixed/50 text-secondary flex items-center justify-center">
            <span class="material-symbols-outlined text-[20px]">payments</span>
          </div>
        </div>
        <div class="text-2xl font-bold text-primary">{{ formatRupiah(todayRevenue) }}</div>
        <div class="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
          <span class="material-symbols-outlined text-[16px]">trending_up</span>
          <span>+14.8% dibanding kemarin</span>
        </div>
      </div>

      <div class="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Sesi Foto</span>
          <div class="w-9 h-9 rounded-xl bg-primary-fixed/50 text-primary flex items-center justify-center">
            <span class="material-symbols-outlined text-[20px]">photo_camera</span>
          </div>
        </div>
        <div class="text-2xl font-bold text-primary">{{ totalSessionsToday }} Sesi</div>
        <div class="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
          <span class="material-symbols-outlined text-[16px]">check_circle</span>
          <span>96% tingkat pembayaran sukses</span>
        </div>
      </div>

      <div class="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Rata-rata Durasi Sesi</span>
          <div class="w-9 h-9 rounded-xl bg-secondary-container/40 text-on-secondary-container flex items-center justify-center">
            <span class="material-symbols-outlined text-[20px]">timer</span>
          </div>
        </div>
        <div class="text-2xl font-bold text-primary">3 Menit 42 Detik</div>
        <div class="mt-2 flex items-center gap-1.5 text-[11px] text-on-surface-variant">
          <span class="material-symbols-outlined text-[16px]">speed</span>
          <span>Alur dekorasi lancar & cepat</span>
        </div>
      </div>

      <div class="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Kapasitas Kertas DNP</span>
          <div class="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <span class="material-symbols-outlined text-[20px]">print</span>
          </div>
        </div>
        <div class="text-2xl font-bold text-primary">{{ kioskStatus.printer.paperRemaining }} / {{ kioskStatus.printer.totalCapacity }}</div>
        <div class="mt-2 flex items-center gap-1.5 text-[11px] text-amber-700 font-semibold">
          <span class="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>Cukup untuk ~200 sesi cetak</span>
        </div>
      </div>
    </div>

    <!-- Chart & Hardware Status Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <!-- Session Activity Trend -->
      <div class="lg:col-span-2 p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm flex flex-col justify-between">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-base font-bold text-primary">Aktivitas Sesi Photobooth</h3>
            <p class="text-xs text-on-surface-variant">Jumlah pengunjung dan foto yang dicetak</p>
          </div>

          <!-- Time Range Selector -->
          <div class="flex items-center gap-1 p-1 bg-surface-container-low rounded-full border border-surface-container-high/60">
            <button
              v-for="range in ['Harian', 'Mingguan', 'Bulanan']"
              :key="range"
              @click="selectedRange = range"
              class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
              :class="selectedRange === range ? 'bg-primary-container text-on-primary shadow-soft-sm' : 'text-on-surface-variant hover:text-primary'"
            >
              {{ range }}
            </button>
          </div>
        </div>

        <!-- Simulated Visual Bar Chart -->
        <div class="h-56 flex items-end justify-between gap-3 pt-6 px-2 border-b border-surface-container-high/50">
          <div
            v-for="(bar, idx) in chartData"
            :key="idx"
            class="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div class="relative w-full flex justify-center">
              <span class="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-primary-container text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs pointer-events-none">
                {{ bar.value }} sesi
              </span>
              <div
                class="w-full max-w-[36px] rounded-t-xl transition-all duration-500 group-hover:brightness-95"
                :style="{ height: `${(bar.value / maxChartValue) * 160}px` }"
                :class="idx === chartData.length - 1 ? 'bg-secondary' : 'bg-secondary-fixed'"
              ></div>
            </div>
            <span class="text-[11px] font-semibold text-on-surface-variant">{{ bar.label }}</span>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-between text-xs text-on-surface-variant">
          <span>Puncak kepadatan: 19:00 - 21:00 WIB</span>
          <span class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-secondary inline-block"></span> Periode Berjalan
            <span class="w-3 h-3 rounded-full bg-secondary-fixed inline-block ml-2"></span> Sebelumnya
          </span>
        </div>
      </div>

      <!-- Hardware & Terminal Health -->
      <div class="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-bold text-primary">Kesehatan Perangkat</h3>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Normal</span>
          </div>
          <p class="text-xs text-on-surface-variant mb-6">Status koneksi kamera, printer foto, dan terminal pembayaran.</p>

          <div class="space-y-4">
            <div class="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-secondary text-[20px]">photo_camera</span>
                <div>
                  <h4 class="text-xs font-bold text-primary">{{ kioskStatus.camera.name }}</h4>
                  <p class="text-[10px] text-on-surface-variant">{{ kioskStatus.camera.resolution }} • {{ kioskStatus.camera.fps }} FPS</p>
                </div>
              </div>
              <span class="text-[11px] font-semibold text-emerald-600">Optimal</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-primary text-[20px]">print</span>
                <div>
                  <h4 class="text-xs font-bold text-primary">{{ kioskStatus.printer.name }}</h4>
                  <p class="text-[10px] text-on-surface-variant">Sisa Kertas: {{ kioskStatus.printer.paperRemaining }} lembar</p>
                </div>
              </div>
              <span class="text-[11px] font-semibold text-emerald-600">Siap Cetak</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-secondary text-[20px]">qr_code_scanner</span>
                <div>
                  <h4 class="text-xs font-bold text-primary">Gateway Pembayaran</h4>
                  <p class="text-[10px] text-on-surface-variant">{{ kioskStatus.payment.gateway }}</p>
                </div>
              </div>
              <span class="text-[11px] font-semibold text-emerald-600">Aktif (18ms)</span>
            </div>
          </div>
        </div>

        <router-link
          to="/admin/pengaturan"
          class="w-full mt-6 py-2.5 rounded-2xl bg-surface-container hover:bg-surface-container-high text-primary text-xs font-semibold text-center border border-surface-container-high/60 transition-colors"
        >
          Konfigurasi Perangkat
        </router-link>
      </div>
    </div>

    <!-- Sesi Terkini Table -->
    <div class="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-base font-bold text-primary">Sesi Foto Terkini</h3>
          <p class="text-xs text-on-surface-variant">Transaksi dan cetakan terbaru di bilik photobooth</p>
        </div>

        <router-link
          to="/admin/riwayat"
          class="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline"
        >
          <span>Lihat Seluruh Riwayat</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </router-link>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-surface-container-high/60 text-on-surface-variant uppercase text-[10px] font-bold tracking-wider">
              <th class="pb-3 px-4">ID Sesi</th>
              <th class="pb-3 px-4">Pelanggan</th>
              <th class="pb-3 px-4">Paket Preset</th>
              <th class="pb-3 px-4">Waktu</th>
              <th class="pb-3 px-4">Nominal</th>
              <th class="pb-3 px-4">Status Bayar</th>
              <th class="pb-3 px-4">Cetak</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-container-high/40">
            <tr v-for="item in sessions.slice(0, 5)" :key="item.id" class="hover:bg-surface-container-low/50 transition-colors">
              <td class="py-3.5 px-4 font-mono font-bold text-primary">{{ item.id }}</td>
              <td class="py-3.5 px-4 font-semibold text-primary">{{ item.customer }}</td>
              <td class="py-3.5 px-4 text-on-surface-variant">{{ item.preset }}</td>
              <td class="py-3.5 px-4 text-on-surface-variant">{{ item.timestamp }}</td>
              <td class="py-3.5 px-4 font-bold text-primary">{{ formatRupiah(item.amount) }}</td>
              <td class="py-3.5 px-4">
                <span
                  class="px-2.5 py-1 rounded-full text-[10px] font-bold"
                  :class="item.status === 'Lunas' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="py-3.5 px-4 text-on-surface-variant font-medium">{{ item.printStatus }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import { sessions, kioskStatus, formatRupiah } from '@/composables/usePhotobooth'

const selectedRange = ref('Harian')

const todayRevenue = computed(() => {
  return sessions.value
    .filter(s => s.status === 'Lunas')
    .reduce((sum, s) => sum + s.amount, 0)
})

const totalSessionsToday = computed(() => {
  return sessions.value.length
})

const chartData = computed(() => {
  if (selectedRange.value === 'Harian') {
    return [
      { label: '10:00', value: 12 },
      { label: '12:00', value: 28 },
      { label: '14:00', value: 24 },
      { label: '16:00', value: 36 },
      { label: '18:00', value: 52 },
      { label: '20:00', value: 68 },
      { label: '22:00', value: 41 },
    ]
  } else if (selectedRange.value === 'Mingguan') {
    return [
      { label: 'Sen', value: 120 },
      { label: 'Sel', value: 145 },
      { label: 'Rab', value: 130 },
      { label: 'Kam', value: 160 },
      { label: 'Jum', value: 220 },
      { label: 'Sab', value: 310 },
      { label: 'Min', value: 295 },
    ]
  } else {
    return [
      { label: 'Minggu 1', value: 840 },
      { label: 'Minggu 2', value: 910 },
      { label: 'Minggu 3', value: 1050 },
      { label: 'Minggu 4', value: 1240 },
    ]
  }
})

const maxChartValue = computed(() => {
  return Math.max(...chartData.value.map(d => d.value))
})
</script>
