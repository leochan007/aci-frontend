<template>
  <v-layout justify-space-between pa-3>
    <v-flex xs12>
      <v-treeview
        :active.sync="active"
        :items="rankingList"
        :open.sync="open"
        active-class="primary--text"
        activatable
        open-on-click
        item-children="data"
        item-key="_id"
        transition
      >
        <template v-slot:prepend="{ item, active }">
          <div
            v-if="item.data"
          >{{ $t("message.issueNumber_prefix") }} {{ item._id }} {{ $t("message.issueNumber_suffix") }}</div>
          <div v-else>
            <v-avatar :size="20" color="grey lighten-4">
              <img v-if="item.ranking === 1" src="@/assets/gold.png" alt="avatar">
              <img v-else-if="item.ranking === 2" src="@/assets/silver.png" alt="avatar">
              <img v-else src="@/assets/bronze.png" alt="avatar">
            </v-avatar>
          </div>
        </template>
      </v-treeview>
    </v-flex>
  </v-layout>
</template>

<style>
.chart {
  background-color: white;
  border-radius: 4px;
}

.chart_left {
  border-right: #f2f2f2 10px solid;
}
</style>

<script>
import bus from '@/utils/event';
import { ON_CATEGORY_CHANGE } from '@/config/constants';
import qs from 'qs';
import { toLocalDate } from '@/utils/dt_tools';

import voca from 'voca';

import infoDlg from '@/components/rewards/infoDlg.vue';

import {
  txUrl,
} from '@/config/app_config';

export default {
  props: {
    category: '',
  },
  data() {
    return {
      baseUrl: txUrl,
      active: [],
      open: [],
      rankingList: [],
      selectedId: '',
      rrInfo: {},
    };
  },

  computed: {
    selected() {
      const self = this;
      if (!self.active.length) {
        console.log('selectedId = ""');
        self.selectedId = '';
        return false;
      }
      self.selectedId = self.active[0];
      console.log('selectedId = ', self.selectedId);
      return true;
    },
  },
  methods: {

    fetchData(category) {
      const self = this;

      const params = {
        activity_type: self.category,
      };

      self.$http
        .get('/aci_api/rewardrecord/groupinfo?' + qs.stringify(params))
        .then(
          (response) => {
            if (response.status === 200) {
              self.active = [];
              self.open = [];

              self.rankingList = response.data.data.txs_count;
            }
          },
        );
    },

    closeInfo() {
        this.$modal.hide('reward_info');
    },

    beforeClose() {
      console.log('beforeClose exec!');
      this.active = [];
    },

    openInfo() {
      // beforeClose: this.beforeClose
        this.$modal.show(infoDlg, 
        { selectedId: this.selectedId, rrInfo: this.rrInfo }, 
        {
        }, {
          'before-close': (event) => { this.beforeClose(); }
        });
    },

  },
  components: {
  },
  watch: {
    category: function(newCategory, oldCategory) {
      this.fetchData(newCategory);
    },
    active(newActive, oldActive) {
      const self = this;
      if (!self.active.length) {
        self.selectedId = '';
        return false;
      } else {
        self.selectedId = self.active[0];

        self.$http.get('/aci_api/rewardrecord/hash/' + self.selectedId).then(
          (response) => {
            if (response.status === 200) {
              self.rrInfo = response.data.data;
              self.openInfo();
            }
        },
      );

      }
      return true;
    },
  },
};
</script>
