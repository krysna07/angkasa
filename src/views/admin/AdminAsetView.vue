<template>
  <AdminLayout title="Katalog Frame & Stiker" subtitle="Kelola aset dekorasi visual yang dapat dipilih pelanggan saat mempercantik fotonya">
    <!-- Header Controls -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <!-- Tabs Switcher -->
      <div class="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-full border border-surface-container-high/60">
        <button
          @click="activeTab = 'frame'"
          class="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all"
          :class="activeTab === 'frame' ? 'bg-primary-container text-on-primary shadow-soft-sm' : 'text-on-surface-variant hover:text-primary'"
        >
          <span class="material-symbols-outlined text-[18px]">crop_portrait</span>
          <span>Frame Photostrip ({{ assetFrames.length }})</span>
        </button>
        <button
          @click="activeTab = 'stiker'"
          class="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all"
          :class="activeTab === 'stiker' ? 'bg-primary-container text-on-primary shadow-soft-sm' : 'text-on-surface-variant hover:text-primary'"
        >
          <span class="material-symbols-outlined text-[18px]">auto_awesome</span>
          <span>Stiker Dekorasi ({{ assetStickers.length }})</span>
        </button>
      </div>

      <!-- Upload Button -->
      <button
        @click="openUploadModal"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-on-primary text-xs font-semibold shadow-soft-sm hover:shadow-soft-md hover:scale-[1.02] transition-all"
      >
        <span class="material-symbols-outlined text-[18px]">upload</span>
        <span>Unggah {{ activeTab === 'frame' ? 'Frame' : 'Stiker' }} Baru</span>
      </button>
    </div>

    <!-- Frame Grid Tab -->
    <div v-if="activeTab === 'frame'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <div
        v-for="item in assetFrames"
        :key="item.id"
        class="rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 p-4 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between"
      >
        <div>
          <!-- Frame Mockup Preview -->
          <div class="w-full h-44 rounded-2xl bg-gradient-to-br from-secondary-fixed/30 via-primary-fixed/20 to-surface-container flex flex-col items-center justify-center p-3 mb-3 border border-secondary-fixed/50 relative group">
            <div class="w-20 h-28 border-2 border-dashed border-secondary/50 rounded-lg flex flex-col items-center justify-center bg-white/70 shadow-xs">
              <span class="material-symbols-outlined text-secondary text-[24px]">crop_original</span>
              <span class="text-[8px] font-mono font-bold text-on-surface-variant mt-1">FRAME SLOT</span>
            </div>
            <span class="absolute bottom-2 text-[9px] font-mono text-outline">{{ item.file }}</span>
          </div>

          <h4 class="text-xs font-bold text-primary truncate">{{ item.name }}</h4>
          <p class="text-[10px] text-on-surface-variant mb-3">{{ item.category }}</p>

          <div class="flex items-center justify-between text-[11px] text-on-surface-variant pt-2 border-t border-surface-container-high/50">
            <span>Dipakai: <b class="text-primary">{{ item.uses }}x</b></span>
            <span class="px-2 py-0.5 rounded-full text-[9px] font-bold" :class="item.active ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-container text-outline'">
              {{ item.active ? 'Aktif' : 'Nonaktif' }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2 mt-4 pt-2 border-t border-surface-container-high/40">
          <button
            @click="toggleFrame(item)"
            class="flex-1 py-1.5 rounded-full bg-surface-container text-[11px] font-semibold text-primary hover:bg-surface-container-high transition-colors"
          >
            {{ item.active ? 'Nonaktifkan' : 'Aktifkan' }}
          </button>
          <button
            @click="deleteFrame(item)"
            class="p-1.5 rounded-full text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <span class="material-symbols-outlined text-[16px]">delete</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Sticker Grid Tab -->
    <div v-if="activeTab === 'stiker'" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <div
        v-for="item in assetStickers"
        :key="item.id"
        class="rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 p-4 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between text-center"
      >
        <div>
          <div class="w-20 h-20 mx-auto rounded-2xl bg-secondary-fixed/40 flex items-center justify-center text-secondary mb-3 shadow-soft-sm">
            <span class="material-symbols-outlined text-[36px]">{{ item.icon }}</span>
          </div>
          <h4 class="text-xs font-bold text-primary truncate">{{ item.name }}</h4>
          <p class="text-[10px] text-on-surface-variant mb-2">{{ item.category }}</p>
          <span class="text-[10px] text-outline block">Dipakai {{ item.uses }} kali</span>
        </div>

        <div class="flex items-center justify-center gap-2 mt-4 pt-2 border-t border-surface-container-high/40">
          <button
            @click="toggleSticker(item)"
            class="px-3 py-1 rounded-full bg-surface-container text-[10px] font-semibold text-primary hover:bg-surface-container-high"
          >
            {{ item.active ? 'Aktif' : 'Off' }}
          </button>
          <button
            @click="deleteSticker(item)"
            class="p-1 rounded-full text-rose-600 hover:bg-rose-50"
          >
            <span class="material-symbols-outlined text-[14px]">delete</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <div
      v-if="showUploadModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-primary/40 backdrop-blur-sm"
    >
      <div class="w-full max-w-md rounded-3xl bg-surface-container-lowest border border-surface-container-high shadow-soft-xl p-8">
        <div class="flex items-center justify-between mb-6 pb-3 border-b border-surface-container-high/60">
          <h3 class="text-base font-bold text-primary">Unggah {{ activeTab === 'frame' ? 'Frame' : 'Stiker' }}</h3>
          <button @click="showUploadModal = false" class="p-1 text-on-surface-variant hover:text-primary">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form @submit.prevent="handleUpload" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Nama Aset</label>
            <input
              v-model="uploadForm.name"
              required
              placeholder="Contoh: Glitter Neon Heart"
              class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-secondary"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Kategori</label>
            <input
              v-model="uploadForm.category"
              required
              placeholder="Contoh: Sparkles & Cute"
              class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-secondary"
            />
          </div>

          <!-- Upload Dropzone -->
          <div class="border-2 border-dashed border-secondary/40 rounded-2xl p-6 text-center bg-secondary-fixed/10 hover:bg-secondary-fixed/20 transition-colors cursor-pointer">
            <span class="material-symbols-outlined text-3xl text-secondary mb-1">cloud_upload</span>
            <p class="text-xs font-semibold text-primary">Klik atau seret file SVG/PNG ke sini</p>
            <p class="text-[10px] text-on-surface-variant mt-1">Transparan PNG atau SVG vector (Maks 2MB)</p>
          </div>

          <div class="flex items-center justify-end gap-3 pt-4 border-t border-surface-container-high/60">
            <button
              type="button"
              @click="showUploadModal = false"
              class="px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-6 py-2.5 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-sm hover:shadow-soft-md"
            >
              Simpan Aset
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import { assetFrames, assetStickers, showToast } from '@/composables/usePhotobooth'

const activeTab = ref('frame')
const showUploadModal = ref(false)

const uploadForm = ref({
  name: '',
  category: '',
  icon: 'star'
})

function openUploadModal() {
  uploadForm.value = {
    name: '',
    category: activeTab.value === 'frame' ? 'Pastel Art' : 'Cute Emoticon',
    icon: 'star'
  }
  showUploadModal.value = true
}

function handleUpload() {
  if (activeTab.value === 'frame') {
    assetFrames.value.unshift({
      id: 'F' + (assetFrames.value.length + 1).toString().padStart(2, '0'),
      name: uploadForm.value.name,
      category: uploadForm.value.category,
      uses: 0,
      file: 'frame_custom_new.svg',
      active: true
    })
    showToast(`Frame "${uploadForm.value.name}" berhasil diunggah!`)
  } else {
    assetStickers.value.unshift({
      id: 'S' + (assetStickers.value.length + 1).toString().padStart(2, '0'),
      name: uploadForm.value.name,
      category: uploadForm.value.category,
      uses: 0,
      icon: 'auto_awesome',
      active: true
    })
    showToast(`Stiker "${uploadForm.value.name}" berhasil ditambahkan!`)
  }
  showUploadModal.value = false
}

function toggleFrame(item) {
  item.active = !item.active
  showToast(`Frame ${item.active ? 'diaktifkan' : 'dinonaktifkan'}.`)
}

function deleteFrame(item) {
  if (confirm(`Hapus frame "${item.name}"?`)) {
    assetFrames.value = assetFrames.value.filter(f => f.id !== item.id)
    showToast(`Frame "${item.name}" telah dihapus.`, 'warning')
  }
}

function toggleSticker(item) {
  item.active = !item.active
  showToast(`Stiker ${item.active ? 'diaktifkan' : 'dinonaktifkan'}.`)
}

function deleteSticker(item) {
  if (confirm(`Hapus stiker "${item.name}"?`)) {
    assetStickers.value = assetStickers.value.filter(s => s.id !== item.id)
    showToast(`Stiker "${item.name}" telah dihapus.`, 'warning')
  }
}
</script>
