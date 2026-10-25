<template>
  <AdminLayout title="Ringkasan Operasional" subtitle="Pantau performa sesi, pendapatan, dan kesehatan perangkat photobooth">
    
    <!-- Top Action Bar & State Switcher (Demo controls for evaluation) -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-surface-container-high/60">
      <!-- UI State Switcher Demo Toggle -->
      <div class="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-2xl border border-surface-container-high/60 text-xs">
        <span class="text-[10px] font-bold text-on-surface-variant uppercase px-2">State UI:</span>
        <button
          v-for="st in ['normal', 'loading', 'empty', 'error']"
          :key="st"
          @click="currentUiState = st"
          class="px-2.5 py-1 rounded-xl font-semibold capitalize transition-all text-[11px]"
          :class="currentUiState === st ? 'bg-primary-container text-on-primary shadow-soft-sm' : 'text-on-surface-variant hover:text-primary'"
        >
          {{ st === 'loading' ? 'Skeleton' : st === 'empty' ? 'Kosong' : st === 'error' ? 'Error' : 'Normal' }}
        </button>
      </div>

      <!-- Export Report Button -->
      <button
        @click="showExportModal = true"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-fixed hover:bg-secondary-fixed-dim text-primary text-xs font-bold transition-all shadow-soft-sm hover:scale-[1.01]"
      >
        <span class="material-symbols-outlined text-[18px]">download</span>
        <span>Unduh Laporan Sesi</span>
      </button>
    </div>

    <!-- ==================== STATE 1: SKELETON LOADING ==================== -->
    <div v-if="currentUiState === 'loading'" class="space-y-8 animate-fade">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 space-y-3">
          <Skeleton height="14px" width="50%" />
          <Skeleton height="32px" width="80%" />
          <Skeleton height="12px" width="60%" />
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 space-y-4">
          <Skeleton height="20px" width="30%" />
          <Skeleton height="200px" width="100%" rounded="lg" />
        </div>
        <div class="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 space-y-4">
          <Skeleton height="20px" width="40%" />
          <Skeleton height="50px" width="100%" rounded="lg" />
          <Skeleton height="50px" width="100%" rounded="lg" />
          <Skeleton height="50px" width="100%" rounded="lg" />
        </div>
      </div>
    </div>

    <!-- ==================== STATE 2: ERROR STATE ==================== -->
    <div v-else-if="currentUiState === 'error'" class="p-12 rounded-3xl bg-surface-container-lowest border border-error/30 text-center max-w-lg mx-auto my-12 shadow-soft-md animate-fade">
      <div class="w-16 h-16 rounded-2xl bg-error-container text-on-error-container flex items-center justify-center mx-auto mb-4">
        <span class="material-symbols-outlined text-[32px]">cloud_off</span>
      </div>
      <h3 class="text-base font-bold text-primary mb-2">Gagal Menghubungkan ke Kiosk Booth</h3>
      <p class="text-xs text-on-surface-variant mb-6 leading-relaxed">
        Terjadi kendala saat membaca data telemetri bilik foto lokal (Koneksi timeout 5000ms). Periksa status WiFi bilik atau coba muat ulang.
      </p>
      <div class="flex items-center justify-center gap-3">
        <button
          @click="retryLoad"
          class="px-5 py-2.5 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-sm flex items-center gap-1.5"
        >
          <span class="material-symbols-outlined text-[16px]">refresh</span>
          <span>Coba Muat Ulang</span>
        </button>
        <button
          @click="currentUiState = 'normal'"
          class="px-4 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container text-primary text-xs font-semibold"
        >
          Kembali ke Normal
        </button>
      </div>
    </div>

    <!-- ==================== STATE 3: EMPTY DATA STATE ==================== -->
    <div v-else-if="currentUiState === 'empty'" class="p-12 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 text-center max-w-lg mx-auto my-12 shadow-soft-sm animate-fade">
      <div class="w-16 h-16 rounded-2xl bg-secondary-fixed/50 text-secondary flex items-center justify-center mx-auto mb-4">
        <span class="material-symbols-outlined text-[32px]">inbox</span>
      </div>
      <h3 class="text-base font-bold text-primary mb-2">Belum Ada Sesi Foto Hari Ini</h3>
      <p class="text-xs text-on-surface-variant mb-6 leading-relaxed">
        Bilik photobooth sedang dalam posisi standby dan siap melayani pengunjung baru. Sesi yang selesai akan langsung muncul di sini secara realtime.
      </p>
      <router-link
        to="/kiosk"
        target="_blank"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-sm"
      >
        <span class="material-symbols-outlined text-[16px]">open_in_new</span>
        <span>Mulai Sesi Pertama di Kiosk</span>
      </router-link>
    </div>

    <!-- ==================== STATE 4: NORMAL DASHBOARD DATA ==================== -->
    <div v-else class="space-y-8 animate-fade">
      <!-- 4 Stat Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div class="text-2xl font-bold text-primary">{{ sessions.length }} Sesi</div>
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
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Session Activity Trend -->
        <div class="lg:col-span-2 p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm flex flex-col justify-between">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-base font-bold text-primary">Aktivitas Sesi & Tren Pendapatan</h3>
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
                <span class="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-primary-container text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs pointer-events-none whitespace-nowrap">
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

      <!-- Widget Preset Terpopuler & Sesi Terkini Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Widget: Preset Terpopuler (Card 6) -->
        <div class="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base font-bold text-primary">Preset Terpopuler</h3>
              <router-link to="/admin/preset" class="text-xs font-bold text-secondary hover:underline">
                Kelola Preset
              </router-link>
            </div>
            <p class="text-xs text-on-surface-variant mb-6">Pilihan favorit pengunjung booth minggu ini</p>

            <div class="space-y-4">
              <div 
                v-for="(item, idx) in popularPresets" 
                :key="item.name"
                class="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/50"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <span class="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]"
                      :class="idx === 0 ? 'bg-amber-400 text-amber-950' : 'bg-surface-container text-on-surface-variant'"
                    >
                      #{{ idx + 1 }}
                    </span>
                    <span class="text-xs font-bold text-primary">{{ item.name }}</span>
                  </div>
                  <span class="text-xs font-bold text-secondary">{{ item.percentage }}%</span>
                </div>
                <!-- Progress bar -->
                <div class="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                  <div 
                    class="h-full rounded-full transition-all duration-500"
                    :style="{ width: item.percentage + '%', backgroundColor: item.color }"
                  ></div>
                </div>
                <div class="flex justify-between items-center mt-2 text-[10px] text-on-surface-variant">
                  <span>{{ item.count }} kali dicetak</span>
                  <span class="font-bold text-primary">{{ formatRupiah(item.revenue) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabel Sesi Terkini (Card 15) + Price Override Action (Card 9) -->
        <div class="lg:col-span-2 p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-base font-bold text-primary">Sesi Foto Terkini</h3>
              <p class="text-xs text-on-surface-variant">Aksi override harga dan status cetak bilik</p>
            </div>

            <router-link
              to="/admin/riwayat"
              class="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline"
            >
              <span>Lihat Semua</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </router-link>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-surface-container-high/60 text-on-surface-variant uppercase text-[10px] font-bold tracking-wider">
                  <th class="pb-3 px-3">ID Sesi</th>
                  <th class="pb-3 px-3">Pelanggan</th>
                  <th class="pb-3 px-3">Paket</th>
                  <th class="pb-3 px-3">Nominal</th>
                  <th class="pb-3 px-3">Status</th>
                  <th class="pb-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-container-high/40">
                <tr v-for="item in sessions.slice(0, 5)" :key="item.id" class="hover:bg-surface-container-low/50 transition-colors">
                  <td class="py-3 px-3 font-mono font-bold text-primary">{{ item.id }}</td>
                  <td class="py-3 px-3 font-semibold text-primary">{{ item.customer }}</td>
                  <td class="py-3 px-3 text-on-surface-variant">{{ item.preset }}</td>
                  <td class="py-3 px-3 font-bold text-primary">
                    <span :class="item.originalPrice ? 'text-emerald-700' : ''">{{ formatRupiah(item.amount) }}</span>
                    <span v-if="item.originalPrice" class="block text-[9px] text-on-surface-variant line-through font-normal">
                      {{ formatRupiah(item.originalPrice) }}
                    </span>
                  </td>
                  <td class="py-3 px-3">
                    <span
                      class="px-2 py-0.5 rounded-full text-[10px] font-bold"
                      :class="item.status === 'Lunas' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'"
                    >
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="py-3 px-3 text-right">
                    <!-- Price Override Button (Card 9) -->
                    <button
                      @click="openPriceOverride(item)"
                      class="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-secondary-fixed text-primary text-[11px] font-semibold border border-surface-container-high transition-colors"
                      title="Override Harga Sesi"
                    >
                      <span class="material-symbols-outlined text-[14px] align-middle mr-1">tune</span>
                      <span>Ubah Harga</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== MODAL: EXPORT REPORT (Card 10) ==================== -->
    <div v-if="showExportModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade">
      <div class="w-full max-w-md bg-surface-container-lowest rounded-3xl border border-surface-container-high/80 shadow-soft-xl p-6 sm:p-8">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-surface-container-high/60">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px]">download</span>
            </div>
            <div>
              <h3 class="text-sm font-bold text-primary">Unduh Laporan Operasional</h3>
              <p class="text-[11px] text-on-surface-variant">Ekspor riwayat transaksi & cetak bilik</p>
            </div>
          </div>
          <button @click="showExportModal = false" class="text-on-surface-variant hover:text-primary">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Filter Options -->
        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-primary mb-1.5 uppercase text-[10px] tracking-wider">Format Dokumen</label>
            <div class="grid grid-cols-3 gap-2">
              <button 
                v-for="fmt in ['Excel (.xlsx)', 'CSV (.csv)', 'PDF Summary']"
                :key="fmt"
                @click="exportForm.format = fmt"
                class="py-2 px-2.5 rounded-xl border text-center font-semibold transition-all text-[11px]"
                :class="exportForm.format === fmt ? 'bg-primary-container text-on-primary border-primary-container' : 'border-surface-container-high bg-surface-container-low text-primary'"
              >
                {{ fmt }}
              </button>
            </div>
          </div>

          <div>
            <label class="block font-bold text-primary mb-1.5 uppercase text-[10px] tracking-wider">Rentang Waktu</label>
            <select v-model="exportForm.range" class="w-full p-2.5 rounded-xl bg-surface border border-surface-container-high text-xs text-primary outline-none">
              <option value="today">Hari Ini (25 Okt 2026)</option>
              <option value="7days">7 Hari Terakhir</option>
              <option value="30days">Bulan Ini (Oktober 2026)</option>
              <option value="all">Seluruh Riwayat Sesi</option>
            </select>
          </div>

          <div class="space-y-2 pt-2 border-t border-surface-container-high/60">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="exportForm.includeRevenue" class="rounded text-secondary" />
              <span class="text-on-surface-variant">Sertakan rincian nominal pembayaran QRIS</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="exportForm.includeHardware" class="rounded text-secondary" />
              <span class="text-on-surface-variant">Sertakan log pemakaian kertas DNP DS-RX1</span>
            </label>
          </div>

          <!-- Processing Progress Bar -->
          <div v-if="isExporting" class="pt-2">
            <div class="flex justify-between text-[11px] font-semibold text-primary mb-1">
              <span>Menyusun file laporan...</span>
              <span>{{ exportProgress }}%</span>
            </div>
            <div class="w-full h-2 rounded-full bg-surface-container overflow-hidden">
              <div 
                class="h-full bg-secondary rounded-full transition-all duration-300"
                :style="{ width: exportProgress + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="mt-6 pt-4 border-t border-surface-container-high/60 flex items-center justify-end gap-3">
          <button 
            @click="showExportModal = false" 
            :disabled="isExporting"
            class="px-4 py-2 rounded-full text-xs font-semibold text-on-surface-variant hover:text-primary"
          >
            Batal
          </button>
          <button 
            @click="processExportReport"
            :disabled="isExporting"
            class="px-5 py-2.5 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-sm hover:opacity-95 flex items-center gap-1.5"
          >
            <span v-if="isExporting" class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
            <span v-else class="material-symbols-outlined text-[16px]">file_download</span>
            <span>{{ isExporting ? 'Memproses...' : 'Unduh Sekarang' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== MODAL: PRICE OVERRIDE (Card 9) ==================== -->
    <div v-if="showPriceOverrideModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade">
      <div class="w-full max-w-md bg-surface-container-lowest rounded-3xl border border-surface-container-high/80 shadow-soft-xl p-6 sm:p-8">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-surface-container-high/60">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px]">price_change</span>
            </div>
            <div>
              <h3 class="text-sm font-bold text-primary">Override Harga Sesi</h3>
              <p class="text-[11px] text-on-surface-variant">Sesi #{{ selectedSessionForOverride?.id }}</p>
            </div>
          </div>
          <button @click="showPriceOverrideModal = false" class="text-on-surface-variant hover:text-primary">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div class="space-y-4 text-xs">
          <!-- Session summary box -->
          <div class="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex justify-between items-center">
            <div>
              <p class="font-bold text-primary">{{ selectedSessionForOverride?.preset }}</p>
              <p class="text-[11px] text-on-surface-variant">{{ selectedSessionForOverride?.customer }}</p>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-on-surface-variant block uppercase font-bold">Harga Saat Ini</span>
              <span class="text-sm font-bold text-primary">{{ formatRupiah(selectedSessionForOverride?.amount || 0) }}</span>
            </div>
          </div>

          <!-- New Price Input -->
          <div>
            <label class="block font-bold text-primary mb-1.5 uppercase text-[10px] tracking-wider">Harga Baru (Rp)</label>
            <input 
              v-model.number="newPriceInput"
              type="number"
              min="0"
              step="5000"
              class="w-full p-3 rounded-2xl bg-surface border border-surface-container-high text-sm font-bold text-primary outline-none focus:border-secondary"
            />
          </div>

          <!-- Quick Discount Buttons -->
          <div class="flex gap-2">
            <button 
              @click="applyQuickDiscount(0.5)"
              class="flex-1 py-1.5 rounded-xl bg-surface-container text-primary font-semibold text-[11px] hover:bg-secondary-fixed transition-colors"
            >
              Diskon 50%
            </button>
            <button 
              @click="applyQuickDiscount(0)"
              class="flex-1 py-1.5 rounded-xl bg-surface-container text-primary font-semibold text-[11px] hover:bg-secondary-fixed transition-colors"
            >
              Gratis (VIP)
            </button>
          </div>

          <!-- Override Reason -->
          <div>
            <label class="block font-bold text-primary mb-1.5 uppercase text-[10px] tracking-wider">Alasan Penyesuaian Harga</label>
            <input 
              v-model="overrideReason"
              type="text"
              placeholder="cth: Kompensasi kertas macet / Voucher Event"
              class="w-full p-2.5 rounded-xl bg-surface border border-surface-container-high text-xs text-primary outline-none"
            />
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-surface-container-high/60 flex items-center justify-end gap-3">
          <button 
            @click="showPriceOverrideModal = false" 
            class="px-4 py-2 rounded-full text-xs font-semibold text-on-surface-variant hover:text-primary"
          >
            Batal
          </button>
          <button 
            @click="confirmPriceOverride" 
            class="px-5 py-2.5 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-sm hover:opacity-95"
          >
            Terapkan Perubahan
          </button>
        </div>
      </div>
    </div>

  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import { sessions, kioskStatus, formatRupiah, showToast } from '@/composables/usePhotobooth'

// UI States (Card 18)
const currentUiState = ref('normal') // 'normal', 'loading', 'empty', 'error'

function retryLoad() {
  currentUiState.value = 'loading'
  setTimeout(() => {
    currentUiState.value = 'normal'
    showToast('Berhasil memuat ulang data telemetri bilik!')
  }, 1000)
}

const selectedRange = ref('Harian')

const todayRevenue = computed(() => {
  return sessions.value
    .filter(s => s.status === 'Lunas')
    .reduce((sum, s) => sum + s.amount, 0)
})

// Popular Presets Widget Data (Card 6)
const popularPresets = ref([
  { name: 'Twin Classic Strips (2x3)', count: 48, percentage: 46, revenue: 1680000, color: '#8E8AE0' },
  { name: 'Quad Grid 4-Cut', count: 32, percentage: 31, revenue: 1440000, color: '#ABA7FF' },
  { name: 'Vintage Polaroid', count: 16, percentage: 15, revenue: 640000, color: '#F59E0B' },
  { name: 'Wide Panorama', count: 8, percentage: 8, revenue: 400000, color: '#10B981' }
])

// Chart data
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

// Export Report Modal Logic (Card 10)
const showExportModal = ref(false)
const isExporting = ref(false)
const exportProgress = ref(0)
const exportForm = ref({
  format: 'Excel (.xlsx)',
  range: 'today',
  includeRevenue: true,
  includeHardware: true
})

function processExportReport() {
  isExporting.value = true
  exportProgress.value = 15
  
  const interval = setInterval(() => {
    if (exportProgress.value < 100) {
      exportProgress.value += 25
    } else {
      clearInterval(interval)
      isExporting.value = false
      showExportModal.value = false
      exportProgress.value = 0

      // Trigger dummy file download
      const blob = new Blob(["ID_Sesi,Pelanggan,Paket,Waktu,Nominal,Status\nSES-089,Nadia,Twin Classic,25 Okt 2026,35000,Lunas"], { type: 'text/csv' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `laporan-angkasa-photobooth-${Date.now()}.csv`
      link.click()

      showToast(`Laporan format ${exportForm.value.format} berhasil diunduh!`)
    }
  }, 400)
}

// Price Override Modal Logic (Card 9)
const showPriceOverrideModal = ref(false)
const selectedSessionForOverride = ref(null)
const newPriceInput = ref(0)
const overrideReason = ref('')

function openPriceOverride(session) {
  selectedSessionForOverride.value = session
  newPriceInput.value = session.amount
  overrideReason.value = ''
  showPriceOverrideModal.value = true
}

function applyQuickDiscount(multiplier) {
  if (selectedSessionForOverride.value) {
    const original = selectedSessionForOverride.value.originalPrice || selectedSessionForOverride.value.amount
    newPriceInput.value = Math.round(original * multiplier)
  }
}

function confirmPriceOverride() {
  if (selectedSessionForOverride.value) {
    if (!selectedSessionForOverride.value.originalPrice) {
      selectedSessionForOverride.value.originalPrice = selectedSessionForOverride.value.amount
    }
    selectedSessionForOverride.value.amount = newPriceInput.value
    showToast(`Harga sesi ${selectedSessionForOverride.value.id} berhasil diubah jadi ${formatRupiah(newPriceInput.value)}!`)
    showPriceOverrideModal.value = false
  }
}
</script>
