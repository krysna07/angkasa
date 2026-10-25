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
          <h1 class="text-3xl font-light text-primary">Kebijakan Privasi</h1>
          <p class="text-xs text-on-surface-variant mt-1">Terakhir diperbarui: 25 Oktober 2026</p>
        </div>

        <div class="space-y-6 text-sm text-on-surface-variant leading-relaxed font-normal">
          <section>
            <h2 class="text-base font-bold text-primary mb-2">1. Pendahuluan</h2>
            <p>Angkasa Photobooth berkomitmen melindungi privasi pengunjung dan pengguna booth foto interaktif kami. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, memproses, dan menyimpan foto serta data transaksional Anda.</p>
          </section>

          <section>
            <h2 class="text-base font-bold text-primary mb-2">2. Data yang Dikumpulkan</h2>
            <p>Kami hanya mengumpulkan data yang diperlukan untuk menjalankan sesi photobooth, meliputi:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>File foto sementara yang diambil di dalam bilik photobooth.</li>
              <li>Data dekorasi (stiker, frame, teks) yang Anda tambahkan melalui web ponsel.</li>
              <li>Informasi transaksi pembayaran (status lunas, metode pembayaran, nomor referensi QRIS).</li>
            </ul>
          </section>

          <section>
            <h2 class="text-base font-bold text-primary mb-2">3. Penyimpanan dan Retensi Foto</h2>
            <p>Demi menjaga privasi Anda, foto digital yang disimpan di cloud kami hanya dapat diakses melalui token QR unik dan akan otomatis dihapus secara permanen dari server kami setelah 7 hari kalender sejak sesi berlangsung.</p>
          </section>

          <section>
            <h2 class="text-base font-bold text-primary mb-2">4. Hak Pengguna</h2>
            <p>Anda berhak meminta penghapusan instan atas foto Anda dengan menghubungi operator booth atau mengirimkan email ke <span class="text-primary font-medium">privasi@angkasabooth.com</span> beserta nomor ID sesi Anda.</p>
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
