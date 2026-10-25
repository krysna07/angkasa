<template>
  <div class="min-h-screen bg-surface flex flex-col">
    <Navbar />

    <main class="pt-28 pb-20 px-6 lg:px-12 flex-1">
      <div class="max-w-4xl mx-auto rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm p-8 lg:p-12">
        <div class="mb-8 border-b border-surface-container-high/60 pb-6">
          <router-link to="/" class="inline-flex items-center gap-1.5 text-xs text-secondary font-semibold mb-4 hover:underline">
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Kembali ke Beranda</span>
          </router-link>
          <h1 class="text-3xl font-light text-primary">Syarat & Ketentuan</h1>
          <p class="text-xs text-on-surface-variant mt-1">Terakhir diperbarui: 25 Oktober 2026</p>
        </div>

        <div class="space-y-6 text-sm text-on-surface-variant leading-relaxed font-normal">
          <section>
            <h2 class="text-base font-bold text-primary mb-2">1. Ketentuan Sesi Photobooth</h2>
            <p>Pengguna diwajibkan mematuhi panduan sesi di booth, termasuk batas durasi dekorasi dan jumlah jepretan yang ditentukan oleh masing-masing paket preset yang dipilih.</p>
          </section>

          <section>
            <h2 class="text-base font-bold text-primary mb-2">2. Pembayaran dan Pengembalian Dana</h2>
            <p>Semua pembayaran yang telah diverifikasi bersifat final. Jika terjadi kendala teknis pada mesin pencetak fisik (paper jam, tinta habis), staf operasional berhak melakukan cetak ulang tanpa biaya tambahan atau memberikan voucher sesi pengganti.</p>
          </section>

          <section>
            <h2 class="text-base font-bold text-primary mb-2">3. Batasan Konten Foto</h2>
            <p>Pengguna dilarang mengambil atau mengunggah konten bermuatan pornografi, kebencian SARA, atau konten terlarang menurut hukum yang berlaku di Republik Indonesia saat menggunakan fitur photobooth Angkasa.</p>
          </section>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>
