<template>
  <div>
    <v-card height="350px">
      <v-img max-height="250px" :src="v_card_img" :aspect-ratio="aspectRatio"></v-img>

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ this.$t('message.EosSCAddr') }}</h3>
          <div>
            {{ this.$t('message.EosSCInfo1') }}
            <a :href="url">{{ service_account }}</a>
            {{ this.$t('message.EosSCInfo2') }}
          </div>
        </div>
      </v-card-title>

      <!--v-card-actions>
        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
      </v-card-actions-->
    </v-card>
  </div>
</template>

<script>
import { account, accountUrl } from '@/config/app_config';

export default {
  data() {
    return {
      service_account: account,
    };
  },
  computed: {
    aspectRatio() {
      return 2586 / 1200;
    },
    v_card_img() {
      return require('@/assets/img_car.jpg');
    },
    url() {
      return accountUrl + this.service_account;
    },
  },
};
</script>
