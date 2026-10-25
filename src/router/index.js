import { createRouter, createWebHistory } from 'vue-router'
import { adminAuth } from '@/composables/usePhotobooth'

import LandingView from '@/views/LandingView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
import TermsView from '@/views/TermsView.vue'
import KioskView from '@/views/KioskView.vue'
import MobileEditorView from '@/views/MobileEditorView.vue'

import AdminLoginView from '@/views/admin/AdminLoginView.vue'
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue'
import AdminPresetView from '@/views/admin/AdminPresetView.vue'
import AdminAsetView from '@/views/admin/AdminAsetView.vue'
import AdminRiwayatView from '@/views/admin/AdminRiwayatView.vue'
import AdminPengaturanView from '@/views/admin/AdminPengaturanView.vue'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingView
  },
  {
    path: '/kebijakan-privasi',
    name: 'privacy',
    component: PrivacyView
  },
  {
    path: '/syarat-ketentuan',
    name: 'terms',
    component: TermsView
  },
  {
    path: '/kiosk',
    name: 'kiosk',
    component: KioskView
  },
  {
    path: '/editor',
    name: 'mobile-editor',
    component: MobileEditorView
  },
  // Admin Portal Routes
  {
    path: '/admin',
    redirect: '/admin/ringkasan'
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLoginView
  },
  {
    path: '/admin/ringkasan',
    name: 'admin-dashboard',
    component: AdminDashboardView
  },
  {
    path: '/admin/preset',
    name: 'admin-preset',
    component: AdminPresetView
  },
  {
    path: '/admin/aset',
    name: 'admin-aset',
    component: AdminAsetView
  },
  {
    path: '/admin/riwayat',
    name: 'admin-riwayat',
    component: AdminRiwayatView
  },
  {
    path: '/admin/pengaturan',
    name: 'admin-pengaturan',
    component: AdminPengaturanView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  // Check if navigating to protected admin routes (except login)
  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    // If user is not authenticated, redirect to login
    if (!adminAuth.value.isAuthenticated) {
      return next({ name: 'admin-login', query: { redirect: to.fullPath } })
    }
  }

  next()
})

export default router
