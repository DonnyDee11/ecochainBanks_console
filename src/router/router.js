import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '../components/DashboardPage.vue';
import LandingPage from '../components/LandingPage.vue'; 
import CreateNewReport from '../components/CreateNewReport.vue'; 
import SignUp from '../components/SignUpForm.vue'; 
import SuccessPage from  '../components/SuccessPage.vue'; 
import MintPage from  '../components/MintPage.vue'; 
import OrganisationForm from '../components/OrganisationForm.vue';
import AdminSubmissions from '../components/AdminSubmissions.vue';
import AuditorSubmissions from '../components/AuditorSubmissions.vue';

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
    path: '/AdminSubmissions',
    name: 'AdminSubmissions',
    component: AdminSubmissions
  },
  {
    path: '/AuditorSubmissions',
    name: 'AuditorSubmissions',
    component: AuditorSubmissions
  },
  {
    path: '/SuccessPage',
    name: 'SuccessPage',
    component: SuccessPage
  },
  {
    path: '/MintPage',
    name: 'MintPage',
    component: MintPage
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
