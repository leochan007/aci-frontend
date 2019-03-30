<template>
<div>
  <v-toolbar v-if="isLarge" dark app>
    <img v-bind:src="logo_img" class='logo' @click="onHome" width='220px' alt="">
    <v-spacer />
    <v-text-field @keypress.native="onKeyPress" v-model="search_txt" hide-details prepend-inner-icon="search" single-line></v-text-field>
    <v-btn light @click="onSearch">{{ $t('message.search_btn') }}</v-btn>
    <v-toolbar-items>
      <v-layout baseline v-for="(item,i) in items" :key="i">
        <v-layout style="height:100%" v-if="item.lvl == 2">
          <v-menu open-on-hover bottom offset-y>
            <v-btn flat slot="activator">
              {{ item.text }}
            </v-btn>
            <v-list>
              <v-list-tile v-for="(sub_item, j) in item.sub_items" :key="j">
                <v-list-tile-title>
                  <v-btn bottom :to="sub_item.url">{{ sub_item.text }}</v-btn>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-layout>
        <v-layout v-else>
          <v-btn flat :to="item.url">{{ item.text }}</v-btn>
        </v-layout>
      </v-layout>
    </v-toolbar-items>
    <v-layout align-center justify-end row fill-height>
      <v-flex md9 lg5 xl3>
        <v-select menu-props="offsetY" dense solo class="lang_select" :items="langs" v-model="lang" @change="onChange">
          <template slot="selection" slot-scope="data">
            <v-avatar :size="avatar_size">
              <img :src="data.item.avatar" alt="avatar">
            </v-avatar>
          </template>
          <template slot="item" slot-scope="data">
            <v-list-tile-avatar :size="avatar_size">
              <img :src="data.item.avatar" alt="avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ data.item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </template>
        </v-select>
      </v-flex>
    </v-layout>
  </v-toolbar>

  <v-expansion-panel v-if="!isLarge" dark expand>
    <v-expansion-panel-content>
      <div slot="header">
        <img src="@/assets/logo.png" @click="onHome" width='150rem' alt="" />
      </div>
      <v-layout row align-baseline align-content-end wrap>
        <v-spacer />
        <v-flex xs4 sm3>
          <v-select menu-props="offsetY" solo class="lang_select" :items="langs" v-model="lang" @change="onChange">
            <template slot="selection" slot-scope="data">
              <v-avatar :size="avatar_size">
                <img :src="data.item.avatar" alt="avatar">
              </v-avatar>
            </template>
            <template slot="item" slot-scope="data">
              <v-list-tile-avatar :size="avatar_size">
                <img :src="data.item.avatar" alt="avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ data.item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </template>
          </v-select>
        </v-flex>
      </v-layout>
      <v-layout row child-flex align-center wrap>
        <v-spacer />
        <v-flex xs7>
          <v-text-field v-model="search_txt" hide-details prepend-inner-icon="search" single-line></v-text-field>
        </v-flex>
        <v-flex xs3>
          <v-btn light @click="onSearch">{{ $t('message.search_btn') }}</v-btn>
        </v-flex>
        <v-spacer />
      </v-layout>
      <v-layout baseline v-for="(item,i) in items" :key="i">
        <v-layout style="height:100%" v-if="item.lvl == 2">
          <v-menu open-on-hover bottom offset-y>
            <v-btn flat slot="activator">
              {{ item.text }}
            </v-btn>
            <v-list>
              <v-list-tile v-for="(sub_item, j) in item.sub_items" :key="j">
                <v-list-tile-title>
                  <v-btn bottom :to="sub_item.url">{{ sub_item.text }}</v-btn>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-layout>
        <v-layout v-else>
          <v-btn flat :to="item.url">{{ item.text }}</v-btn>
        </v-layout>
      </v-layout>
    </v-expansion-panel-content>
  </v-expansion-panel>

</div>
</template>

<style>
.logo:hover {
  cursor: pointer;
}

.lang_select {
  width: 80px !important;
}
</style>

<script>
import bus from '@/utils/event';
import {
  ON_PAGE_SIZE_CHANGE,
  ON_PAGE_CHANGE,
  ON_NATION_CHANGE,
} from '@/config/constants';

export default {
  name: 'Header',
  computed: {
    logo_img() {
      if (this.lang === 'en') {
      return require('@/assets/logo_en.png');
      }
      return require('@/assets/logo.png');
    },
    isLarge() {
      const name = this.$vuetify.breakpoint.name;
      return name === 'md' || name === 'lg' || name === 'xl';
    },
    items() {
      return [{
          lvl: 1,
          text: this.$t('message.menu_home'),
          url: '/',
        },
        { lvl: 1, text: this.$t('message.menu_stats'), url: '/stats' },
        { lvl: 1, text: this.$t('message.menu_rewards'), url: '/rewards' },
        {
          lvl: 1,
          text: this.$t('message.menu_transaction'),
          url: '/search?search_type=0&search_txt=&page=1&page_size=' + this.page_size,
        },
        {
          lvl: 1,
          text: this.$t('message.menu_about_us'),
          url: '/about_us',
        },
      ];
    },
    search_types() {
      return [{
          value: '0',
          text: this.$t('message.search_type_all'),
        },
        {
          value: '1',
          text: this.$t('message.search_type_account'),
        },
        {
          value: '2',
          text: this.$t('message.search_type_person_id'),
        },
        {
          value: '3',
          text: this.$t('message.search_type_reason'),
        },
        {
          value: '4',
          text: this.$t('message.search_type_tx_id'),
        },
      ];
    },
    input_holder() {
      return this.$t('message.PlzInput');
    },
  },
  data() {
    return {
      avatar_size: '20px',
      langs: [{
          value: 'cn',
          text: '简体中文',
          avatar: require('@/assets/CN.png'),
        },
        {
          value: 'en',
          text: 'EN',
          avatar: require('@/assets/US.png'),
        },
      ],
      search_txt: '',
      search_type: '0',
      page: 1,
      page_size: 10,
      lang: '',
    };
  },
  mounted() {

    this.lang = this.$store.getters['acarStore/getLang'];
    this.onChange(this.lang);

  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    onChange(val) {
      if (val === undefined || val === null || val === '') {
        val = 'cn';
      }
      this.$i18n.locale = val;
      this.$store.dispatch('acarStore/setLang', this.lang);
      bus.$emit(ON_NATION_CHANGE, this.lang);
    },

    onKeyPress(ev) {
      if (ev.keyCode === 13) {
        this.onSearch();
      }
    },

    fetchData() {
      if (this.$route.path !== '/search') {
        this.search_type = '0';
        this.search_txt = '';
      }
    },

    onHome() {
      this.$router.push({
        path: '/',
      });
    },

    onSearch() {
      const queryCond = {
        search_type: this.search_type,
        search_txt: this.search_txt.trim(),
        page: this.page,
        page_size: this.page_size,
      };
      this.$router.push({
        path: '/search',
        query: queryCond,
      });

    },
  },
};
</script>
