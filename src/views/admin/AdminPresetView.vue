<template>
  <AdminLayout title="Katalog Preset Photobooth" subtitle="Atur pilihan format foto, harga paket, jumlah pose, dan ketersediaan di layar booth">
    <!-- Header Controls -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <!-- Search & Category -->
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <div class="relative flex-1 sm:w-72">
          <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari preset foto..."
            class="w-full pl-11 pr-4 py-2.5 rounded-full bg-surface-container-lowest border border-surface-container-high text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 shadow-soft-sm"
          />
        </div>

        <select
          v-model="selectedCategory"
          class="px-4 py-2.5 rounded-full bg-surface-container-lowest border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-secondary shadow-soft-sm cursor-pointer"
        >
          <option value="Semua">Semua Kategori</option>
          <option value="Photostrip">Photostrip</option>
          <option value="Grid Photo">Grid Photo</option>
          <option value="Polaroid">Polaroid</option>
          <option value="Paket Spesial">Paket Spesial</option>
        </select>
      </div>

      <!-- Add Preset Button -->
      <button
        @click="openAddModal"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-on-primary text-xs font-semibold shadow-soft-sm hover:shadow-soft-md hover:scale-[1.02] transition-all"
      >
        <span class="material-symbols-outlined text-[18px]">add_circle</span>
        <span>Tambah Preset Baru</span>
      </button>
    </div>

    <!-- Presets Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="item in filteredPresets"
        :key="item.id"
        class="rounded-3xl bg-surface-container-lowest border border-surface-container-high/60 p-5 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between"
      >
        <div>
          <!-- Thumbnail & Status Pill -->
          <div class="relative w-full h-40 rounded-2xl overflow-hidden mb-4 bg-surface-container">
            <img :src="item.previewImage" :alt="item.name" class="w-full h-full object-cover" />
            <div class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-surface-container-lowest/90 backdrop-blur-sm text-secondary shadow-xs">
              {{ item.category }}
            </div>
            <div class="absolute top-2.5 right-2.5">
              <span
                class="px-2.5 py-1 rounded-full text-[10px] font-bold"
                :class="item.active ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-container text-on-surface-variant'"
              >
                {{ item.active ? 'Aktif di Booth' : 'Nonaktif' }}
              </span>
            </div>
          </div>

          <h3 class="text-base font-bold text-primary mb-1">{{ item.name }}</h3>
          <p class="text-xs text-on-surface-variant mb-4 line-clamp-2 leading-relaxed">{{ item.description }}</p>

          <div class="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low mb-4 text-xs">
            <div>
              <span class="text-[10px] uppercase font-bold text-on-surface-variant block">Harga Sesi</span>
              <span class="font-bold text-primary text-sm">{{ formatRupiah(item.price) }}</span>
            </div>
            <div class="text-right">
              <span class="text-[10px] uppercase font-bold text-on-surface-variant block">Format</span>
              <span class="font-semibold text-secondary">{{ item.poses }} Pose • {{ item.prints }} Cetak</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2 pt-3 border-t border-surface-container-high/50">
          <button
            @click="openEditModal(item)"
            class="flex-1 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors flex items-center justify-center gap-1"
          >
            <span class="material-symbols-outlined text-[16px]">edit</span>
            <span>Ubah</span>
          </button>

          <button
            @click="duplicatePreset(item)"
            class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-secondary transition-colors"
            title="Duplikat preset"
          >
            <span class="material-symbols-outlined text-[18px]">content_copy</span>
          </button>

          <button
            @click="toggleActive(item)"
            class="p-2 rounded-full hover:bg-surface-container transition-colors"
            :title="item.active ? 'Nonaktifkan preset' : 'Aktifkan preset'"
          >
            <span class="material-symbols-outlined text-[20px]" :class="item.active ? 'text-emerald-600' : 'text-outline'">
              {{ item.active ? 'toggle_on' : 'toggle_off' }}
            </span>
          </button>

          <button
            @click="confirmDelete(item)"
            class="p-2 rounded-full hover:bg-rose-50 text-rose-600 transition-colors"
            title="Hapus preset"
          >
            <span class="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredPresets.length === 0" class="text-center py-20 rounded-3xl bg-surface-container-lowest border border-dashed border-surface-container-high p-8">
      <span class="material-symbols-outlined text-4xl text-outline mb-2">filter_frames</span>
      <h4 class="text-base font-bold text-primary">Tidak Ada Preset Ditemukan</h4>
      <p class="text-xs text-on-surface-variant mt-1">Coba sesuaikan kata kunci pencarian atau kategori filter.</p>
    </div>

    <!-- Modal Tambah / Ubah Preset -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-primary/40 backdrop-blur-sm"
    >
      <div class="w-full max-w-lg rounded-3xl bg-surface-container-lowest border border-surface-container-high shadow-soft-xl p-8 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-surface-container-high/60">
          <div>
            <h3 class="text-lg font-bold text-primary">{{ isEditing ? 'Ubah Preset Foto' : 'Tambah Preset Baru' }}</h3>
            <p class="text-xs text-on-surface-variant">Konfigurasi paket foto dan jumlah pose</p>
          </div>
          <button @click="showModal = false" class="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form @submit.prevent="savePreset" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">Nama Preset</label>
            <input
              v-model="form.name"
              required
              placeholder="Contoh: Twin Strips Pastel"
              class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-secondary"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">Kategori</label>
              <select
                v-model="form.category"
                class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-secondary"
              >
                <option value="Photostrip">Photostrip</option>
                <option value="Grid Photo">Grid Photo</option>
                <option value="Polaroid">Polaroid</option>
                <option value="Paket Spesial">Paket Spesial</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">Harga Sesi (Rp)</label>
              <input
                v-model.number="form.price"
                type="number"
                step="1000"
                required
                class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">Jumlah Pose</label>
              <input
                v-model.number="form.poses"
                type="number"
                min="1"
                max="10"
                required
                class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">Jumlah Cetak Fisik</label>
              <input
                v-model.number="form.prints"
                type="number"
                min="1"
                max="8"
                required
                class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">Deskripsi Singkat</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-secondary"
              placeholder="Jelaskan keunggulan format dan pengalaman foto..."
            ></textarea>
          </div>

          <div>
            <label class="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">URL Gambar Sampel</label>
            <input
              v-model="form.previewImage"
              placeholder="https://..."
              class="w-full px-4 py-2.5 rounded-2xl bg-surface border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-secondary"
            />
          </div>

          <div class="flex items-center justify-end gap-3 pt-6 border-t border-surface-container-high/60">
            <button
              type="button"
              @click="showModal = false"
              class="px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-6 py-2.5 rounded-full bg-primary-container text-on-primary text-xs font-bold shadow-soft-sm hover:shadow-soft-md"
            >
              {{ isEditing ? 'Simpan Perubahan' : 'Tambahkan Preset' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import { presets, formatRupiah, showToast } from '@/composables/usePhotobooth'

const searchQuery = ref('')
const selectedCategory = ref('Semua')
const showModal = ref(false)
const isEditing = ref(false)

const form = ref({
  id: '',
  name: '',
  category: 'Photostrip',
  price: 35000,
  poses: 3,
  prints: 2,
  description: '',
  previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  active: true,
  badge: 'Custom'
})

const filteredPresets = computed(() => {
  return presets.value.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'Semua' || item.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

function openAddModal() {
  isEditing.value = false
  form.value = {
    id: 'P' + (presets.value.length + 1).toString().padStart(2, '0'),
    name: '',
    category: 'Photostrip',
    price: 35000,
    poses: 3,
    prints: 2,
    description: '',
    previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    active: true,
    badge: 'Paket Baru'
  }
  showModal.value = true
}

function openEditModal(item) {
  isEditing.value = true
  form.value = { ...item }
  showModal.value = true
}

function savePreset() {
  if (isEditing.value) {
    const idx = presets.value.findIndex(p => p.id === form.value.id)
    if (idx !== -1) {
      presets.value[idx] = { ...form.value }
      showToast(`Preset "${form.value.name}" berhasil diperbarui!`)
    }
  } else {
    presets.value.push({ ...form.value, tags: [`${form.value.poses} Pose`, `Cetak ${form.value.prints} Lembar`] })
    showToast(`Preset baru "${form.value.name}" berhasil ditambahkan!`)
  }
  showModal.value = false
}

function toggleActive(item) {
  item.active = !item.active
  showToast(`Preset "${item.name}" ${item.active ? 'diaktifkan' : 'dinonaktifkan'}.`)
}

function duplicatePreset(item) {
  const newId = 'P' + (presets.value.length + 1).toString().padStart(2, '0')
  const cloned = {
    ...item,
    id: newId,
    name: `${item.name} (Salinan)`
  }
  presets.value.push(cloned)
  showToast(`Preset "${cloned.name}" berhasil diduplikasi!`)
}

function confirmDelete(item) {
  if (confirm(`Yakin ingin menghapus preset "${item.name}"?`)) {
    presets.value = presets.value.filter(p => p.id !== item.id)
    showToast(`Preset "${item.name}" telah dihapus.`, 'warning')
  }
}
</script>
