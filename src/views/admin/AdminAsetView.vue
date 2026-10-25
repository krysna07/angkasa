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

      <div class="flex items-center gap-3">
        <!-- Google Drive Import Button -->
        <button
          @click="openDriveModal"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest border border-surface-container-high/80 text-primary text-xs font-semibold shadow-soft-sm hover:bg-surface-container-low transition-all"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.5 13.9L16.2 3.1c-.2-.4-.6-.6-1-.6H8.8c-.4 0-.8.2-1 .6L1.5 13.9c-.2.4-.2.8 0 1.2l3.1 5.4c.2.4.6.6 1 .6h12.8c.4 0 .8-.2 1-.6l3.1-5.4c.2-.4.2-.8 0-1.2z"/>
            <path fill="#FBBC05" d="M15.2 2.5H8.8c-.4 0-.8.2-1 .6L1.5 13.9c-.2.4-.2.8 0 1.2l3.1 5.4 7.6-13.2 3-4.8z"/>
            <path fill="#34A853" d="M12.2 7.3L4.6 20.5c.2.4.6.6 1 .6h12.8c.4 0 .8-.2 1-.6l3.1-5.4-9.3-7.8z"/>
          </svg>
          <span>Impor dari Google Drive</span>
        </button>

        <!-- Upload Button -->
        <button
          @click="openUploadModal"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-on-primary text-xs font-semibold shadow-soft-sm hover:shadow-soft-md hover:scale-[1.02] transition-all"
        >
          <span class="material-symbols-outlined text-[18px]">upload</span>
          <span>Unggah {{ activeTab === 'frame' ? 'Frame' : 'Stiker' }} Baru</span>
        </button>
      </div>
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

    <!-- Modal Google Drive Import (Card 12) -->
    <div
      v-if="showDriveModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-primary/40 backdrop-blur-sm animate-fade"
    >
      <div class="w-full max-w-lg rounded-3xl bg-surface-container-lowest border border-surface-container-high shadow-soft-xl p-8 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-5 pb-4 border-b border-surface-container-high/60">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-secondary-fixed/50 flex items-center justify-center">
              <svg class="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.5 13.9L16.2 3.1c-.2-.4-.6-.6-1-.6H8.8c-.4 0-.8.2-1 .6L1.5 13.9c-.2.4-.2.8 0 1.2l3.1 5.4c.2.4.6.6 1 .6h12.8c.4 0 .8-.2 1-.6l3.1-5.4c.2-.4.2-.8 0-1.2z"/>
                <path fill="#FBBC05" d="M15.2 2.5H8.8c-.4 0-.8.2-1 .6L1.5 13.9c-.2.4-.2.8 0 1.2l3.1 5.4 7.6-13.2 3-4.8z"/>
                <path fill="#34A853" d="M12.2 7.3L4.6 20.5c.2.4.6.6 1 .6h12.8c.4 0 .8-.2 1-.6l3.1-5.4-9.3-7.8z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-base font-bold text-primary">Impor dari Google Drive</h3>
              <p class="text-xs text-on-surface-variant">Pilih file PNG/SVG dari folder Drive tim kreatif</p>
            </div>
          </div>
          <button @click="showDriveModal = false" class="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Drive Path Breadcrumbs -->
        <div class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low text-xs text-on-surface-variant mb-4 border border-surface-container-high/60">
          <span class="material-symbols-outlined text-[16px] text-secondary">folder_shared</span>
          <span>Google Drive</span>
          <span>/</span>
          <span class="font-bold text-primary">Angkasa Design Kit 2026</span>
          <span>/</span>
          <span class="text-secondary font-semibold">{{ activeTab === 'frame' ? 'Frames' : 'Stickers' }}</span>
        </div>

        <!-- Drive Files Picker List -->
        <div class="space-y-2 mb-6">
          <div
            v-for="file in driveFiles"
            :key="file.id"
            @click="toggleDriveFile(file)"
            class="p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between"
            :class="file.selected ? 'bg-secondary-fixed/30 border-secondary' : 'bg-surface-container-low border-surface-container-high/60 hover:bg-surface-container'"
          >
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-[22px]" :class="file.selected ? 'text-secondary' : 'text-on-surface-variant'">
                {{ file.type === 'frame' ? 'crop_portrait' : 'auto_awesome' }}
              </span>
              <div>
                <p class="text-xs font-bold text-primary">{{ file.name }}</p>
                <p class="text-[10px] text-on-surface-variant">{{ file.size }} • Disinkronkan Google Drive</p>
              </div>
            </div>

            <div 
              class="w-5 h-5 rounded-md border flex items-center justify-center transition-colors"
              :class="file.selected ? 'bg-secondary border-secondary text-on-secondary' : 'border-outline-variant bg-surface'"
            >
              <span v-if="file.selected" class="material-symbols-outlined text-[14px]">check</span>
            </div>
          </div>
        </div>

        <!-- Progress bar when importing -->
        <div v-if="isImportingFromDrive" class="mb-4">
          <div class="flex justify-between text-xs text-primary font-bold mb-1">
            <span>Mengunduh aset dari Google Drive...</span>
            <span>{{ importProgress }}%</span>
          </div>
          <div class="w-full h-2 rounded-full bg-surface-container overflow-hidden">
            <div class="h-full bg-secondary rounded-full transition-all duration-300" :style="{ width: importProgress + '%' }"></div>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="flex items-center justify-end gap-3 pt-4 border-t border-surface-container-high/60">
          <button
            type="button"
            @click="showDriveModal = false"
            :disabled="isImportingFromDrive"
            class="px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary"
          >
            Batal
          </button>
          <button
            type="button"
            @click="processDriveImport"
            :disabled="isImportingFromDrive || selectedDriveFilesCount === 0"
            class="px-6 py-2.5 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-sm hover:shadow-soft-md disabled:opacity-50 flex items-center gap-1.5"
          >
            <span v-if="isImportingFromDrive" class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
            <span>Impor {{ selectedDriveFilesCount }} Aset Terpilih</span>
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import { assetFrames, assetStickers, showToast } from '@/composables/usePhotobooth'

const activeTab = ref('frame')
const showUploadModal = ref(false)
const showDriveModal = ref(false)
const isImportingFromDrive = ref(false)
const importProgress = ref(0)

const driveFiles = ref([
  { id: 'GD-01', name: 'Vintage Y2K Strip (Neon Stars).png', size: '2.4 MB', type: 'frame', selected: true },
  { id: 'GD-02', name: 'Pastel Dream Heart Ribbon.png', size: '1.8 MB', type: 'frame', selected: true },
  { id: 'GD-03', name: 'Cyberpunk Purple Neon Overlay.svg', size: '920 KB', type: 'frame', selected: false },
  { id: 'GD-04', name: 'Cat Ear & Whiskers Sparkle.png', size: '640 KB', type: 'sticker', selected: false }
])

const selectedDriveFilesCount = computed(() => driveFiles.value.filter(f => f.selected).length)

function openDriveModal() {
  showDriveModal.value = true
}

function toggleDriveFile(file) {
  file.selected = !file.selected
}

function processDriveImport() {
  isImportingFromDrive.value = true
  importProgress.value = 20

  const interval = setInterval(() => {
    if (importProgress.value < 100) {
      importProgress.value += 30
    } else {
      clearInterval(interval)
      isImportingFromDrive.value = false
      showDriveModal.value = false
      importProgress.value = 0

      // Add to frames
      assetFrames.value.unshift({
        id: 'F' + (assetFrames.value.length + 1).toString().padStart(2, '0'),
        name: 'Vintage Y2K Strip (Drive)',
        category: 'Drive Import',
        uses: 0,
        file: 'frame_y2k_drive.png',
        active: true
      })

      showToast('Aset dari Google Drive berhasil diimpor ke sistem!')
    }
  }, 400)
}

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
