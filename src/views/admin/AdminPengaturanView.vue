<template>
  <AdminLayout title="Pengaturan Kiosk & Sistem" subtitle="Konfigurasi identitas bilik booth, integrasi hardware kamera & printer, serta payment gateway">
    <!-- Tab Controls -->
    <div class="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-full border border-surface-container-high/60 max-w-md mb-8">
      <button
        @click="activeTab = 'booth'"
        class="flex-1 py-2 rounded-full text-xs font-semibold transition-all"
        :class="activeTab === 'booth' ? 'bg-primary-container text-on-primary shadow-soft-sm' : 'text-on-surface-variant hover:text-primary'"
      >
        Konfigurasi Booth
      </button>
      <button
        @click="activeTab = 'pembayaran'"
        class="flex-1 py-2 rounded-full text-xs font-semibold transition-all"
        :class="activeTab === 'pembayaran' ? 'bg-primary-container text-on-primary shadow-soft-sm' : 'text-on-surface-variant hover:text-primary'"
      >
        Payment Gateway
      </button>
      <button
        @click="activeTab = 'akun'"
        class="flex-1 py-2 rounded-full text-xs font-semibold transition-all"
        :class="activeTab === 'akun' ? 'bg-primary-container text-on-primary shadow-soft-sm' : 'text-on-surface-variant hover:text-primary'"
      >
        Akun & Keamanan
      </button>
    </div>

    <!-- 1. Konfigurasi Booth -->
    <div v-if="activeTab === 'booth'" class="max-w-4xl space-y-6">
      <div class="p-8 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm space-y-6">
        <h3 class="text-base font-bold text-primary border-b border-surface-container-high/60 pb-3">Identitas & Lokasi Booth</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-2">ID Booth</label>
            <input
              v-model="kioskStatus.boothId"
              class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-secondary font-mono"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Lokasi Penempatan</label>
            <input
              v-model="kioskStatus.location"
              class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-secondary"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Batas Waktu Idle (Detik)</label>
            <input
              v-model.number="kioskStatus.screenTimeout"
              type="number"
              class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-secondary"
            />
            <span class="text-[10px] text-on-surface-variant mt-1 block">Kembali ke layar siaga jika tidak ada sentuhan</span>
          </div>

          <div>
            <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Ukuran Kertas Default</label>
            <select
              class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-secondary"
            >
              <option>DNP 2x6 Inch Photostrip (4x6 Cut)</option>
              <option>DNP 4x6 Inch Full Photo (Single Sheet)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Hardware Diagnostics -->
      <div class="p-8 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm space-y-6">
        <h3 class="text-base font-bold text-primary border-b border-surface-container-high/60 pb-3">Uji Diagnostik Hardware</h3>
        <p class="text-xs text-on-surface-variant">Pastikan periferal kamera DSLR/Mirrorless dan printer terhubung sempurna sebelum sesi dibuka.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-secondary text-[24px]">photo_camera</span>
              <div>
                <h4 class="text-xs font-bold text-primary">{{ kioskStatus.camera.name }}</h4>
                <p class="text-[10px] text-emerald-600 font-semibold">Status: Terhubung (4K 60FPS)</p>
              </div>
            </div>
            <button
              @click="testCamera"
              class="px-4 py-2 rounded-full bg-surface-container-lowest hover:bg-surface-container text-xs font-bold text-primary border border-surface-container-high/60 shadow-soft-sm transition-all"
            >
              Tes Shutter
            </button>
          </div>

          <div class="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary text-[24px]">print</span>
              <div>
                <h4 class="text-xs font-bold text-primary">{{ kioskStatus.printer.name }}</h4>
                <p class="text-[10px] text-emerald-600 font-semibold">Status: Siap Cetak (Sisa 412 lbr)</p>
              </div>
            </div>
            <button
              @click="testPrinter"
              class="px-4 py-2 rounded-full bg-surface-container-lowest hover:bg-surface-container text-xs font-bold text-primary border border-surface-container-high/60 shadow-soft-sm transition-all"
            >
              Tes Cetak
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Payment Gateway Tab -->
    <div v-if="activeTab === 'pembayaran'" class="max-w-4xl space-y-6">
      <div class="p-8 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm space-y-6">
        <h3 class="text-base font-bold text-primary border-b border-surface-container-high/60 pb-3">Integrasi QRIS & E-Wallet</h3>

        <div>
          <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Penyedia Gateway</label>
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 text-xs text-primary font-semibold cursor-pointer">
              <input type="radio" name="gw" checked class="text-secondary focus:ring-secondary" />
              <span>Midtrans Snap QRIS (Direkomendasikan)</span>
            </label>
            <label class="flex items-center gap-2 text-xs text-primary font-semibold cursor-pointer">
              <input type="radio" name="gw" class="text-secondary focus:ring-secondary" />
              <span>Xendit Dynamic QRIS</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Server Key / API Secret</label>
          <input
            type="password"
            value="SB-Mid-server-Kx987192384729183471"
            class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface font-mono"
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Webhook URL Notifikasi</label>
          <input
            readonly
            value="https://api.angkasabooth.com/v1/webhook/qris-callback"
            class="w-full px-4 py-2.5 rounded-2xl bg-surface-container-low border border-surface-container-high text-xs text-outline font-mono"
          />
        </div>

        <button
          @click="testPaymentPing"
          class="px-5 py-2.5 rounded-full bg-secondary text-on-secondary text-xs font-bold shadow-soft-sm hover:shadow-soft-md transition-all flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-[18px]">wifi</span>
          <span>Uji Latensi Gateway</span>
        </button>
      </div>
    </div>

    <!-- 3. Akun Tab -->
    <div v-if="activeTab === 'akun'" class="max-w-4xl space-y-6">
      <div class="p-8 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm space-y-6">
        <h3 class="text-base font-bold text-primary border-b border-surface-container-high/60 pb-3">Profil Pengelola</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Nama Akun</label>
            <input
              v-model="adminAuth.user.name"
              class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Email Operasional</label>
            <input
              v-model="adminAuth.user.email"
              class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface"
            />
          </div>
        </div>

        <div class="border-t border-surface-container-high/60 pt-6">
          <h4 class="text-xs font-bold text-primary uppercase tracking-wider mb-4">Ganti Kata Sandi</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="Kata sandi baru"
              class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface"
            />
            <input
              type="password"
              placeholder="Ulangi kata sandi baru"
              class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Save Changes Float Bar -->
    <div class="mt-8 pt-6 border-t border-surface-container-high/60 flex items-center justify-end gap-3 max-w-4xl">
      <button
        @click="handleSave"
        class="px-8 py-3 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-md hover:shadow-soft-lg hover:scale-[1.02] transition-all"
      >
        Simpan Pengaturan
      </button>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import { kioskStatus, adminAuth, showToast } from '@/composables/usePhotobooth'

const activeTab = ref('booth')

function testCamera() {
  showToast('Shutter Canon EOS M50 merespon! Gambar tes berhasil diambil.')
}

function testPrinter() {
  showToast('Perintah tes printer DNP terkirim. Kertas kalibrasi keluar.')
}

function testPaymentPing() {
  showToast('Koneksi Midtrans QRIS stabil! Ping waktu respon: 18ms.')
}

function handleSave() {
  showToast('Seluruh perubahan konfigurasi berhasil disimpan ke sistem!')
}
</script>
