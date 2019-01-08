<template>
<div class="container">
  <div class="row">
      <div class="col-sm">
        <stats_classified></stats_classified>
      </div>
  </div>
</div>
</template>

<script>
import bus from '@/utils/event';

import stats_classified from '@/components/stats/stats_classified.vue';

export default {
  components: {
    stats_classified,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
