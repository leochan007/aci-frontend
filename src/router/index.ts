import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/components/Index.vue';
import Stats from '@/components/Stats.vue';
import Rewards from '@/components/Rewards.vue';
import SearchResult from '@/components/SearchResult.vue';
import ACIDetail from '@/components/ACIDetail.vue';
import AboutUs from '@/components/AboutUs.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/stats',
      component: Stats,
    },
    {
      path: '/search',
      component: SearchResult,
    },
    {
      path: '/rewards',
      component: Rewards,
    },
    {
      path: '/aci_detail/:hash',
      component: ACIDetail,
    },
    {
      path: '/about_us',
      component: AboutUs,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
