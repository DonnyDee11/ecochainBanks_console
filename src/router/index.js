
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
// import { createRouter, createWebHistory } from 'vue-router/auto'
import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '../components/DashboardPage.vue';
import LandingPage from '../components/LandingPage.vue'; 
import CreateNewReport from '../components/CreateNewReport.vue'; 
import SignUp from '../components/SignUpForm.vue'; 
import SuccessPage from  '../components/SuccessPage.vue'; 
import OrganisationForm from '../components/OrganisationForm.vue';
import AdminSubmissions from '../components/AdminSubmissions.vue'
import AuditorSubmissions from '../components/AuditorSubmissions.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp // Corrected the component name
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage
  },
  {
    path: '/CreateNewReport',
    name: 'CreateNewReport',
    component: CreateNewReport
  },
  {
    path: '/organisation_form',
    name: 'OrganisationForm',
    component: OrganisationForm
  },
  {
    path: '/SuccessPage',
    name: 'SuccessPage',
    component: SuccessPage
  },
  {
    path: '/AdminSubmissions',
    name: 'AdminSubmissions',
    component: AdminSubmissions
  },
  {
    path: '/AuditorSubmissions',
    name: 'AuditorSubmissions',
    component: AuditorSubmissions
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
