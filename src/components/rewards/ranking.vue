<template>
  <v-layout justify-space-between pa-3>
    <v-flex xs5>
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
    <v-flex d-flex text-xs-center>
      <v-scroll-y-transition mode="out-in">
        <div
          v-if="!selected"
          class="title grey--text text--lighten-1 font-weight-light"
          style="align-self: center;"
        >{{ $t("message.selectIssue") }}</div>
        <v-card v-else :key="selectedId" class="pt-4 mx-auto" flat max-width="400">
          <v-card-text>
            <h3
              class="headline mb-2"
            >{{ $t("message.issueNumber_prefix") }}{{ rrInfo.issueNumber }}{{ $t("message.issueNumber_suffix") }}</h3>
            <div class="red--text mb-2 subheading font-weight-bold">
              <img v-if="rrInfo.ranking === 1" src="@/assets/gold.png" alt="avatar">
              <img v-else-if="rrInfo.ranking === 2" src="@/assets/silver.png" alt="avatar">
              <img v-else src="@/assets/bronze.png" alt="avatar">
              <div class="yellow--text" v-if="rrInfo.ranking === 1">{{ $t("message.ranking1") }}</div>
              <div class="grey--text" v-else-if="rrInfo.ranking === 2">{{ $t("message.ranking2") }}</div>
              <div class="brown--text" v-else>{{ $t("message.ranking3") }}</div>
            </div>
            <v-divider></v-divider>
            <v-layout text-xs-left wrap>
              <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>{{ $t("message.tbl_name") }}:</v-flex>
              <v-flex class="blue--text">{{ rrInfo.name }}</v-flex>
            </v-layout>
          </v-card-text>
          <v-layout text-xs-left wrap>
            <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>{{ $t("message.tbl_account") }}:</v-flex>
            <v-flex>{{ rrInfo.account }}</v-flex>
            <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>{{ $t("message.releaseDate") }}:</v-flex>
            <v-flex>{{ transDate(rrInfo.recordTime) }}</v-flex>
          </v-layout>
          <v-layout text-xs-left wrap>
            <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>{{ $t("message.tbl_tx_id") }}:</v-flex>
            <v-flex v-if="isBlank(rrInfo.txId)">{{ $t("message.empty_hash") }}</v-flex>
            <v-flex v-else>
              <a :href="baseUrl + rrInfo.txId">{{ rrInfo.txId }}</a>
            </v-flex>
          </v-layout>
        </v-card>
      </v-scroll-y-transition>
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

import {
  txUrl,
} from '@/config/app_config';

export default {
  props: {
    category: ''
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
      if (!self.active.length) return undefined;
      self.selectedId = self.active[0];
      return self.selectedId;
    },
  },
  methods: {
    isBlank(field) {
      return voca.isBlank(field);
    },

    transDate(datetime) {
      return toLocalDate(datetime, this.$i18n.locale);
    },

    fetchData(category) {
      const self = this;

      const params = {
        activity_type: self.category
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
        (error) => {
            // console.log(error);
        },
        );
    },
  },
  watch: {
    category: function(newCategory, oldCategory) {
      this.fetchData(newCategory);
    },
    selectedId: function(newId, oldId) {
      const self = this;

      self.$http.get('/aci_api/rewardrecord/hash/' + newId).then(
        (response) => {
          if (response.status === 200) {
            self.rrInfo = response.data.data;
            // console.log(self.rrInfo);
          }
        },
        (error) => {
            // console.log(error);
        },
      );
    },
  },
};
</script>
