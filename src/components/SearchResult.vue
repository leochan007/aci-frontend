<template>
  <div>
    <div v-if="showCond == 0" class="display-1 text-lg-center">{{ $t("message.loading") }}</div>
    <div v-else-if="showCond == 1" class="body-1">
      <v-container fluid>
        <v-layout row wrap class="headline">
          <v-spacer></v-spacer>
          <v-flex class="text-lg-center">{{ $t("message.tx_list") }}</v-flex>
          <v-spacer></v-spacer>
        </v-layout>

        <v-data-table
          hide-actions
          :headers="fields"
          :items="tableData"
          :loading="loading"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <tr class="text-xs-left" @click="viewDetail(props.item.hash)">
              <td>{{ props.item.account }}</td>
              <td>
                <div
                  v-if="props.item.name==='' || props.item.name===undefined"
                >{{ $t("message.empty_info") }}</div>
                <div v-else>
                  <div>{{ props.item.name }}</div>
                </div>
              </td>
              <td>
                <div
                  v-if="props.item.personId==='' || props.item.personId===undefined"
                >{{ $t("message.empty_info") }}</div>
                <div v-else>
                  <div>{{ props.item.personId }}</div>
                </div>
              </td>
              <td class="red--text">{{ props.item.moralCrisisType }}</td>
              <td>{{ transDatetime(props.item.recordTime) }}</td>
              <td>
                <div
                  v-if="props.item.txId === '' || props.item.txId === undefined"
                >{{ $t("message.empty_hash") }}</div>
                <div v-else>
                  <div>
                    <a :href="baseUrl + props.item.txId">{{ props.item.txId }}</a>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>

        <v-layout row wrap class="mt-2">
          <v-spacer></v-spacer>
          <v-flex class="text-lg-right">
            <b-select
              style="width:70px"
              @change="handleSizeChange"
              v-model="pageSize"
              :options="pageSizes"
            />
          </v-flex>
          <v-flex class="text-lg-left">
            <b-pagination
              @change="handleCurrentChange"
              size="md"
              :total-rows="totalCount"
              v-model="page"
              :per-page="pageSize"
            ></b-pagination>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>

        <v-layout row wrap>
          <v-spacer></v-spacer>
          <v-btn dark @click="onBack">{{ $t("message.Back") }}</v-btn>
          <v-spacer></v-spacer>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<style scoped>
.table_tr:hover {
  cursor: pointer;
}
</style>

<script>
import bus from '@/utils/event';
import qs from 'qs';
import { toLocalTime } from '@/utils/dt_tools';

import { txUrl } from '@/config/app_config';

export default {
  components: {},
  computed: {
    fields() {
      return [
        {
          value: 'account',
          align: 'left',
          sortable: false,
          text: this.$t('message.tbl_account'),
        },
        {
          value: 'name',
          align: 'left',
          sortable: false,
          text: this.$t('message.tbl_name'),
        },
        {
          value: 'personId',
          align: 'left',
          sortable: false,
          text: this.$t('message.tbl_person_id'),
        },
        {
          value: 'moralCrisisType',
          align: 'left',
          sortable: false,
          text: this.$t('message.tbl_moral_crsis_type'),
        },
        {
          value: 'recordTime',
          align: 'left',
          sortable: false,
          text: this.$t('message.tbl_record_time'),
        },
        {
          value: 'txId',
          align: 'left',
          sortable: false,
          text: this.$t('message.tbl_tx_id'),
        },
      ];
    },
  },
  data() {
    return {
      loading: true,
      baseUrl: txUrl,
      totalCount: 0,
      greetingMsg: '',
      tableData: [],
      page: 1,
      pageSizes: [5, 10, 20, 50, 100],
      pageSize: 10,
      searchType: 0,
      searchTxt: '',
      showCond: 0,
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    transDatetime(datetime) {
      return toLocalTime(datetime, this.$i18n.locale);
    },

    viewDetail(hash) {
      this.$router.push({
        path: '/aci_detail/' + hash,
      });
    },
    onSearch() {
      const self = this;
      const queryCond = {
        search_type: self.search_type,
        search_txt: self.search_txt,
        page: self.page,
        page_size: self.pageSize,
      };
      self.$router.push({
        path: '/search',
        query: queryCond,
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.page = 1;
      this.onSearch();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.onSearch();
    },
    fetchData() {
      const self = this;
      const searchType = self.$route.query.search_type;
      const searchTxt = self.$route.query.search_txt;
      const page = parseInt(self.$route.query.page, 10);
      let pageSize = parseInt(self.$route.query.page_size, 10);
      if (searchType !== undefined) {
        self.searchType = searchType;
      }
      if (searchTxt !== undefined) {
        self.searchTxt = searchTxt;
      }
      if (page !== undefined && !isNaN(page)) {
        self.page = page;
      }
      if (self.page < 1) {
        self.page = 1;
      }
      if (
        pageSize === undefined ||
        isNaN(pageSize) ||
        self.pageSizes.indexOf(pageSize) === -1
      ) {
        pageSize = self.pageSizes[0];
      }
      self.pageSize = pageSize;
      const params = {
        search_type: self.searchType,
        search_txt: self.searchTxt,
        page: self.page - 1,
        page_size: self.pageSize,
      };
      self.$http
        .get('/aci_api/creditinquiry/list?' + qs.stringify(params))
        .then(
          (response) => {
            if (response.status === 200) {
              self.totalCount = response.data.data.total_count;
              self.tableData = response.data.data.lst;
              self.showCond = 1;
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
