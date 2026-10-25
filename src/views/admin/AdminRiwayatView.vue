<template>
  <AdminLayout title="Riwayat Sesi Photobooth" subtitle="Log lengkap transaksi pelanggan, status pencetakan fisik, dan unduhan file digital">
    <!-- Filters & Search Bar -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <div class="relative flex-1 sm:w-72">
          <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari ID sesi atau nama..."
            class="w-full pl-11 pr-4 py-2.5 rounded-full bg-surface-container-lowest border border-surface-container-high text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary shadow-soft-sm"
          />
        </div>

        <!-- Status Filter Pills -->
        <div class="hidden md:flex items-center gap-1 p-1 bg-surface-container-low rounded-full border border-surface-container-high/60">
          <button
            v-for="st in ['Semua', 'Lunas', 'Kedaluwarsa']"
            :key="st"
            @click="selectedStatus = st"
            class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
            :class="selectedStatus === st ? 'bg-primary-container text-on-primary shadow-soft-sm' : 'text-on-surface-variant hover:text-primary'"
          >
            {{ st }}
          </button>
        </div>
      </div>

      <button
        @click="exportCsv"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container text-primary text-xs font-semibold border border-surface-container-high/60 transition-colors shadow-soft-sm"
      >
        <span class="material-symbols-outlined text-[18px]">download</span>
        <span>Ekspor Laporan (CSV)</span>
      </button>
    </div>

    <!-- Table Container -->
    <div class="rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="bg-surface-container-low/60 border-b border-surface-container-high/60 text-on-surface-variant uppercase text-[10px] font-bold tracking-wider">
              <th class="py-3.5 px-6">ID Sesi</th>
              <th class="py-3.5 px-6">Pelanggan</th>
              <th class="py-3.5 px-6">Paket Preset</th>
              <th class="py-3.5 px-6">Waktu Transaksi</th>
              <th class="py-3.5 px-6">Pembayaran</th>
              <th class="py-3.5 px-6">Total Biaya</th>
              <th class="py-3.5 px-6">Status Bayar</th>
              <th class="py-3.5 px-6">Cetak DNP</th>
              <th class="py-3.5 px-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-container-high/40">
            <tr
              v-for="item in filteredSessions"
              :key="item.id"
              class="hover:bg-surface-container-low/50 transition-colors cursor-pointer group"
              @click="openDetail(item)"
            >
              <td class="py-4 px-6 font-mono font-bold text-primary">{{ item.id }}</td>
              <td class="py-4 px-6 font-semibold text-primary">{{ item.customer }}</td>
              <td class="py-4 px-6 text-on-surface-variant">{{ item.preset }}</td>
              <td class="py-4 px-6 text-on-surface-variant">{{ item.timestamp }}</td>
              <td class="py-4 px-6 text-on-surface-variant font-medium">{{ item.paymentMethod }}</td>
              <td class="py-4 px-6 font-bold text-primary">{{ formatRupiah(item.amount) }}</td>
              <td class="py-4 px-6">
                <span
                  class="px-3 py-1 rounded-full text-[10px] font-bold"
                  :class="item.status === 'Lunas' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="py-4 px-6 text-on-surface-variant">{{ item.printStatus }}</td>
              <td class="py-4 px-6 text-right">
                <button
                  class="px-3 py-1.5 rounded-full bg-surface-container group-hover:bg-primary-container group-hover:text-on-primary text-[11px] font-semibold text-primary transition-all"
                >
                  Lihat Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Right-Side Detail Drawer -->
    <div
      v-if="selectedSession"
      class="fixed inset-0 z-50 flex justify-end bg-primary/30 backdrop-blur-xs transition-opacity"
      @click.self="selectedSession = null"
    >
      <div class="w-full max-w-md bg-surface-container-lowest h-full shadow-soft-xl flex flex-col justify-between border-l border-surface-container-high/80 overflow-y-auto animate-in slide-in-from-right duration-300">
        <!-- Drawer Header -->
        <div class="p-6 border-b border-surface-container-high/60 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-secondary">Rincian Sesi</span>
            <h3 class="text-base font-bold text-primary">{{ selectedSession.id }}</h3>
          </div>
          <button @click="selectedSession = null" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Drawer Content -->
        <div class="p-6 space-y-6 flex-1">
          <!-- Photostrip Preview -->
          <div class="p-4 rounded-3xl bg-surface-container-low border border-surface-container-high/60 flex flex-col items-center">
            <span class="text-xs font-bold text-on-surface-variant mb-3">Pratinjau Hasil Cetak Sesi</span>
            <div class="w-36 rounded-2xl overflow-hidden shadow-soft-md bg-white p-2 border border-surface-container-high">
              <img :src="selectedSession.preview" :alt="selectedSession.id" class="w-full aspect-[4/3] rounded-lg object-cover mb-1.5" />
              <img :src="selectedSession.preview" :alt="selectedSession.id" class="w-full aspect-[4/3] rounded-lg object-cover mb-1.5" />
              <img :src="selectedSession.preview" :alt="selectedSession.id" class="w-full aspect-[4/3] rounded-lg object-cover mb-1" />
              <div class="text-[8px] font-mono text-center text-outline tracking-wider font-bold">ANGKASA • OKT 2026</div>
            </div>
            <div class="mt-3 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span class="text-xs text-on-surface-variant">Cetak fisik terverifikasi</span>
            </div>
          </div>

          <!-- Transaction Info Card -->
          <div class="space-y-3">
            <h4 class="text-xs font-bold text-primary uppercase tracking-wider">Informasi Transaksi</h4>
            <div class="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/60 space-y-2 text-xs">
              <div class="flex justify-between">
                <span class="text-on-surface-variant">Pelanggan:</span>
                <span class="font-bold text-primary">{{ selectedSession.customer }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-on-surface-variant">Paket Terpilih:</span>
                <span class="font-semibold text-primary">{{ selectedSession.preset }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-on-surface-variant">Waktu:</span>
                <span class="text-on-surface-variant">{{ selectedSession.timestamp }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-on-surface-variant">Metode Bayar:</span>
                <span class="font-semibold text-secondary">{{ selectedSession.paymentMethod }}</span>
              </div>
              <div class="flex justify-between border-t border-surface-container-high/60 pt-2 font-bold text-sm">
                <span class="text-primary">Total Bayar:</span>
                <span class="text-primary">{{ formatRupiah(selectedSession.amount) }}</span>
              </div>
            </div>
          </div>

          <!-- Print & Cloud Logs -->
          <div class="space-y-3">
            <h4 class="text-xs font-bold text-primary uppercase tracking-wider">Log Hardware & Cloud</h4>
            <div class="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/60 space-y-2 text-xs">
              <div class="flex justify-between">
                <span class="text-on-surface-variant">Printer:</span>
                <span class="text-emerald-700 font-semibold">{{ selectedSession.printStatus }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-on-surface-variant">Unduhan Cloud:</span>
                <span class="text-primary font-medium">{{ selectedSession.downloadCount }} kali diunduh</span>
              </div>
              <div class="flex justify-between">
                <span class="text-on-surface-variant">Retensi File:</span>
                <span class="text-on-surface-variant">Aktif hingga 1 Nov 2026</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Drawer Footer Actions -->
        <div class="p-6 border-t border-surface-container-high/60 space-y-2 bg-surface-container-lowest">
          <button
            @click="handleReprint"
            class="w-full py-3 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-sm hover:shadow-soft-md transition-all flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">print</span>
            <span>Cetak Ulang Lembar Fisik</span>
          </button>

          <router-link
            :to="'/share/' + selectedSession.id"
            target="_blank"
            class="w-full py-2.5 rounded-full bg-secondary-fixed hover:bg-secondary-fixed-dim text-xs font-semibold text-primary transition-colors flex items-center justify-center gap-1.5"
          >
            <span class="material-symbols-outlined text-[16px]">open_in_new</span>
            <span>Buka Halaman Unduh (/share/{{ selectedSession.id }})</span>
          </router-link>

          <button
            @click="handleResend"
            class="w-full py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors"
          >
            Salin Tautan Cloud Foto
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import { sessions, formatRupiah, showToast } from '@/composables/usePhotobooth'

const searchQuery = ref('')
const selectedStatus = ref('Semua')
const selectedSession = ref(null)

const filteredSessions = computed(() => {
  return sessions.value.filter(s => {
    const matchesSearch = s.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          s.customer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          s.preset.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = selectedStatus.value === 'Semua' || s.status === selectedStatus.value
    return matchesSearch && matchesStatus
  })
})

function openDetail(item) {
  selectedSession.value = item
}

function handleReprint() {
  showToast(`Perintah cetak ulang untuk ${selectedSession.value.id} dikirim ke printer DNP!`)
}

function handleResend() {
  showToast('Tautan unduh cloud disalin ke papan klip!')
}

function exportCsv() {
  showToast('Laporan sesi photobooth (.CSV) berhasil diunduh!')
}
</script>
