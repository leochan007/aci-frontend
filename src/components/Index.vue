<template>
<div class="container">
  <div class="row">
      <div class="col-sm">
        <eos_info></eos_info>
      </div>
      <div class="col-sm">
        <txs_history></txs_history>
      </div>
  </div>
  <div class="row mt-4">
      <div class="col-sm">
        <latest_ci></latest_ci>
      </div>
  </div>
</div>
</template>

<script>
import bus from '@/utils/event';

import txs_history from '@/components/index/txs_history.vue';
import eos_info from '@/components/index/eos_info.vue';
import latest_ci from '@/components/index/latest_ci.vue';

export default {
  components: {
    txs_history,
    latest_ci,
    eos_info,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
