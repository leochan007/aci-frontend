<template>
<v-container>
  <v-layout align-center justify-center v-if="show_cond === 0" class="display-1 text-lg-center">{{ $t("message.loading") }}</v-layout>
  <v-layout align-center justify-center v-else-if="show_cond === 1" class="display-1 text-lg-center">{{ $t("message.no_aci_info") }}</v-layout>
  <v-layout align-start justify-center v-else-if="show_cond === 2" class="body-1">
    <v-flex xs12 sm12 md10 lg8 xl6>
      <v-layout justify-center column wrap class="text-lg-left black--text">
        <v-layout justify-center wrap class="headline text-lg-center">
          {{ $t("message.aci_info") }}
        </v-layout>
        <v-divider></v-divider>
        <v-layout wrap>
          <v-layout wrap>
            <v-flex class="body-2" xs3>{{ $t("message.tbl_account") }}:</v-flex>
            <v-flex>{{ account }}</v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex class="body-2" xs3>{{ $t("message.tbl_register_time") }}:</v-flex>
            <v-flex>{{ transDatetime(register_time) }}</v-flex>
          </v-layout>
        </v-layout>
        <v-divider></v-divider>
        <v-layout wrap>
          <v-layout wrap>
            <v-flex class="body-2">{{ $t("message.tbl_name") }}:
            </v-flex>
            <v-flex v-if="name === '' || name === undefined">{{ $t("message.empty_info") }}</v-flex>
            <v-flex v-else>{{ name }}</v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex class="body-2">{{ $t("message.tbl_person_id") }}:</v-flex>
            <v-flex v-if="person_id === '' || person_id === undefined">{{ $t("message.empty_info") }}</v-flex>
            <v-flex v-else>{{ person_id }}</v-flex>
          </v-layout>
        </v-layout>
        <v-divider></v-divider>
        <v-layout column wrap>
          <v-flex class="body-2">{{ $t("message.tbl_comments") }}:</v-flex>
          <v-flex>{{ comments }}</v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-layout wrap>
          <v-layout wrap>
            <v-flex class="body-2" xs5>{{ $t("message.tbl_moral_crsis_type") }}:</v-flex>
            <v-flex class='red--text'>{{ moralCrisisType }}</v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex class="body-2" xs4>{{ $t("message.tbl_record_time") }} :</v-flex>
            <v-flex>{{ transDatetime(record_time) }}</v-flex>
          </v-layout>
        </v-layout>
        <v-divider></v-divider>
        <v-layout column wrap>
          <v-layout class="body-2">{{ $t("message.tbl_reason") }}:</v-layout>
          <v-layout>{{ reason }}</v-layout>
        </v-layout>
        <v-divider></v-divider>
        <v-layout wrap class="text-truncate">
          <v-flex class="body-2" xs3 md2>{{ $t("message.tbl_hash") }}:</v-flex>
          <v-flex>{{ hash }}</v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout wrap class="text-truncate">
          <v-flex class="body-2" xs3 md2>{{ $t("message.tbl_tx_id") }}:</v-flex>
          <v-flex v-if="tx_id=='' || tx_id==undefined">{{ $t("message.empty_hash") }}</v-flex>
          <v-flex v-else>
            <a :href="cEostracerUrl + tx_id">{{ tx_id }}</a>
          </v-flex>
        </v-layout>
        <v-layout wrap></v-layout>
        <v-layout class="mt-5">
          <v-spacer></v-spacer>
          <v-btn dark @click="onBack">{{ $t("message.Back") }}</v-btn>
          <v-spacer></v-spacer>
        </v-layout>
      </v-layout>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import bus from '@/utils/event';
import qs from 'qs';
import {
  toLocalTime,
} from '@/utils/dt_tools';

import {
  eostracerUrl,
} from '@/config/app_config';

export default {
  components: {},
  computed: {},

  data() {
    return {
      show_cond: 0,
      cEostracerUrl: eostracerUrl,
      create_time: 0,
      account: '',
      name: '',
      person_id: '',
      comments: '',
      register_time: 0,
      reason: '',
      record_time: 0,
      moralCrisisType: '',
      hash: '',
      tx_id: '',
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    transDatetime(datetime) {
      return toLocalTime(datetime, this.$i18n.locale);
    },

    fetchData() {
      const self = this;
      const hash = self.$route.params.hash;

      self.$http.get('/aci_api/creditinquiry/hash/' + hash).then(
        (response) => {
          if (response.status === 200) {
            if (response.data.error_code === 0) {
              self.create_time = response.data.data.createTime;
              self.account = response.data.data.account;
              self.name = response.data.data.name;
              self.person_id = response.data.data.personId;
              self.comments = response.data.data.comments;
              self.register_time = response.data.data.registerTime;
              self.reason = response.data.data.reason;
              self.record_time = response.data.data.recordTime;
              self.moralCrisisType = response.data.data.moralCrisisType;
              self.hash = response.data.data.hash;
              self.tx_id = response.data.data.txId;
              self.show_cond = 2;
            } else {
              self.show_cond = 1;
            }
          }
        },
        (error) => {
          // console.log(error);
        },
      );
    },

    onBack() {
      this.$router.go(-1);
    },
  },
};
</script>
