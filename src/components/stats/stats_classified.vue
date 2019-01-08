<template>
<div class="chart-container">
  <div id="classifiedChart" style="height: 250px">图表加载失败</div>
</div>
</template>

<style>
.chart {
  background-color: white;
  border-radius: 4px;
}

.chart_left {
  border-right: #F2F2F2 10px solid;
}
</style>

<script>
import bus from '@/utils/event';
import {
  ON_NATION_CHANGE
} from '@/config/constants';
import {
  daysBefore
} from '@/utils/dt_tools';
import echarts from 'echarts';

export default {
  data() {
    return {
      dates: [],
      categories: [],
      datas: [],
      myChart: [],
    };
  },
  methods: {
    InitChartOption() {

      const self = this;

      // self.myChart.showLoading();

      const option = {
        title: {
          text: self.$t('message.ClassifiedChartTitle'),
          subtext: self.$t('message.ClassifiedChartSubtitle')
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [self.$t('message.ClassifiedChartNumber')]
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ['line', 'bar']
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: false
            },
          }
        },
        calculable: true,
        xAxis: [{
          type: 'value',
          boundaryGap: [0, 0.01]
        }],
        yAxis: [{
          type: 'category',
          data: self.categories,
        }],
        series: [{
          name: self.$t('message.ClassifiedChartNumber'),
          type: 'bar',
          data: self.datas,
        }]
      };

      if (self.myChart !== null) {
        self.myChart.setOption(option, true);
      }

      // self.myChart.hideLoading();

    },
    getUserChartInit() {
      const self = this;
      self.myChart = echarts.init(document.getElementById('classifiedChart'));

      self.InitChartOption();

      window.onresize = function() {
        self.myChart.resize();
      };
    },
  },
  mounted() {
    const self = this;
    const days = 13;
    let dt = daysBefore(days);
    self.categories = ['a', 'b', 'c'];
    self.datas = [100, 50, 200];

    self.$http.post('/aci_api/creditinquiry/classification').then((response) => {
      if (response.status === 200) {
        //self.datas = response.data.data.txs_count;
        this.getUserChartInit();
      }
    }, (error) => {
      console.log(error);
    });

    bus.$on(ON_NATION_CHANGE, (data) => {
      console.log('InitChartOption');
      self.InitChartOption();
    });
  },
};
</script>
