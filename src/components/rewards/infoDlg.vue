<template>
  <div name="reward_info">
    <v-card :key="selectedId" class="pt-4 mx-auto" flat>
      <v-card-text>
        <h3
          class="headline mb-2 text-lg-center"
        >{{ $t("message.issueNumber_prefix") }}{{ rrInfo.issueNumber }}{{ $t("message.issueNumber_suffix") }}</h3>
        <div class="red--text mb-2 subheading font-weight-bold text-lg-center">
          <img v-if="rrInfo.ranking === 1" src="@/assets/gold.png" alt="avatar">
          <img v-else-if="rrInfo.ranking === 2" src="@/assets/silver.png" alt="avatar">
          <img v-else src="@/assets/bronze.png" alt="avatar">
          <div class="yellow--text" v-if="rrInfo.ranking === 1">{{ $t("message.ranking1") }}</div>
          <div class="grey--text" v-else-if="rrInfo.ranking === 2">{{ $t("message.ranking2") }}</div>
          <div class="brown--text" v-else>{{ $t("message.ranking3") }}</div>
        </div>
        <v-divider></v-divider>
      <v-layout text-xs-left wrap>
        <v-flex tag="strong" xs2 text-xs-left mr-0 mb-2>{{ $t("message.tbl_name") }}:</v-flex>
        <v-flex class="blue--text">{{ rrInfo.name }}</v-flex>
      </v-layout>
      <v-layout text-xs-left wrap>
        <v-flex tag="strong" xs2 text-xs-left mr-0 mb-2>{{ $t("message.tbl_account") }}:</v-flex>
        <v-flex>{{ rrInfo.account }}</v-flex>
      </v-layout>
      <v-layout text-xs-left wrap>
        <v-flex tag="strong" xs2 text-xs-left mr-0 mb-2>{{ $t("message.releaseDate") }}:</v-flex>
        <v-flex>{{ transDate(rrInfo.recordTime) }}</v-flex>
      </v-layout>
      <v-layout text-xs-left wrap>
        <v-flex tag="strong" xs2 text-xs-left mr-0 mb-2>{{ $t("message.tbl_tx_id") }}:</v-flex>
        <v-flex v-if="isBlank(rrInfo.txId)">{{ $t("message.empty_hash") }}</v-flex>
        <v-flex v-else>
          <a :href="baseUrl + rrInfo.txId">{{ rrInfo.txId }}</a>
        </v-flex>
      </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<style>
/*
.v--modal-overlay[data-modal="reward_info"] {
    background: transparent;
    opacity: 0.9;
}
*/
</style>

<script>
import { toLocalDate } from "@/utils/dt_tools";

import voca from "voca";

import {
  txUrl,
} from '@/config/app_config';

export default {
  props: {
    selectedId: "",
    rrInfo: {}
  },
  components: {},
  data() {
    return {
      baseUrl: txUrl,
    };
  },
  created() {
    console.log("rrinfo:", this.rrInfo);
  },
  methods: {
    isBlank(field) {
      return voca.isBlank(field);
    },

    transDate(datetime) {
      return toLocalDate(datetime, this.$i18n.locale);
    }
  },
  name: "infoDlg"
};
</script>
