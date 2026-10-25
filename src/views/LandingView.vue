<template>
  <div class="min-h-screen bg-surface flex flex-col justify-between">
    <Navbar />

    <!-- Main Content Container with Desktop Sizing -->
    <main class="pt-20 flex-1 flex flex-col justify-center">
      <Transition name="fade" mode="out-in">

        <!-- ================= 1. TAB: BERANDA (HERO VIEW) ================= -->
        <section
          v-if="activeLandingTab === 'beranda'"
          key="beranda"
          class="w-full px-6 lg:px-12 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] relative overflow-hidden"
        >
          <!-- Ambient Glowing Aura -->
          <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-gradient-to-r from-secondary-fixed/50 via-primary-fixed/40 to-secondary-container/30 blur-[130px] pointer-events-none rounded-full -z-0"></div>

          <div class="w-full max-w-6xl mx-auto rounded-3xl bg-gradient-to-b from-[#F7F4FF] via-[#F1EBFF] to-[#EBF0FF] border border-surface-container-high/60 shadow-soft-sm pt-12 pb-24 px-6 lg:px-16 text-center flex flex-col items-center relative z-10">
            <!-- Top Pill Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-soft-sm mb-5 border border-secondary-fixed">
              <span class="material-symbols-outlined text-secondary text-[18px]">auto_awesome</span>
              <span class="text-xs font-semibold text-primary tracking-wide">Pengalaman Photobooth Generasi Baru</span>
            </div>

            <!-- Main Heading -->
            <h1 class="text-4xl lg:text-5xl xl:text-6xl font-light text-primary tracking-tight max-w-4xl leading-tight mb-4">
              Abadikan Momenmu, <span class="text-secondary font-medium">Dekorasi Sepuasnya.</span>
            </h1>

            <!-- Subtitle -->
            <p class="text-sm lg:text-base text-on-surface-variant max-w-2xl mb-8 leading-relaxed font-normal">
              Photobooth modern dengan sinkronisasi instan: foto di booth berkualitas studio, hias bebas dari ponselmu, bayar digital tanpa antre, dan simpan hasilnya seketika.
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center justify-center gap-4 mb-12">
              <router-link
                to="/kiosk"
                class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary-container text-on-primary font-semibold text-xs shadow-soft-md hover:shadow-soft-xl hover:scale-[1.02] transition-all"
              >
                <span>Mulai Sesi di Booth</span>
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </router-link>

              <button
                @click="switchTab('cara-kerja')"
                class="inline-flex items-center px-7 py-3.5 rounded-full bg-surface-container-lowest text-primary font-semibold text-xs shadow-soft-sm hover:bg-surface-container-low transition-colors border border-surface-container-high/70 cursor-pointer"
              >
                Lihat Cara Kerja
              </button>
            </div>

            <!-- Overlapping Floating Photo Strips Visual -->
            <div class="relative w-full max-w-3xl flex items-center justify-center -mb-20">
              <!-- Left Strip (-6 deg) -->
              <div class="w-44 sm:w-52 bg-surface-container-lowest p-3 pb-5 rounded-2xl shadow-soft-xl transform -rotate-6 hover:-rotate-2 transition-transform duration-300 relative shrink-0 border border-surface-container-high/60">
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-secondary-fixed/80 rounded-xs rotate-2 shadow-xs"></div>
                <div class="flex flex-col gap-2">
                  <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-high">
                    <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" alt="Sahabat berpose ceria" />
                  </div>
                  <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-high">
                    <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" alt="Pose photobooth tertawa" />
                  </div>
                  <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-high">
                    <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" alt="Gaya photobooth santai" />
                  </div>
                </div>
                <div class="mt-2.5 flex items-center justify-between px-1">
                  <span class="text-[9px] text-outline tracking-wider font-semibold">ANGKASA • 2026</span>
                  <span class="material-symbols-outlined text-secondary text-[14px]">favorite</span>
                </div>
              </div>

              <!-- Center Strip (2 deg, elevated) -->
              <div class="w-48 sm:w-56 bg-surface-container-lowest p-3 pb-5 rounded-2xl shadow-soft-xl transform rotate-2 -translate-y-5 hover:rotate-0 transition-transform duration-300 relative z-20 shrink-0 -mx-5 border border-secondary/30">
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-primary-fixed/80 rounded-xs -rotate-1 shadow-xs"></div>
                <div class="flex flex-col gap-2">
                  <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-high relative">
                    <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80" alt="Pasangan berpose estetik" />
                    <span class="absolute top-1.5 right-1.5 bg-surface-container-lowest/90 px-2 py-0.5 rounded-full text-[9px] text-secondary font-bold shadow-xs">besties ♡</span>
                  </div>
                  <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-high">
                    <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" alt="Senyum manis studio" />
                  </div>
                  <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-high">
                    <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" alt="Pose ceria photobooth" />
                  </div>
                </div>
                <div class="mt-2.5 flex items-center justify-between px-1">
                  <span class="text-[9px] text-secondary tracking-wider font-bold">ANGKASA PHOTOBOOTH</span>
                  <span class="material-symbols-outlined text-secondary text-[14px]">auto_awesome</span>
                </div>
              </div>

              <!-- Right Strip (8 deg) -->
              <div class="w-44 sm:w-52 bg-surface-container-lowest p-3 pb-5 rounded-2xl shadow-soft-xl transform rotate-8 hover:rotate-3 transition-transform duration-300 relative shrink-0 border border-surface-container-high/60 hidden sm:block">
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-secondary-fixed/80 rounded-xs rotate-2 shadow-xs"></div>
                <div class="flex flex-col gap-2">
                  <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-high">
                    <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" alt="Sahabat tertawa" />
                  </div>
                  <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-high">
                    <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" alt="Pose peace" />
                  </div>
                  <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-high">
                    <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" alt="Filter vintage" />
                  </div>
                </div>
                <div class="mt-2.5 flex items-center justify-between px-1">
                  <span class="text-[9px] text-outline tracking-wider font-semibold">SWEET MEMORY</span>
                  <span class="material-symbols-outlined text-secondary text-[14px]">stars</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        <!-- ================= 2. TAB: CARA KERJA (DEDICATED DESKTOP VIEW) ================= -->
        <section
          v-else-if="activeLandingTab === 'cara-kerja'"
          key="cara-kerja"
          class="w-full px-6 lg:px-12 py-12 flex flex-col justify-center min-h-[calc(100vh-80px)]"
        >
          <div class="max-w-6xl mx-auto w-full">
            <div class="text-center max-w-2xl mx-auto mb-12">
              <span class="text-xs uppercase font-bold tracking-widest text-secondary block mb-2">Alur Pengalaman</span>
              <h2 class="text-3xl lg:text-4xl font-light text-primary">Mudah, Menyenangkan, dan Instan</h2>
              <p class="text-xs lg:text-sm text-on-surface-variant mt-2 leading-relaxed">
                Nikmati 4 langkah sederhana dari mengambil pose terbaik sampai memegang hasil cetak fisik berkualitas studio.
              </p>
            </div>

            <!-- 4 Steps Sized for Desktop Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div
                v-for="(step, idx) in steps"
                :key="idx"
                class="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm hover:shadow-soft-lg hover:border-secondary transition-all group flex flex-col justify-between"
              >
                <div>
                  <div class="w-12 h-12 rounded-2xl bg-secondary-fixed/50 text-secondary flex items-center justify-center font-bold text-lg mb-5 group-hover:scale-110 transition-transform">
                    <span class="material-symbols-outlined text-[24px]">{{ step.icon }}</span>
                  </div>
                  <span class="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Langkah 0{{ idx + 1 }}</span>
                  <h3 class="text-base font-bold text-primary mb-2">{{ step.title }}</h3>
                  <p class="text-xs text-on-surface-variant leading-relaxed">{{ step.desc }}</p>
                </div>

                <div class="mt-6 pt-4 border-t border-surface-container-high/40 flex items-center justify-between text-[11px] text-secondary font-semibold">
                  <span>{{ step.highlight }}</span>
                  <span class="material-symbols-outlined text-[16px]">check_circle</span>
                </div>
              </div>
            </div>

            <!-- Navigation Controls between Views -->
            <div class="flex items-center justify-between pt-6 border-t border-surface-container-high/60">
              <button
                @click="switchTab('beranda')"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-primary transition-colors cursor-pointer"
              >
                <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Kembali ke Beranda</span>
              </button>

              <button
                @click="switchTab('paket')"
                class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-sm hover:shadow-soft-md hover:scale-102 transition-all cursor-pointer"
              >
                <span>Lihat Paket Foto & Harga</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>


        <!-- ================= 3. TAB: PAKET & HARGA (DEDICATED DESKTOP VIEW) ================= -->
        <section
          v-else-if="activeLandingTab === 'paket'"
          key="paket"
          class="w-full px-6 lg:px-12 py-12 flex flex-col justify-center min-h-[calc(100vh-80px)]"
        >
          <div class="max-w-6xl mx-auto w-full">
            <div class="text-center max-w-2xl mx-auto mb-10">
              <span class="text-xs uppercase font-bold tracking-widest text-secondary block mb-2">Pilihan Sesi</span>
              <h2 class="text-3xl lg:text-4xl font-light text-primary">Pilih Paket Foto Favoritmu</h2>
              <p class="text-xs lg:text-sm text-on-surface-variant mt-2 leading-relaxed">
                Semua paket sudah termasuk cetak fisik kertas foto DNP anti-luntur dan tautan unduh resolusi tinggi.
              </p>
            </div>

            <!-- 4 Packages in Desktop Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div
                v-for="item in presets"
                :key="item.id"
                class="rounded-3xl bg-surface-container-lowest border p-5 flex flex-col justify-between shadow-soft-sm hover:shadow-soft-lg transition-all"
                :class="item.badge === 'Paling Populer' ? 'border-secondary/60 ring-2 ring-secondary/20 relative' : 'border-surface-container-high/70'"
              >
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary-fixed text-on-secondary-fixed">
                      {{ item.badge }}
                    </span>
                    <span class="text-[11px] text-on-surface-variant font-medium">{{ item.poses }} Pose</span>
                  </div>

                  <div class="w-full h-32 rounded-2xl overflow-hidden mb-3.5 bg-surface-container">
                    <img :src="item.previewImage" :alt="item.name" class="w-full h-full object-cover" />
                  </div>

                  <h3 class="text-sm font-bold text-primary mb-1">{{ item.name }}</h3>
                  <p class="text-[11px] text-on-surface-variant mb-3 leading-relaxed line-clamp-2">{{ item.description }}</p>

                  <div class="mb-4">
                    <span class="text-xl font-bold text-primary">{{ formatRupiah(item.price) }}</span>
                    <span class="text-[11px] text-on-surface-variant"> / sesi</span>
                  </div>

                  <ul class="space-y-1.5 mb-5">
                    <li v-for="tag in item.tags" :key="tag" class="text-[11px] text-on-surface-variant flex items-center gap-2">
                      <span class="material-symbols-outlined text-secondary text-[14px]">check_circle</span>
                      <span>{{ tag }}</span>
                    </li>
                  </ul>
                </div>

                <router-link
                  to="/kiosk"
                  class="w-full py-2.5 rounded-full text-center text-xs font-semibold transition-all"
                  :class="item.badge === 'Paling Populer' ? 'bg-primary-container text-on-primary hover:shadow-soft-md' : 'bg-surface-container-low hover:bg-surface-container text-primary border border-surface-container-high/60'"
                >
                  Pilih di Kiosk
                </router-link>
              </div>
            </div>

            <!-- Navigation Controls -->
            <div class="flex items-center justify-between pt-6 border-t border-surface-container-high/60">
              <button
                @click="switchTab('cara-kerja')"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-primary transition-colors cursor-pointer"
              >
                <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Kembali ke Cara Kerja</span>
              </button>

              <button
                @click="switchTab('galeri')"
                class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-sm hover:shadow-soft-md hover:scale-102 transition-all cursor-pointer"
              >
                <span>Lihat Galeri Kualitas Studio</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>


        <!-- ================= 4. TAB: GALERI & FITUR STUDIO ================= -->
        <section
          v-else-if="activeLandingTab === 'galeri'"
          key="galeri"
          class="w-full px-6 lg:px-12 py-12 flex flex-col justify-center min-h-[calc(100vh-80px)]"
        >
          <div class="max-w-6xl mx-auto w-full">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-10">
              <div>
                <span class="text-xs uppercase font-bold tracking-widest text-secondary block mb-2">Kualitas Studio</span>
                <h2 class="text-3xl lg:text-4xl font-light text-primary mb-6 leading-tight">
                  Teknologi Photobooth Canggih Berstandar Profesional
                </h2>
                <div class="space-y-4">
                  <div class="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm">
                    <div class="w-10 h-10 rounded-xl bg-secondary-fixed/60 text-secondary flex items-center justify-center shrink-0">
                      <span class="material-symbols-outlined text-[20px]">camera</span>
                    </div>
                    <div>
                      <h4 class="text-sm font-bold text-primary">Kamera Studio Canon 4K</h4>
                      <p class="text-xs text-on-surface-variant mt-0.5">Sensor besar dengan ring light lembut menghasilkan warna kulit alami dan tajam.</p>
                    </div>
                  </div>

                  <div class="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm">
                    <div class="w-10 h-10 rounded-xl bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0">
                      <span class="material-symbols-outlined text-[20px]">print</span>
                    </div>
                    <div>
                      <h4 class="text-sm font-bold text-primary">Printer Dye-Sublimation DNP Cepat</h4>
                      <p class="text-xs text-on-surface-variant mt-0.5">Cetak kering seketika dalam 12 detik, tahan air, tidak pudar hingga bertahun-tahun.</p>
                    </div>
                  </div>

                  <div class="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm">
                    <div class="w-10 h-10 rounded-xl bg-secondary-container/40 text-on-secondary-container flex items-center justify-center shrink-0">
                      <span class="material-symbols-outlined text-[20px]">cloud_sync</span>
                    </div>
                    <div>
                      <h4 class="text-sm font-bold text-primary">Live Webhook & Cloud Sync</h4>
                      <p class="text-xs text-on-surface-variant mt-0.5">QR instan menghubungkan smartphone untuk dekorasi stiker realtime dan unduhan file.</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Visual Showcase Grid -->
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-4">
                  <div class="rounded-3xl overflow-hidden shadow-soft-md border border-surface-container-high/60">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80" alt="Foto Photobooth" class="w-full h-56 object-cover" />
                  </div>
                  <div class="rounded-3xl overflow-hidden shadow-soft-md border border-surface-container-high/60">
                    <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80" alt="Foto Photobooth" class="w-full h-40 object-cover" />
                  </div>
                </div>
                <div class="space-y-4 pt-6">
                  <div class="rounded-3xl overflow-hidden shadow-soft-md border border-surface-container-high/60">
                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80" alt="Foto Photobooth" class="w-full h-40 object-cover" />
                  </div>
                  <div class="rounded-3xl overflow-hidden shadow-soft-md border border-surface-container-high/60">
                    <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80" alt="Foto Photobooth" class="w-full h-56 object-cover" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Controls -->
            <div class="flex items-center justify-between pt-6 border-t border-surface-container-high/60">
              <button
                @click="switchTab('paket')"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-primary transition-colors cursor-pointer"
              >
                <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Kembali ke Paket Foto</span>
              </button>

              <button
                @click="switchTab('faq')"
                class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-sm hover:shadow-soft-md hover:scale-102 transition-all cursor-pointer"
              >
                <span>Lihat Tanya Jawab (FAQ)</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>


        <!-- ================= 5. TAB: FAQ (BANTUAN) ================= -->
        <section
          v-else-if="activeLandingTab === 'faq'"
          key="faq"
          class="w-full px-6 lg:px-12 py-12 flex flex-col justify-center min-h-[calc(100vh-80px)]"
        >
          <div class="max-w-4xl mx-auto w-full">
            <div class="text-center mb-10">
              <span class="text-xs uppercase font-bold tracking-widest text-secondary block mb-2">Bantuan</span>
              <h2 class="text-3xl lg:text-4xl font-light text-primary">Pertanyaan yang Sering Diajukan</h2>
            </div>

            <div class="space-y-3.5 mb-10">
              <div
                v-for="(faq, i) in faqs"
                :key="i"
                class="p-5 rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 shadow-soft-sm cursor-pointer transition-all hover:border-secondary/60"
                @click="toggleFaq(i)"
              >
                <div class="flex items-center justify-between">
                  <h4 class="text-xs lg:text-sm font-bold text-primary">{{ faq.q }}</h4>
                  <span class="material-symbols-outlined text-secondary transition-transform duration-200" :class="{ 'rotate-180': activeFaq === i }">
                    expand_more
                  </span>
                </div>
                <p v-if="activeFaq === i" class="text-xs text-on-surface-variant mt-3 leading-relaxed border-t border-surface-container-high/40 pt-3">
                  {{ faq.a }}
                </p>
              </div>
            </div>

            <!-- Final CTA Card -->
            <div class="rounded-3xl bg-gradient-to-r from-primary-container via-primary to-primary-container text-on-primary p-8 text-center shadow-soft-xl relative overflow-hidden mb-8">
              <h3 class="text-xl lg:text-2xl font-light tracking-tight mb-2 text-white">
                Siap Abadikan Momen Spesialmu?
              </h3>
              <p class="text-xs text-on-primary-container max-w-lg mx-auto mb-6">
                Kunjungi booth Angkasa di Grand Atrium atau rasakan simulasi layar photobooth di browser sekarang.
              </p>
              <div class="flex items-center justify-center gap-3">
                <router-link
                  to="/kiosk"
                  class="px-6 py-2.5 rounded-full bg-secondary text-on-secondary font-bold text-xs shadow-soft-md hover:bg-secondary/90 transition-all"
                >
                  Buka Layar Kiosk Booth
                </router-link>
                <router-link
                  to="/admin/ringkasan"
                  class="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all"
                >
                  Dashboard Admin
                </router-link>
              </div>
            </div>

            <!-- Navigation Controls -->
            <div class="flex items-center justify-between pt-6 border-t border-surface-container-high/60">
              <button
                @click="switchTab('galeri')"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-primary transition-colors cursor-pointer"
              >
                <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Kembali ke Galeri</span>
              </button>

              <button
                @click="switchTab('beranda')"
                class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Ke Beranda Awal</span>
                <span class="material-symbols-outlined text-[16px]">home</span>
              </button>
            </div>
          </div>
        </section>

      </Transition>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { presets, formatRupiah, activeLandingTab } from '@/composables/usePhotobooth'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (route.query.tab) {
    activeLandingTab.value = route.query.tab
  }
})

watch(() => route.query.tab, (newTab) => {
  if (newTab) {
    activeLandingTab.value = newTab
  }
})

function switchTab(tabId) {
  activeLandingTab.value = tabId
  router.replace({ query: { tab: tabId } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const steps = [
  { icon: 'touch_app', title: 'Pilih Paket & Pose', desc: 'Sentuh layar kiosk untuk memilih preset favorit dan bersiap untuk countdown pose kamera.', highlight: 'Preset Fleksibel' },
  { icon: 'qr_code_scanner', title: 'Pindai QR Ponsel', desc: 'Pindai barcode unik di layar booth untuk menyambungkan fotomu langsung ke smartphone.', highlight: 'Bebas Antre' },
  { icon: 'draw', title: 'Dekorasi Real-Time', desc: 'Tambahkan stiker lucu, frame unik, dan tanda tangan digital bebas dari genggamanmu.', highlight: 'Puluhan Aset Lucu' },
  { icon: 'payments', title: 'Bayar & Cetak Instan', desc: 'Selesaikan transaksi dengan QRIS, hasil cetak fisik keluar dalam 12 detik!', highlight: 'Cetak Cepat 12 Detik' }
]

const activeFaq = ref(0)
function toggleFaq(index) {
  activeFaq.value = activeFaq.value === index ? -1 : index
}

const faqs = [
  {
    q: 'Bagaimana cara menghubungkan ponsel ke photobooth?',
    a: 'Setelah sesi foto selesai di booth, layar kiosk akan menampilkan QR Code unik. Cukup gunakan kamera ponsel untuk memindai QR tersebut, dan kanvas fotomu akan langsung terbuka di browser ponselmu tanpa perlu mengunduh aplikasi tambahan.'
  },
  {
    q: 'Metode pembayaran apa saja yang didukung?',
    a: 'Kami menerima seluruh pembayaran digital berbasis QRIS (GoPay, OVO, Dana, ShopeePay, BCA, Mandiri, BRI, BNI) serta kartu debit/kredit di mesin booth.'
  },
  {
    q: 'Berapa lama hasil cetak fisik keluar?',
    a: 'Printer DNP Dye-Sublimation kami mencetak foto berkecepatan tinggi dalam waktu kurang lebih 12 detik per lembar cetakan dengan kualitas tahan luntur hingga bertahun-tahun.'
  },
  {
    q: 'Apakah saya mendapatkan file digital berkualitas HD?',
    a: 'Ya! Setelah sesi selesai, kamu dapat langsung mengunduh foto digital beresolusi penuh melalui tautan yang tersimpan di ponselmu.'
  }
]
</script>
