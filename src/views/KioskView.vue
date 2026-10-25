<template>
  <div class="min-h-screen bg-surface flex flex-col select-none relative overflow-hidden">
    <!-- Ethereal Ambient Gradient Background Blobs -->
    <div class="absolute -top-32 -left-32 w-[520px] h-[520px] bg-secondary-fixed/35 rounded-full blur-[120px] pointer-events-none -z-0"></div>
    <div class="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-primary-fixed/25 rounded-full blur-[140px] pointer-events-none -z-0"></div>
    <div class="absolute -bottom-24 left-1/4 w-[480px] h-[480px] bg-secondary-container/20 rounded-full blur-[120px] pointer-events-none -z-0"></div>

    <!-- Top Terminal Kiosk Bar -->
    <header class="w-full px-8 py-5 flex items-center justify-between z-20 bg-surface-container-lowest/60 backdrop-blur-md border-b border-surface-container-high/50 shadow-soft-sm">
      <div class="flex items-center gap-3">
        <router-link to="/" class="flex items-center gap-2 group">
          <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-soft-sm group-hover:scale-105 transition-transform">
            <span class="material-symbols-outlined text-[22px]">auto_awesome</span>
          </div>
          <div>
            <span class="text-base font-bold text-primary tracking-tight block">Angkasa</span>
            <span class="text-[10px] uppercase font-bold text-secondary tracking-widest block -mt-0.5">Photostudio Kiosk</span>
          </div>
        </router-link>
      </div>

      <!-- Kiosk Status Indicators -->
      <div class="flex items-center gap-3">
        <div class="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/80 border border-surface-container-high/60 shadow-xs text-xs">
          <span class="material-symbols-outlined text-[16px] text-on-surface-variant">storefront</span>
          <span class="text-on-surface-variant font-medium">Booth #01 • Grand Atrium</span>
        </div>

        <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/80 border border-surface-container-high/60 shadow-xs text-xs">
          <span class="w-2 h-2 rounded-full" :class="isWebcamActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'"></span>
          <span class="text-primary font-bold">{{ isWebcamActive ? 'Kamera Real-Time Siap' : 'Kamera Standar' }}</span>
        </div>

        <!-- Exit to Landing -->
        <router-link
          to="/"
          class="px-4 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-primary transition-colors border border-surface-container-high/60"
        >
          Keluar Kiosk
        </router-link>
      </div>
    </header>

    <!-- Main Kiosk Body -->
    <main class="flex-1 w-full max-w-6xl mx-auto px-6 py-8 flex flex-col justify-center items-center relative z-10">

      <!-- ================= 1. STAGE: IDLE ================= -->
      <div
        v-if="stage === 'idle'"
        class="w-full flex flex-col items-center justify-between text-center py-6 cursor-pointer"
        @click="stage = 'select-preset'"
      >
        <div class="mb-6">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-xs font-bold text-secondary shadow-soft-sm border border-secondary-fixed mb-4">
            <span class="material-symbols-outlined text-[16px]">stars</span>
            <span>Sentuh Layar Mana Saja untuk Memulai</span>
          </span>
          <h1 class="text-4xl lg:text-6xl font-light text-primary tracking-tight max-w-3xl leading-tight">
            Abadikan Momen Manismu <br />
            <span class="text-secondary font-normal">di Angkasa Photobooth</span>
          </h1>
        </div>

        <!-- Floating Photostrip Display -->
        <div class="relative w-full max-w-xl h-72 flex items-center justify-center my-6">
          <div class="absolute -left-4 sm:left-12 top-2 w-44 bg-white p-3 rounded-2xl shadow-soft-xl -rotate-6 transform transition-transform duration-500 border border-surface-container-high">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-secondary-fixed/80 -rotate-2 rounded-xs shadow-xs"></div>
            <div class="space-y-1.5">
              <div class="w-full h-24 rounded-xl overflow-hidden bg-surface-container">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" class="w-full h-full object-cover" />
              </div>
              <div class="w-full h-24 rounded-xl overflow-hidden bg-surface-container">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div class="absolute right-0 sm:right-16 top-6 w-44 bg-white p-3 rounded-2xl shadow-soft-xl rotate-6 transform transition-transform duration-500 border border-secondary/30 z-10">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-primary-fixed/80 rotate-2 rounded-xs shadow-xs"></div>
            <div class="space-y-1.5">
              <div class="w-full h-24 rounded-xl overflow-hidden bg-surface-container">
                <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80" class="w-full h-full object-cover" />
              </div>
              <div class="w-full h-24 rounded-xl overflow-hidden bg-surface-container">
                <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <!-- Big Pulsing Touch CTA -->
        <button
          class="mt-6 px-10 py-5 rounded-full bg-primary-container text-on-primary font-bold text-base shadow-soft-xl hover:scale-105 transition-all flex items-center gap-3 animate-pulse"
        >
          <span class="material-symbols-outlined text-[24px]">touch_app</span>
          <span>Sentuh Layar untuk Mulai Foto</span>
        </button>
      </div>

      <!-- ================= 2. STAGE: SELECT PRESET ================= -->
      <div v-else-if="stage === 'select-preset'" class="w-full max-w-5xl">
        <div class="text-center mb-8">
          <span class="text-xs uppercase font-bold tracking-widest text-secondary block mb-1">Langkah 1 dari 4</span>
          <h2 class="text-3xl font-light text-primary">Pilih Paket Format Foto</h2>
          <p class="text-xs text-on-surface-variant mt-1">Sentuh salah satu paket untuk membuka kamera bilik studio</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            v-for="item in presets"
            :key="item.id"
            @click="selectPreset(item)"
            class="p-5 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm hover:shadow-soft-xl hover:border-secondary transition-all cursor-pointer flex flex-col justify-between group"
            :class="selectedPreset?.id === item.id ? 'ring-2 ring-secondary border-secondary bg-secondary-fixed/10' : ''"
          >
            <div>
              <div class="w-full h-36 rounded-2xl overflow-hidden mb-4 bg-surface-container">
                <img :src="item.previewImage" :alt="item.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary-fixed text-on-secondary-fixed block w-fit mb-2">
                {{ item.category }}
              </span>
              <h3 class="text-base font-bold text-primary mb-1">{{ item.name }}</h3>
              <p class="text-xs text-on-surface-variant mb-4 leading-relaxed line-clamp-2">{{ item.description }}</p>
            </div>

            <div class="pt-3 border-t border-surface-container-high/60 flex items-center justify-between">
              <div>
                <span class="text-[10px] text-on-surface-variant block uppercase font-bold">Biaya</span>
                <span class="text-base font-bold text-primary">{{ formatRupiah(item.price) }}</span>
              </div>
              <span class="w-8 h-8 rounded-full bg-surface-container-low group-hover:bg-primary-container group-hover:text-on-primary flex items-center justify-center transition-colors">
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <button
            @click="stage = 'idle'"
            class="px-6 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-primary transition-colors cursor-pointer"
          >
            Kembali
          </button>
        </div>
      </div>

      <!-- ================= 3. STAGE: CAMERA REAL-TIME COUNTDOWN ================= -->
      <div v-else-if="stage === 'camera'" class="w-full max-w-4xl flex flex-col items-center">
        <!-- Flash Effect Overlay -->
        <div
          v-if="isFlashing"
          class="fixed inset-0 bg-white z-[999] pointer-events-none transition-opacity duration-150"
        ></div>

        <!-- Camera Header Info -->
        <div class="w-full flex items-center justify-between mb-3 px-4">
          <div class="flex items-center gap-3">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span class="text-xs font-bold text-primary tracking-wide">
              {{ isWebcamActive ? 'LIVE WEBCAM REAL-TIME' : 'SIMULASI STUDIO' }}
            </span>
            <span v-if="isWebcamActive" class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Mirror HD
            </span>
          </div>

          <div class="flex items-center gap-4">
            <span class="text-sm font-bold text-secondary">Pose {{ currentPose }} dari {{ selectedPreset.poses }}</span>
            <button
              @click="toggleCameraSource"
              class="px-3 py-1 rounded-full bg-surface-container text-[11px] font-semibold text-primary hover:bg-surface-container-high transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Ganti antara Webcam Real-Time dan Simulasi"
            >
              <span class="material-symbols-outlined text-[14px]">videocam</span>
              <span>{{ isWebcamActive ? 'Ganti ke Simulasi' : 'Buka Webcam' }}</span>
            </button>
          </div>
        </div>

        <!-- Camera Viewfinder Box -->
        <div class="relative w-full aspect-[16/9] max-h-[500px] rounded-3xl overflow-hidden bg-slate-950 shadow-soft-xl border-4 border-surface-container-lowest flex items-center justify-center">

          <!-- Real-Time Video Element (Mirrored horizontally like a selfie mirror) -->
          <video
            v-show="isWebcamActive"
            ref="videoElement"
            autoplay
            playsinline
            muted
            class="w-full h-full object-cover transform -scale-x-100"
          ></video>

          <!-- Fallback Simulated Live Camera Feed -->
          <img
            v-if="!isWebcamActive"
            :src="simulatedPoseImages[currentPose - 1] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80'"
            class="w-full h-full object-cover filter contrast-105"
          />

          <!-- Viewfinder Rule of Thirds Grid Overlay -->
          <div class="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-25 border border-white/20">
            <div class="border-r border-b border-white/30"></div>
            <div class="border-r border-b border-white/30"></div>
            <div class="border-b border-white/30"></div>
            <div class="border-r border-b border-white/30"></div>
            <div class="border-r border-b border-white/30"></div>
            <div class="border-b border-white/30"></div>
            <div class="border-r border-b border-white/30"></div>
            <div class="border-r border-b border-white/30"></div>
            <div></div>
          </div>

          <!-- Camera Status Badge -->
          <div class="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-mono flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>REC 60FPS</span>
          </div>

          <!-- Big Animated Countdown Number -->
          <div
            v-if="countdown > 0"
            class="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-xs z-30"
          >
            <div class="w-32 h-32 rounded-full bg-primary-container/95 text-on-primary flex items-center justify-center text-6xl font-bold shadow-soft-xl border-4 border-secondary animate-bounce">
              {{ countdown }}
            </div>
          </div>

          <div
            v-if="countdown === 0 && !isFlashing"
            class="absolute bottom-6 px-6 py-2 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-md"
          >
            Bersiap untuk jepretan... Senyum ke arah lensa! ✨
          </div>
        </div>

        <!-- Controls below camera -->
        <div class="mt-6 flex items-center gap-4">
          <button
            @click="takeManualPhoto"
            class="px-8 py-3.5 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span class="material-symbols-outlined text-[20px]">shutter_speed</span>
            <span>Ambil Pose {{ currentPose }} Sekarang</span>
          </button>
        </div>
      </div>

      <!-- ================= 4. STAGE: QR CONNECT / PILIH JALUR ================= -->
      <div v-else-if="stage === 'qr-connect'" class="w-full max-w-3xl text-center">
        <span class="text-xs uppercase font-bold tracking-widest text-secondary block mb-1">Langkah 2 dari 4</span>
        <h2 class="text-3xl font-light text-primary mb-2">Seluruh Pose Berhasil Diambil!</h2>
        <p class="text-xs text-on-surface-variant max-w-md mx-auto mb-8">Scan QR dengan HP kamu untuk mendekorasi foto, atau langsung hias di layar booth ini.</p>

        <!-- QR dengan URL dinamis ke IP lokal -->
        <div class="p-8 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-md max-w-sm mx-auto flex flex-col items-center mb-8">
          <div class="mb-3 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Scan dari HP — Jaringan WiFi yang Sama</span>
          </div>
          <!-- QR Mockup -->
          <div class="p-4 bg-white rounded-2xl shadow-soft-sm border border-surface-container-high mb-4">
            <img :src="mobileEditorQR" alt="QR Code Editor Mobile" class="w-44 h-44" />
          </div>
          <span class="text-[10px] font-mono bg-surface-container px-3 py-1.5 rounded-full text-primary break-all">{{ mobileEditorUrl }}</span>
          <span class="text-[10px] text-on-surface-variant mt-2">Buka di browser HP → dekorasi → bayar</span>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4">
          <button
            @click="stage = 'live-decor'"
            class="px-8 py-3.5 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-md hover:scale-102 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Hias di Layar Kiosk Ini</span>
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      <!-- ================= 5. STAGE: LIVE DECORATION WITH REAL PHOTOS ================= -->
      <div v-else-if="stage === 'live-decor'" class="w-full max-w-4xl">
        <div class="text-center mb-6">
          <span class="text-xs uppercase font-bold tracking-widest text-secondary block mb-1">Langkah 3 dari 4</span>
          <h2 class="text-2xl font-light text-primary">Pratinjau Hasil Jepretan Nyata</h2>
          <p class="text-xs text-on-surface-variant mt-1">Pilih frame warna dan dekorasi stiker favoritmu</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
          <!-- Photostrip Workspace (renders actual captured photos!) -->
          <div class="md:col-span-1 flex justify-center">
            <div
              class="w-56 p-3.5 pb-6 rounded-3xl shadow-soft-xl border border-secondary/40 relative transition-colors duration-300"
              :style="{ backgroundColor: selectedFrameColor }"
            >
              <div class="space-y-2">
                <div
                  v-for="(photo, pIdx) in displayPhotos"
                  :key="pIdx"
                  class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container relative shadow-xs"
                >
                  <img :src="photo" class="w-full h-full object-cover" />
                  <!-- Placed Stickers on Photo -->
                  <div v-if="appliedStickers.includes(pIdx)" class="absolute top-2 right-2 text-xl drop-shadow-md animate-pulse">
                    {{ selectedStickerEmoji }}
                  </div>
                </div>
              </div>

              <!-- Strip Brand Tag -->
              <div class="mt-3.5 flex items-center justify-between px-1 text-[9px] font-mono tracking-wider font-bold" :class="selectedFrameColor === '#2a2545' ? 'text-white/80' : 'text-primary/70'">
                <span>ANGKASA PHOTOBOOTH</span>
                <span>2026</span>
              </div>
            </div>
          </div>

          <!-- Decoration Controls -->
          <div class="md:col-span-2 space-y-6">
            <div class="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm space-y-5">
              <div>
                <h4 class="text-xs font-bold text-primary uppercase tracking-wider mb-2">Pilih Warna Frame Strip</h4>
                <div class="flex items-center gap-3">
                  <button
                    v-for="color in frameColors"
                    :key="color.hex"
                    @click="selectedFrameColor = color.hex"
                    class="w-10 h-10 rounded-full border-2 shadow-xs transition-transform hover:scale-110 cursor-pointer flex items-center justify-center"
                    :style="{ backgroundColor: color.hex }"
                    :class="selectedFrameColor === color.hex ? 'border-secondary ring-2 ring-secondary/30 scale-110' : 'border-surface-container-high'"
                    :title="color.name"
                  >
                    <span v-if="selectedFrameColor === color.hex" class="material-symbols-outlined text-[16px]" :class="color.hex === '#2a2545' ? 'text-white' : 'text-primary'">
                      check
                    </span>
                  </button>
                  <span class="text-xs font-medium text-on-surface-variant ml-2">
                    {{ currentFrameName }}
                  </span>
                </div>
              </div>

              <div>
                <h4 class="text-xs font-bold text-primary uppercase tracking-wider mb-2">Pilih Stiker Dekorasi</h4>
                <div class="flex items-center gap-2.5 flex-wrap">
                  <button
                    v-for="stk in stickerOptions"
                    :key="stk.emoji"
                    @click="applySticker(stk.emoji)"
                    class="px-3.5 py-2 rounded-2xl bg-surface-container-low hover:bg-secondary-fixed text-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    :class="selectedStickerEmoji === stk.emoji ? 'bg-secondary-fixed ring-2 ring-secondary' : ''"
                  >
                    <span>{{ stk.emoji }}</span>
                    <span class="text-[11px] font-semibold text-primary">{{ stk.label }}</span>
                  </button>
                </div>
                <p class="text-[11px] text-on-surface-variant mt-2">Sentuh stiker untuk menempelkan ke photostrip.</p>
              </div>
            </div>

            <button
              @click="stage = 'payment'"
              class="w-full py-4 rounded-full bg-primary-container text-on-primary font-bold text-xs shadow-soft-md hover:shadow-soft-lg hover:scale-101 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Pembayaran QRIS</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ================= 6. STAGE: PAYMENT ================= -->
      <div v-else-if="stage === 'payment'" class="w-full max-w-xl text-center">
        <span class="text-xs uppercase font-bold tracking-widest text-secondary block mb-1">Langkah 4 dari 4</span>
        <h2 class="text-3xl font-light text-primary mb-2">Pembayaran Digital QRIS</h2>
        <p class="text-xs text-on-surface-variant mb-6">Pindai kode QRIS menggunakan aplikasi e-wallet atau mobile banking apa saja.</p>

        <div class="p-8 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-xl mb-6">
          <div class="flex items-center justify-between pb-4 border-b border-surface-container-high/60 mb-6 text-xs">
            <div>
              <span class="text-on-surface-variant block">Paket:</span>
              <span class="font-bold text-primary">{{ selectedPreset.name }}</span>
            </div>
            <div class="text-right">
              <span class="text-on-surface-variant block">Total Tagihan:</span>
              <span class="text-lg font-bold text-primary">{{ formatRupiah(selectedPreset.price) }}</span>
            </div>
          </div>

          <!-- Dynamic QRIS code -->
          <div class="p-4 bg-white rounded-2xl border border-surface-container-high shadow-soft-sm inline-block mb-4">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=00020101021226680016ID.CO.QRIS.WWW01189360099900000000005204581253033605802ID5918ANGKASA+PHOTOBOOTH6012JAKARTA6304" alt="QRIS Angkasa" class="w-52 h-52 mx-auto" />
          </div>

          <div class="flex items-center justify-center gap-2 text-xs font-semibold text-secondary">
            <span class="material-symbols-outlined text-[18px]">timer</span>
            <span>Menunggu pembayaran... (04:48)</span>
          </div>
        </div>

        <button
          @click="simulatePaymentSuccess"
          class="px-8 py-3.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-soft-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px]">verified</span>
          <span>Simulasikan Pembayaran Berhasil</span>
        </button>
      </div>

      <!-- ================= 7. STAGE: PRINTING SUCCESS ================= -->
      <div v-else-if="stage === 'print-success'" class="w-full max-w-xl text-center">
        <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-soft-md">
          <span class="material-symbols-outlined text-[36px]">check_circle</span>
        </div>
        <h2 class="text-3xl font-light text-primary mb-2">Pembayaran Lunas!</h2>
        <p class="text-xs text-on-surface-variant max-w-md mx-auto mb-6">Printer DNP DS-RX1 sedang mencetak foto fisikmu. Silakan ambil hasil cetakan pada baki keluar di bawah monitor.</p>

        <!-- Print Progress Box -->
        <div class="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm mb-6 space-y-4">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-primary flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary text-[18px] animate-spin">sync</span>
              <span>Sedang Mencetak ({{ printProgress }}%)</span>
            </span>
            <span class="text-on-surface-variant font-medium">Kertas DNP Glossy Premium</span>
          </div>

          <!-- Progress Bar -->
          <div class="w-full h-3 rounded-full bg-surface-container overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-secondary to-primary-container transition-all duration-300"
              :style="{ width: `${printProgress}%` }"
            ></div>
          </div>

          <p v-if="printProgress >= 100" class="text-xs text-emerald-700 font-bold">
            ✨ Foto selesai dicetak! Lembar fisik sudah keluar di baki printer.
          </p>
        </div>

        <!-- Download & Browser Print Actions (Card B3) -->
        <div class="flex flex-wrap items-center justify-center gap-3 mb-4">
          <button
            @click="triggerBrowserPrint"
            class="px-6 py-2.5 rounded-full bg-secondary-fixed hover:bg-secondary-fixed-dim text-xs font-bold text-primary transition-all shadow-soft-sm flex items-center gap-2 cursor-pointer"
          >
            <span class="material-symbols-outlined text-[16px]">print</span>
            <span>Cetak Lewat Browser (Ctrl+P)</span>
          </button>

          <router-link
            :to="'/share/' + sessionCode"
            target="_blank"
            class="px-6 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span class="material-symbols-outlined text-[16px]">cloud_download</span>
            <span>Buka Cloud Download</span>
          </router-link>
        </div>

        <button
          @click="finishSession"
          class="px-8 py-3.5 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-md hover:shadow-soft-lg hover:scale-102 transition-all mx-auto cursor-pointer"
        >
          Selesai & Kembali ke Layar Siaga
        </button>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { presets, formatRupiah, showToast } from '@/composables/usePhotobooth'

const stage = ref('idle') // idle, select-preset, camera, qr-connect, live-decor, payment, print-success

// Dynamic mobile editor URL — uses the actual network IP so phones scanning QR can open it
const sessionCode = ref('ANGKASA-' + Math.random().toString(36).substr(2, 6).toUpperCase())
const networkHost = computed(() => {
  const hostname = window.location.hostname
  const port = window.location.port ? `:${window.location.port}` : ''
  // If kiosk is accessed from localhost, substitute with the WiFi adapter IP so phone scanning works
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `10.100.121.13${port || ':5173'}`
  }
  return window.location.host
})
const mobileEditorUrl = computed(() => {
  return `http://${networkHost.value}/editor?session=${sessionCode.value}&package=${encodeURIComponent(selectedPreset.value?.name || 'Standard')}`
})
const mobileEditorQR = computed(() => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(mobileEditorUrl.value)}`
})
const selectedPreset = ref(presets.value[0])
const currentPose = ref(1)
const countdown = ref(0)
const isFlashing = ref(false)
const capturedPhotos = ref([])
const printProgress = ref(0)

// Real-Time Camera State
const videoElement = ref(null)
const mediaStream = ref(null)
const isWebcamActive = ref(false)

// Decoration State
const selectedFrameColor = ref('#ffffff')
const selectedStickerEmoji = ref('✨')
const appliedStickers = ref([0, 1])

const frameColors = [
  { name: 'Putih Bersih', hex: '#ffffff' },
  { name: 'Lavender Pastel', hex: '#f1ebff' },
  { name: 'Sky Periwinkle', hex: '#e6deff' },
  { name: 'Midnight Indigo', hex: '#2a2545' }
]

const currentFrameName = computed(() => {
  return frameColors.find(f => f.hex === selectedFrameColor.value)?.name || 'Custom'
})

const stickerOptions = [
  { emoji: '✨', label: 'Glitter' },
  { emoji: '💖', label: 'Heart' },
  { emoji: '⭐', label: 'Bintang' },
  { emoji: '🔥', label: 'Flame' },
  { emoji: '🐱', label: 'Kitty' }
]

// Fallback images if webcam is not permitted
const simulatedPoseImages = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=80'
]

// Display photos for the strip: use real captured photos or fallback
const displayPhotos = computed(() => {
  if (capturedPhotos.value.length >= selectedPreset.value.poses) {
    return capturedPhotos.value.slice(0, selectedPreset.value.poses)
  }
  const result = [...capturedPhotos.value]
  while (result.length < selectedPreset.value.poses) {
    result.push(simulatedPoseImages[result.length % simulatedPoseImages.length])
  }
  return result
})

async function startWebcam() {
  try {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: 'user'
        },
        audio: false
      })
      mediaStream.value = stream
      isWebcamActive.value = true

      if (videoElement.value) {
        videoElement.value.srcObject = stream
      }
      showToast('Kamera webcam real-time aktif!')
    }
  } catch (err) {
    console.warn('Webcam permission not granted or device not available:', err)
    isWebcamActive.value = false
    showToast('Mode Simulasi Studio diaktifkan (kamera webcam belum diizinkan).', 'info')
  }
}

function stopWebcam() {
  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach(track => track.stop())
    mediaStream.value = null
  }
  isWebcamActive.value = false
}

function toggleCameraSource() {
  if (isWebcamActive.value) {
    stopWebcam()
    showToast('Beralih ke mode simulasi studio.')
  } else {
    startWebcam()
  }
}

function selectPreset(item) {
  selectedPreset.value = item
  capturedPhotos.value = []
  currentPose.value = 1
  stage.value = 'camera'

  // Proactively start real-time webcam feed
  startWebcam().then(() => {
    // Start pose countdown after short moment
    setTimeout(() => {
      startPoseCountdown()
    }, 800)
  })
}

function startPoseCountdown() {
  countdown.value = 3
  const interval = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      clearInterval(interval)
      triggerShutterFlash()
    }
  }, 1000)
}

function captureFrameFromWebcam() {
  if (isWebcamActive.value && videoElement.value && videoElement.value.videoWidth) {
    const canvas = document.createElement('canvas')
    canvas.width = videoElement.value.videoWidth
    canvas.height = videoElement.value.videoHeight
    const ctx = canvas.getContext('2d')
    // Mirror horizontally to match what the user sees on screen
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/jpeg', 0.95)
  }
  return simulatedPoseImages[(currentPose.value - 1) % simulatedPoseImages.length]
}

function triggerShutterFlash() {
  isFlashing.value = true

  // Capture real photo frame
  const photo = captureFrameFromWebcam()

  setTimeout(() => {
    isFlashing.value = false
    capturedPhotos.value.push(photo)

    if (currentPose.value < selectedPreset.value.poses) {
      currentPose.value++
      setTimeout(() => {
        startPoseCountdown()
      }, 1500)
    } else {
      setTimeout(async () => {
        stopWebcam()
        stage.value = 'qr-connect'
        showToast('Semua pose berhasil diambil!')

        // Sync photos to server endpoint so HP gets real captured photos
        try {
          await fetch(`/api/session/${sessionCode.value}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sessionId: sessionCode.value,
              preset: selectedPreset.value?.name,
              photos: capturedPhotos.value
            })
          })
        } catch (e) {
          console.warn('Failed to sync session photos to API:', e)
        }
      }, 1200)
    }
  }, 200)
}

function takeManualPhoto() {
  if (countdown.value > 0) {
    countdown.value = 0
  }
  triggerShutterFlash()
}

function applySticker(emoji) {
  selectedStickerEmoji.value = emoji
  appliedStickers.value = [0, 1, 2]
  showToast(`Stiker ${emoji} ditempelkan ke strip foto!`)
}

function simulatePaymentSuccess() {
  stage.value = 'print-success'
  printProgress.value = 10
  showToast('Pembayaran berhasil diverifikasi!')

  const timer = setInterval(() => {
    if (printProgress.value < 100) {
      printProgress.value += 20
    } else {
      clearInterval(timer)
      showToast('Cetak foto selesai!')
    }
  }, 400)
}

function triggerBrowserPrint() {
  window.print()
  showToast('Membuka dialog cetak browser...', 'info')
}

function downloadCapturedStrip() {
  if (capturedPhotos.value.length > 0) {
    const link = document.createElement('a')
    link.href = capturedPhotos.value[0]
    link.download = `angkasa-photobooth-${Date.now()}.jpg`
    link.click()
    showToast('Foto digital berhasil diunduh!')
  }
}

function finishSession() {
  stopWebcam()
  stage.value = 'idle'
  printProgress.value = 0
  capturedPhotos.value = []
  currentPose.value = 1
}

onMounted(() => {
  // If directly opened at camera stage
  if (stage.value === 'camera') {
    startWebcam()
  }
})

onUnmounted(() => {
  stopWebcam()
})
</script>
