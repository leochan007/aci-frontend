<template>
<div class="container">
  <div class="row">
      <div class="col-sm">
        <txs_history></txs_history>
      </div>
  </div>
  <div class="row mt-4">
      <div class="col-sm">
        <latest_aci></latest_aci>
      </div>
  </div>
</div>
</template>

<script>
import bus from '@/utils/event';

import txs_history from '@/components/index/txs_history.vue';
import latest_aci from '@/components/index/latest_aci.vue';

export default {
  components: {
    txs_history,
    latest_aci,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
