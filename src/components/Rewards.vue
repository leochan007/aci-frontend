<template>
  <div class="container">
    <v-flex xs5 sm2 d-flex>
      <v-select :items="categories" :value="category" @change="onChange"></v-select>
    </v-flex>
    <ranking :category="category"></ranking>
  </div>
</template>

<script>
import bus from '@/utils/event';

import ranking from '@/components/rewards/ranking.vue';

export default {
  components: {
    ranking,
  },
  data() {
    return {
      categories: [],
      category: '',
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    onChange(newVal) {
      this.category = newVal;
    },
    fetchData() {
      const self = this;

      self.$http.get('/aci_api/rewardrecord/classification').then(
        (response) => {
          if (response.status === 200) {
            const data = response.data.data.txs_count;
            self.categories = [];
            for (let ind = 0; ind < data.length; ind++) {
              self.categories.push(data[ind]._id);
            }

            if (self.categories.length > 0) {
              self.category = self.categories[0];
            }
            self.loading = false;
          }
        },
      );
    },
  },
};
</script>
