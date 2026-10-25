<template>
  <div class="mobile-wrapper">
    <div class="mobile-shell">
    <!-- Ambient blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>

    <!-- Welcome Screen -->
    <div v-if="screen === 'welcome'" class="screen-center px-6 text-center">
      <div class="logo-ring mb-6">
        <span class="material-symbols-outlined text-white text-[36px]">auto_awesome</span>
      </div>
      <h1 class="text-3xl font-bold text-white mb-2 tracking-tight">Angkasa<br/><span class="text-purple-300">Photobooth</span></h1>
      <p class="text-sm text-white/50 mb-10 leading-relaxed">Foto kamu sudah siap dihias!<br/>Buat kenangan yang tak terlupakan ✨</p>

      <!-- Session Card -->
      <div class="glass-card p-5 mb-8 text-left">
        <div class="flex items-center gap-3 mb-4">
          <span class="dot-active"></span>
          <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest">Sesi Aktif</span>
        </div>
        <div class="space-y-2 text-xs">
          <div class="flex justify-between">
            <span class="text-white/40">ID Sesi</span>
            <span class="text-white font-mono font-bold">{{ sessionId }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-white/40">Paket</span>
            <span class="text-white font-semibold">{{ sessionPackage }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-white/40">Jumlah Foto</span>
            <span class="text-white font-semibold">{{ photos.length }} foto</span>
          </div>
        </div>
      </div>

      <button @click="screen = 'privacy'" class="btn-primary w-full mb-3">
        <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
        <span>Mulai Menghias</span>
      </button>
      <p class="text-[10px] text-white/30">Dengan melanjutkan, kamu menyetujui kebijakan privasi kami</p>
    </div>

    <!-- Privacy Screen -->
    <div v-else-if="screen === 'privacy'" class="screen-scroll px-5 py-6">
      <button @click="screen = 'welcome'" class="btn-back mb-6">
        <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        <span>Kembali</span>
      </button>

      <div class="text-center mb-6">
        <div class="icon-badge mx-auto mb-3">
          <span class="material-symbols-outlined text-[24px] text-purple-300">privacy_tip</span>
        </div>
        <h2 class="text-xl font-bold text-white mb-1">Kebijakan Privasi</h2>
        <p class="text-xs text-white/40">Baca sebelum melanjutkan</p>
      </div>

      <div class="glass-card p-5 mb-5 space-y-4 text-xs text-white/60 leading-relaxed">
        <div>
          <h3 class="text-white font-bold mb-1 text-sm">📸 Penggunaan Foto</h3>
          <p>Foto yang kamu ambil di booth ini hanya digunakan untuk keperluan cetak dan digital yang kamu minta. Kami tidak menyimpan foto kamu lebih dari 24 jam setelah sesi selesai.</p>
        </div>
        <div>
          <h3 class="text-white font-bold mb-1 text-sm">🔒 Keamanan Data</h3>
          <p>Semua data dan foto ditransmisikan melalui jaringan lokal yang aman dan tidak dikirimkan ke server eksternal.</p>
        </div>
        <div>
          <h3 class="text-white font-bold mb-1 text-sm">🗑️ Penghapusan Data</h3>
          <p>Data sesi secara otomatis dihapus setelah 24 jam. Kamu bisa meminta penghapusan lebih awal dengan menghubungi operator booth.</p>
        </div>
        <div>
          <h3 class="text-white font-bold mb-1 text-sm">🚫 Tidak Ada Iklan</h3>
          <p>Kami tidak menggunakan data kamu untuk keperluan iklan atau diserahkan kepada pihak ketiga manapun.</p>
        </div>
      </div>

      <!-- Consent checkbox -->
      <label class="flex items-start gap-3 mb-6 cursor-pointer">
        <div
          @click="privacyAgreed = !privacyAgreed"
          class="w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all"
          :class="privacyAgreed ? 'bg-purple-500 border-purple-400' : 'border-white/30'"
        >
          <span v-if="privacyAgreed" class="material-symbols-outlined text-white text-[14px]">check</span>
        </div>
        <span class="text-xs text-white/60 leading-relaxed">Saya telah membaca dan menyetujui kebijakan privasi Angkasa Photobooth</span>
      </label>

      <button
        @click="goToEditor"
        class="btn-primary w-full"
        :class="!privacyAgreed ? 'opacity-40 cursor-not-allowed' : ''"
        :disabled="!privacyAgreed"
      >
        <span class="material-symbols-outlined text-[20px]">check_circle</span>
        <span>Setuju & Lanjutkan ke Editor</span>
      </button>
    </div>

    <!-- Editor / Hias Screen -->
    <div v-else-if="screen === 'editor'" class="flex flex-col h-full">

      <!-- Editor Header -->
      <div class="px-4 pt-4 pb-2 flex items-center justify-between flex-shrink-0">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-xl flex items-center justify-center" style="background:linear-gradient(135deg,#7c3aed,#a855f7)">
            <span class="material-symbols-outlined text-white text-[14px]">auto_awesome</span>
          </div>
          <div>
            <span class="text-xs font-bold text-white block leading-none">Hias Fotomu</span>
            <span class="text-[9px] text-purple-300/60">{{ sessionId }}</span>
          </div>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="dot-active"></span>
          <span class="text-[10px] text-emerald-400 font-bold">SESI AKTIF</span>
        </div>
      </div>

      <!-- Tab Bar -->
      <div class="flex border-b border-white/10 flex-shrink-0">
        <button
          v-for="tab in editorTabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          class="flex-1 py-2.5 flex flex-col items-center gap-0.5 transition-all"
          :class="activeTab === tab.key ? 'text-purple-300 border-b-2 border-purple-400' : 'text-white/35'"
        >
          <span class="material-symbols-outlined text-[16px]">{{ tab.icon }}</span>
          <span class="text-[9px] font-bold uppercase tracking-wide">{{ tab.label }}</span>
        </button>
      </div>

      <!-- Main Editor Body -->
      <div class="flex-1 overflow-hidden flex flex-col min-h-0">
        <div class="flex-1 overflow-y-auto p-4">

          <!-- Photostrip Preview (always visible) -->
          <div class="flex justify-center mb-4">
            <div
              class="w-36 p-2.5 pb-4 rounded-2xl shadow-2xl relative transition-all duration-500"
              :style="{ backgroundColor: selectedFrame }"
              style="box-shadow: 0 0 30px rgba(168,85,247,0.25)"
            >
              <div class="space-y-1.5">
                <div
                  v-for="(photo, idx) in photos"
                  :key="idx"
                  class="w-full aspect-[4/3] rounded-lg overflow-hidden relative"
                  :style="{ filter: selectedFilter }"
                >
                  <img :src="photo" class="w-full h-full object-cover" />
                  <!-- Stickers -->
                  <div
                    v-for="stk in placedStickers.filter(s => s.photoIdx === idx)"
                    :key="stk.id"
                    class="absolute pointer-events-none"
                    :style="{ top: stk.y + '%', left: stk.x + '%', fontSize: stk.size + 'px', transform: 'translate(-50%,-50%) rotate(' + stk.rotation + 'deg)' }"
                  >{{ stk.emoji }}</div>
                  <!-- Text overlay -->
                  <div
                    v-if="textOnPhoto && idx === textTargetPhoto"
                    class="absolute bottom-1 left-1 right-1 text-center text-[8px] font-bold rounded px-1 py-0.5"
                    :style="{ color: textColor, backgroundColor: textBg }"
                  >{{ textOnPhoto }}</div>
                </div>
              </div>
              <!-- Custom text on strip -->
              <div v-if="stripText" class="mt-2 text-center text-[8px] font-bold px-1 truncate"
                :class="isDarkFrame ? 'text-white/70' : 'text-gray-700/80'"
              >{{ stripText }}</div>
              <div class="mt-1.5 flex justify-between px-0.5 text-[7px] font-mono"
                :class="isDarkFrame ? 'text-white/30' : 'text-gray-400/60'"
              >
                <span>ANGKASA</span><span>2026</span>
              </div>
            </div>
          </div>

          <!-- ====== TAB: STIKER ====== -->
          <div v-if="activeTab === 'stiker'">
            <p class="text-[10px] text-white/40 text-center mb-3">Ketuk stiker → langsung tempel ke foto</p>

            <!-- Category selector -->
            <div class="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
              <button
                v-for="cat in stickerCategories"
                :key="cat.name"
                @click="activeStickerCat = cat.name"
                class="flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all"
                :class="activeStickerCat === cat.name ? 'bg-purple-500 text-white' : 'bg-white/8 text-white/50'"
              >{{ cat.name }}</button>
            </div>

            <div class="grid grid-cols-6 gap-2 mb-4">
              <button
                v-for="stk in currentStickerList"
                :key="stk"
                @click="addSticker(stk)"
                class="aspect-square rounded-xl flex items-center justify-center text-xl transition-all active:scale-75 bg-white/5 hover:bg-purple-500/20"
              >{{ stk }}</button>
            </div>

            <!-- Placed stickers list -->
            <div v-if="placedStickers.length > 0" class="glass-card p-3">
              <div class="flex justify-between items-center mb-2">
                <span class="text-[10px] font-bold text-white/50 uppercase tracking-wide">Terpasang ({{ placedStickers.length }})</span>
                <button @click="placedStickers = []" class="text-[10px] text-rose-400 font-bold">Hapus Semua</button>
              </div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="(stk, i) in placedStickers"
                  :key="stk.id"
                  @click="placedStickers.splice(i, 1)"
                  class="text-lg active:opacity-50"
                >{{ stk.emoji }}</span>
              </div>
              <p class="text-[9px] text-white/25 mt-1.5">Ketuk emoji di atas untuk menghapus</p>
            </div>
          </div>

          <!-- ====== TAB: FRAME ====== -->
          <div v-if="activeTab === 'frame'">
            <p class="text-[10px] text-white/40 text-center mb-4">Pilih warna latar photostrip</p>
            <div class="grid grid-cols-4 gap-3 mb-4">
              <button
                v-for="f in frames"
                :key="f.hex"
                @click="selectedFrame = f.hex"
                class="flex flex-col items-center gap-1.5 group"
              >
                <div
                  class="w-full aspect-square rounded-2xl border-2 transition-all flex items-center justify-center"
                  :style="{ backgroundColor: f.hex }"
                  :class="selectedFrame === f.hex ? 'border-purple-400 scale-105 shadow-purple-500/40 shadow-lg' : 'border-white/10'"
                >
                  <span v-if="selectedFrame === f.hex" class="material-symbols-outlined text-[20px]" :class="f.dark ? 'text-white' : 'text-gray-800'">check</span>
                </div>
                <span class="text-[9px] text-white/50 text-center leading-tight">{{ f.name }}</span>
              </button>
            </div>

            <!-- Frame pattern selector -->
            <div class="glass-card p-4 mb-4">
              <h4 class="text-xs font-bold text-white/60 mb-3 uppercase tracking-wide">Tambahan Pola</h4>
              <div class="flex gap-2 flex-wrap">
                <button
                  v-for="pat in patterns"
                  :key="pat.name"
                  @click="selectedPattern = pat.name"
                  class="px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all"
                  :class="selectedPattern === pat.name ? 'bg-purple-500 text-white' : 'bg-white/8 text-white/50'"
                >{{ pat.label }}</button>
              </div>
            </div>
          </div>

          <!-- ====== TAB: FILTER ====== -->
          <div v-if="activeTab === 'filter'">
            <p class="text-[10px] text-white/40 text-center mb-4">Sentuh filter untuk pratinjau langsung</p>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="f in filters"
                :key="f.name"
                @click="selectedFilter = f.value"
                class="flex flex-col items-center gap-1.5 group"
              >
                <div
                  class="w-full aspect-video rounded-xl overflow-hidden border-2 transition-all"
                  :class="selectedFilter === f.value ? 'border-purple-400 scale-105' : 'border-white/10'"
                >
                  <img :src="photos[0]" class="w-full h-full object-cover" :style="{ filter: f.value }" />
                </div>
                <span class="text-[9px] font-semibold text-white/60">{{ f.name }}</span>
              </button>
            </div>
          </div>

          <!-- ====== TAB: TEKS ====== -->
          <div v-if="activeTab === 'teks'">
            <div class="space-y-4">
              <!-- Caption strip -->
              <div class="glass-card p-4">
                <h4 class="text-xs font-bold text-white mb-2">📝 Teks di Bawah Strip</h4>
                <input
                  v-model="stripText"
                  type="text" maxlength="28"
                  placeholder="cth: Best Day Ever ✨"
                  class="input-field mb-2"
                />
                <div class="flex gap-2 flex-wrap">
                  <button v-for="p in textPresets" :key="p" @click="stripText = p"
                    class="px-2.5 py-1 rounded-full bg-white/5 text-[10px] text-white/60 hover:bg-purple-500/20 hover:text-purple-300 transition-colors">
                    {{ p }}
                  </button>
                </div>
              </div>

              <!-- Text on photo -->
              <div class="glass-card p-4">
                <h4 class="text-xs font-bold text-white mb-2">🖊️ Teks di Atas Foto</h4>
                <input
                  v-model="textOnPhoto"
                  type="text" maxlength="20"
                  placeholder="cth: Luv u 💕"
                  class="input-field mb-2"
                />
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-[10px] text-white/50">Foto ke:</span>
                  <div class="flex gap-1.5">
                    <button v-for="n in photos.length" :key="n" @click="textTargetPhoto = n - 1"
                      class="w-7 h-7 rounded-full text-[10px] font-bold transition-all"
                      :class="textTargetPhoto === n-1 ? 'bg-purple-500 text-white' : 'bg-white/8 text-white/50'">
                      {{ n }}
                    </button>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-[10px] text-white/50">Warna:</span>
                  <div class="flex gap-1.5">
                    <button v-for="c in textColors" :key="c.val"
                      @click="textColor = c.val"
                      class="w-6 h-6 rounded-full border-2 transition-all"
                      :style="{ backgroundColor: c.val }"
                      :class="textColor === c.val ? 'border-white scale-110' : 'border-white/20'"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ====== TAB: GAMBAR ====== -->
          <div v-if="activeTab === 'gambar'">
            <p class="text-[10px] text-white/40 text-center mb-4">Tambahkan ornamen grafis ke strip</p>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="img in decorImages"
                :key="img.name"
                @click="addDecorImage(img)"
                class="glass-card p-3 flex flex-col items-center gap-2 active:scale-95 transition-all"
              >
                <div class="text-3xl">{{ img.preview }}</div>
                <span class="text-[9px] text-white/50 text-center">{{ img.name }}</span>
              </button>
            </div>
          </div>

        </div>

        <!-- Bottom Action Bar (sticky) -->
        <div class="flex-shrink-0 px-4 py-3 border-t border-white/10" style="background: rgba(10,7,20,0.95)">
          <button @click="screen = 'preview'" class="btn-primary w-full">
            <span class="material-symbols-outlined text-[18px]">visibility</span>
            <span>Pratinjau Hasil Akhir</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Preview Screen -->
    <div v-else-if="screen === 'preview'" class="flex flex-col h-full">
      <div class="px-4 pt-4 pb-3 flex items-center gap-3 flex-shrink-0">
        <button @click="screen = 'editor'" class="btn-back">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
        <div>
          <h2 class="text-sm font-bold text-white">Pratinjau Akhir</h2>
          <p class="text-[10px] text-white/40">Periksa sebelum cetak</p>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto px-4 pb-4">
        <!-- Big preview strip -->
        <div class="flex justify-center mb-6">
          <div
            class="w-52 p-4 pb-6 rounded-3xl relative"
            :style="{ backgroundColor: selectedFrame }"
            style="box-shadow: 0 0 60px rgba(168,85,247,0.3)"
          >
            <div class="space-y-2">
              <div
                v-for="(photo, idx) in photos"
                :key="idx"
                class="w-full aspect-[4/3] rounded-2xl overflow-hidden relative shadow-sm"
                :style="{ filter: selectedFilter }"
              >
                <img :src="photo" class="w-full h-full object-cover" />
                <div
                  v-for="stk in placedStickers.filter(s => s.photoIdx === idx)"
                  :key="stk.id"
                  class="absolute pointer-events-none"
                  :style="{ top: stk.y + '%', left: stk.x + '%', fontSize: (stk.size + 6) + 'px', transform: 'translate(-50%,-50%) rotate(' + stk.rotation + 'deg)' }"
                >{{ stk.emoji }}</div>
                <div v-if="textOnPhoto && idx === textTargetPhoto"
                  class="absolute bottom-1 left-1 right-1 text-center text-[9px] font-bold rounded px-1 py-0.5"
                  :style="{ color: textColor, backgroundColor: textBg }">{{ textOnPhoto }}</div>
              </div>
            </div>
            <div v-if="stripText" class="mt-3 text-center text-[10px] font-bold px-1 truncate"
              :class="isDarkFrame ? 'text-white/80' : 'text-gray-700'">{{ stripText }}</div>
            <div class="mt-2 flex justify-between px-1 text-[8px] font-mono"
              :class="isDarkFrame ? 'text-white/40' : 'text-gray-400'">
              <span>ANGKASA PHOTOBOOTH</span><span>2026</span>
            </div>
          </div>
        </div>

        <!-- Summary card -->
        <div class="glass-card p-4 mb-4">
          <h3 class="text-xs font-bold text-white mb-3">Ringkasan Dekorasi</h3>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between">
              <span class="text-white/40">Frame</span>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full border border-white/20" :style="{ backgroundColor: selectedFrame }"></div>
                <span class="text-white">{{ currentFrameName }}</span>
              </div>
            </div>
            <div class="flex justify-between">
              <span class="text-white/40">Filter</span>
              <span class="text-white">{{ currentFilterName }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-white/40">Stiker</span>
              <span class="text-white">{{ placedStickers.length }} stiker</span>
            </div>
            <div v-if="stripText" class="flex justify-between">
              <span class="text-white/40">Teks</span>
              <span class="text-white italic">"{{ stripText }}"</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="space-y-2">
          <button @click="screen = 'payment'" class="btn-primary w-full">
            <span class="material-symbols-outlined text-[18px]">payment</span>
            <span>Lanjut ke Pembayaran</span>
          </button>
          <button @click="screen = 'editor'" class="btn-secondary w-full">
            <span class="material-symbols-outlined text-[18px]">edit</span>
            <span>Edit Lagi</span>
          </button>
          <button @click="downloadStrip" class="btn-ghost w-full">
            <span class="material-symbols-outlined text-[18px]">download</span>
            <span>Simpan ke Galeri</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Payment Screen -->
    <div v-else-if="screen === 'payment'" class="flex flex-col h-full">
      <div class="px-4 pt-4 pb-3 flex items-center gap-3 flex-shrink-0">
        <button @click="screen = 'preview'" class="btn-back">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        </button>
        <div>
          <h2 class="text-sm font-bold text-white">Pembayaran</h2>
          <p class="text-[10px] text-white/40">Langkah terakhir</p>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto px-4 pb-4">
        <!-- Invoice Card -->
        <div class="glass-card p-5 mb-5">
          <div class="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <div>
              <span class="text-[10px] text-white/40 block">Nomor Sesi</span>
              <span class="text-xs font-mono font-bold text-white">{{ sessionId }}</span>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-white/40 block">Status</span>
              <span class="text-xs font-bold text-amber-400">Menunggu Bayar</span>
            </div>
          </div>

          <div class="space-y-2 text-xs mb-4">
            <div class="flex justify-between">
              <span class="text-white/50">{{ sessionPackage }}</span>
              <span class="text-white font-semibold">Rp 50.000</span>
            </div>
            <div class="flex justify-between">
              <span class="text-white/50">Biaya Dekorasi Digital</span>
              <span class="text-emerald-400 font-semibold">Gratis</span>
            </div>
          </div>

          <div class="flex justify-between items-center pt-3 border-t border-white/10">
            <span class="text-sm font-bold text-white">Total</span>
            <span class="text-lg font-bold text-purple-300">Rp 50.000</span>
          </div>
        </div>

        <!-- QRIS Code -->
        <div class="glass-card p-5 mb-5 text-center">
          <div class="flex items-center justify-center gap-2 mb-4">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-xs font-bold text-emerald-400">Scan QRIS ini untuk bayar</span>
          </div>
          <div class="p-3 bg-white rounded-2xl inline-block mb-3">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021226680016ID.CO.QRIS.WWW01189360099900000000005204581253033605802ID5918ANGKASA+PHOTOBOOTH6012JAKARTA6304"
              alt="QRIS"
              class="w-44 h-44"
            />
          </div>
          <p class="text-[10px] text-white/40">Gunakan GoPay, OVO, Dana, ShopeePay,<br/>atau Mobile Banking apa saja</p>

          <!-- Timer countdown -->
          <div class="flex items-center justify-center gap-2 mt-4">
            <span class="material-symbols-outlined text-[16px] text-amber-400">timer</span>
            <span class="text-xs font-mono font-bold text-amber-400">{{ paymentTimer }}</span>
            <span class="text-xs text-white/40">sisa waktu</span>
          </div>
        </div>

        <!-- Confirm Button (demo) -->
        <button
          @click="confirmPayment"
          class="w-full py-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all active:scale-95"
          style="background: linear-gradient(135deg, #059669, #10b981)"
        >
          <span class="material-symbols-outlined text-[20px]">verified</span>
          <span>Konfirmasi Pembayaran Berhasil</span>
        </button>
        <p class="text-[10px] text-white/25 text-center mt-2">*Tombol ini untuk simulasi demo</p>
      </div>
    </div>

    <!-- Success Screen -->
    <div v-else-if="screen === 'success'" class="screen-center px-6 text-center">
      <!-- Confetti-like animation blobs -->
      <div class="success-blob-1"></div>
      <div class="success-blob-2"></div>

      <div class="text-6xl mb-3 relative z-10 animate-bounce">🎉</div>
      <div class="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5 relative z-10">
        <span class="material-symbols-outlined text-emerald-400 text-[30px]">check_circle</span>
      </div>
      <h2 class="text-2xl font-bold text-white mb-2 relative z-10">Pembayaran Lunas!</h2>
      <p class="text-sm text-white/50 mb-6 relative z-10">Foto sedang dicetak di booth.<br/>Silakan ambil di baki printer 📠</p>

      <!-- Receipt -->
      <div class="glass-card p-5 mb-5 text-left w-full relative z-10">
        <div class="flex items-center gap-2 mb-4">
          <span class="material-symbols-outlined text-purple-300 text-[18px]">receipt_long</span>
          <span class="text-xs font-bold text-white">Struk Pembayaran</span>
        </div>
        <div class="space-y-2 text-xs">
          <div class="flex justify-between">
            <span class="text-white/40">ID Sesi</span>
            <span class="text-white font-mono">{{ sessionId }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-white/40">Paket</span>
            <span class="text-white">{{ sessionPackage }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-white/40">Total Dibayar</span>
            <span class="text-emerald-400 font-bold">Rp 50.000</span>
          </div>
          <div class="flex justify-between">
            <span class="text-white/40">Waktu</span>
            <span class="text-white">{{ currentTime }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-white/40">Status</span>
            <span class="text-emerald-400 font-bold">LUNAS ✓</span>
          </div>
        </div>
      </div>

      <!-- Print progress -->
      <div class="glass-card p-4 mb-5 w-full relative z-10">
        <div class="flex justify-between items-center text-xs mb-2">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[16px] text-purple-300 animate-spin">sync</span>
            <span class="text-white font-semibold">Sedang Mencetak...</span>
          </div>
          <span class="text-white/50">{{ printProgress }}%</span>
        </div>
        <div class="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-500"
            style="background: linear-gradient(90deg, #7c3aed, #a855f7, #ec4899)"
            :style="{ width: printProgress + '%' }"
          ></div>
        </div>
        <p v-if="printProgress >= 100" class="text-xs text-emerald-400 font-bold mt-2">✨ Cetak selesai! Ambil di baki printer.</p>
      </div>

      <div class="space-y-2 w-full relative z-10">
        <button @click="downloadStrip" class="btn-primary w-full">
          <span class="material-symbols-outlined text-[18px]">download</span>
          <span>Simpan Foto Digital</span>
        </button>
        <button @click="shareStrip" class="btn-secondary w-full">
          <span class="material-symbols-outlined text-[18px]">share</span>
          <span>Bagikan ke Media Sosial</span>
        </button>
        <button @click="screen = 'welcome'" class="btn-ghost w-full mt-2">
          <span>Sesi Baru</span>
        </button>
      </div>
    </div>

  </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const sessionId = computed(() => route.query.session || 'ANGKASA-' + Math.random().toString(36).substr(2, 6).toUpperCase())
const sessionPackage = computed(() => route.query.package || 'Paket Standard')

// Screen flow
const screen = ref('welcome') // welcome → privacy → editor → preview → payment → success
const privacyAgreed = ref(false)

function goToEditor() {
  if (privacyAgreed.value) screen.value = 'editor'
}

// Editor state
const activeTab = ref('stiker')
const editorTabs = [
  { key: 'stiker', label: 'Stiker', icon: 'mood' },
  { key: 'frame',  label: 'Frame',  icon: 'palette' },
  { key: 'filter', label: 'Filter', icon: 'auto_fix_high' },
  { key: 'teks',   label: 'Teks',   icon: 'title' },
  { key: 'gambar', label: 'Ornamen',icon: 'interests' },
]

// Photos (simulated – in real app comes from kiosk via API)
const photos = ref([
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
])

// ---- STIKER ----
const stickerCategories = [
  { name: 'Populer',  list: ['✨','💖','⭐','🌟','💫','🔥','🎀','🌸','🦋','💎','🎉','🎊'] },
  { name: 'Wajah',   list: ['😍','🥰','😎','🤩','😘','🥳','😄','😜','🤗','😇','🙈','💅'] },
  { name: 'Alam',    list: ['🌺','🌈','🌙','☀️','🌊','🍓','🍀','🌻','🌴','🦄','🐱','🦋'] },
  { name: 'Budaya',  list: ['🎵','🎶','🎸','🎤','🏆','👑','💍','🎓','🎭','🎪','🚀','🌏'] },
  { name: 'Kaligrafi', list: ['❤️','💕','💞','💓','💗','💝','💟','♥️','🫶','💏','👫','🤝'] },
]
const activeStickerCat = ref('Populer')
const currentStickerList = computed(() =>
  stickerCategories.find(c => c.name === activeStickerCat.value)?.list || []
)

const placedStickers = ref([])
function addSticker(emoji) {
  const photoIdx = Math.floor(Math.random() * photos.value.length)
  placedStickers.value.push({
    id: Date.now(),
    emoji,
    photoIdx,
    x: 15 + Math.random() * 70,
    y: 15 + Math.random() * 70,
    size: 18 + Math.floor(Math.random() * 10),
    rotation: -15 + Math.random() * 30,
  })
}

// ---- FRAME ----
const frames = [
  { name: 'Cosmos', hex: '#0a0714', dark: true },
  { name: 'Midnight', hex: '#0f172a', dark: true },
  { name: 'Deep Purple', hex: '#1e1040', dark: true },
  { name: 'Rose Dark', hex: '#1a0a12', dark: true },
  { name: 'Putih', hex: '#ffffff', dark: false },
  { name: 'Lavender', hex: '#f1ebff', dark: false },
  { name: 'Blush Pink', hex: '#fce7f3', dark: false },
  { name: 'Sky Blue', hex: '#e0f2fe', dark: false },
  { name: 'Mint', hex: '#d1fae5', dark: false },
  { name: 'Cream', hex: '#fef3c7', dark: false },
  { name: 'Peach', hex: '#ffedd5', dark: false },
  { name: 'Lilac', hex: '#ede9fe', dark: false },
]
const selectedFrame = ref('#0a0714')
const isDarkFrame = computed(() => frames.find(f => f.hex === selectedFrame.value)?.dark ?? true)
const currentFrameName = computed(() => frames.find(f => f.hex === selectedFrame.value)?.name || 'Custom')

const patterns = [
  { name: 'none', label: 'Polos' },
  { name: 'dots', label: 'Titik-titik' },
  { name: 'lines', label: 'Garis' },
  { name: 'stars', label: 'Bintang' },
]
const selectedPattern = ref('none')

// ---- FILTER ----
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
const selectedFilter = ref('none')
const currentFilterName = computed(() => filters.find(f => f.value === selectedFilter.value)?.name || 'Custom')

// ---- TEKS ----
const stripText = ref('')
const textOnPhoto = ref('')
const textTargetPhoto = ref(0)
const textColor = ref('#ffffff')
const textBg = ref('rgba(0,0,0,0.45)')
const textColors = [
  { val: '#ffffff' }, { val: '#fbbf24' }, { val: '#f472b6' },
  { val: '#34d399' }, { val: '#60a5fa' }, { val: '#000000' },
]
const textPresets = ['Wisuda 2026 🎓', 'Best Friends ✨', 'Love You 💖', 'Weekend Vibes 🌈', 'Family Day 👨‍👩‍👧']

// ---- ORNAMEN/GAMBAR ----
const decorImages = [
  { name: 'Bunga Sakura', preview: '🌸' },
  { name: 'Bintang Jatuh', preview: '🌠' },
  { name: 'Mahkota', preview: '👑' },
  { name: 'Hati Melayang', preview: '💝' },
  { name: 'Balon', preview: '🎈' },
  { name: 'Kembang Api', preview: '🎆' },
  { name: 'Pita', preview: '🎀' },
  { name: 'Berlian', preview: '💎' },
  { name: 'Pelangi', preview: '🌈' },
]
function addDecorImage(img) {
  addSticker(img.preview)
}

// ---- PAYMENT ----
const paymentSeconds = ref(5 * 60)
const paymentTimer = computed(() => {
  const m = Math.floor(paymentSeconds.value / 60)
  const s = paymentSeconds.value % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})
let paymentInterval = null

const printProgress = ref(0)
let printInterval = null

const currentTime = ref(new Date().toLocaleString('id-ID'))

function confirmPayment() {
  screen.value = 'success'
  printProgress.value = 10
  printInterval = setInterval(() => {
    if (printProgress.value < 100) {
      printProgress.value = Math.min(100, printProgress.value + 15)
    } else {
      clearInterval(printInterval)
    }
  }, 500)
}

function downloadStrip() {
  const link = document.createElement('a')
  link.href = photos.value[0]
  link.download = `angkasa-${sessionId.value}-${Date.now()}.jpg`
  link.click()
}

function shareStrip() {
  if (navigator.share) {
    navigator.share({
      title: 'Foto dari Angkasa Photobooth',
      text: 'Lihat hasil fotonya! 📸✨',
      url: window.location.href,
    }).catch(() => {})
  } else {
    navigator.clipboard?.writeText(window.location.href)
    alert('Link disalin! Bagikan ke temanmu.')
  }
}

onMounted(() => {
  paymentInterval = setInterval(() => {
    if (paymentSeconds.value > 0) paymentSeconds.value--
  }, 1000)
})
onUnmounted(() => {
  clearInterval(paymentInterval)
  clearInterval(printInterval)
})
</script>

<style scoped>
* { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }

.mobile-wrapper {
  min-height: 100svh;
  min-height: 100vh;
  width: 100%;
  background: #06030f;
  display: flex;
  justify-content: center;
  align-items: stretch;
}

.mobile-shell {
  min-height: 100svh;
  min-height: 100vh;
  width: 100%;
  max-width: 480px;
  background: #06030f;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  font-family: 'Inter', system-ui, sans-serif;
}

@media (max-width: 640px) {
  .mobile-shell {
    max-width: 100%;
    width: 100%;
  }
}

.blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
  z-index: 0;
}
.blob-1 {
  width: 280px; height: 280px;
  background: rgba(124, 58, 237, 0.2);
  top: -80px; left: -80px;
}
.blob-2 {
  width: 240px; height: 240px;
  background: rgba(236, 72, 153, 0.12);
  bottom: 60px; right: -60px;
}
.success-blob-1 {
  position: absolute; width: 200px; height: 200px; border-radius: 50%;
  background: rgba(16, 185, 129, 0.15); filter: blur(60px);
  top: -40px; right: -40px; pointer-events: none;
}
.success-blob-2 {
  position: absolute; width: 180px; height: 180px; border-radius: 50%;
  background: rgba(168, 85, 247, 0.15); filter: blur(60px);
  bottom: 80px; left: -40px; pointer-events: none;
}

.screen-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}
.screen-scroll {
  flex: 1;
  overflow-y: auto;
  position: relative;
  z-index: 1;
}

.logo-ring {
  width: 80px; height: 80px;
  border-radius: 28px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #7c3aed, #a855f7, #ec4899);
  box-shadow: 0 0 40px rgba(168, 85, 247, 0.4);
}

.glass-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  width: 100%;
}

.dot-active {
  display: inline-block;
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #34d399;
  animation: pulse 2s ease infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.2); }
}

.icon-badge {
  width: 56px; height: 56px;
  border-radius: 18px;
  background: rgba(124, 58, 237, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.3);
  display: flex; align-items: center; justify-content: center;
}

.btn-primary {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 14px 20px;
  border-radius: 16px;
  font-weight: 700; font-size: 13px;
  color: white;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border: none; cursor: pointer;
  transition: all 0.15s;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.35);
}
.btn-primary:active { transform: scale(0.97); }

.btn-secondary {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px 20px;
  border-radius: 16px;
  font-weight: 600; font-size: 13px;
  color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  cursor: pointer; transition: all 0.15s;
}
.btn-secondary:active { transform: scale(0.97); }

.btn-ghost {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 10px 20px;
  border-radius: 14px;
  font-weight: 500; font-size: 12px;
  color: rgba(255,255,255,0.35);
  background: transparent; border: none;
  cursor: pointer; transition: all 0.15s;
}

.btn-back {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 12px; font-weight: 600;
  color: rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
}

.input-field {
  width: 100%;
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}
.input-field:focus { border-color: rgba(168,85,247,0.6); }
.input-field::placeholder { color: rgba(255,255,255,0.25); }

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

@media (prefers-color-scheme: light) {
  .mobile-shell { background: #06030f; }
}
</style>
