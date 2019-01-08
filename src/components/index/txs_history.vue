<template>
  <div class="chart-container">
    <div id="userChart" style="height: 250px" >图表加载失败</div>
  </div>
</template>

<style>

.chart {
  background-color: white;
  border-radius: 4px;
}

.chart_left {
  border-right:#F2F2F2 10px solid;
}

</style>

<script>
  import bus from '@/utils/event';
  import { ON_NATION_CHANGE } from '@/config/constants';
  import { daysBefore } from '@/utils/dt_tools';
  import echarts from 'echarts';

  export default {
    data() {
      return {
        dates: null,
        datas: null,
        myChart: null,
      };
    },
    methods: {
      InitChartOption() {

        const self = this;

        // self.myChart.showLoading();

        const option = {
          title: {
            text: self.$t('message.Transactions'),
            textStyle: {
              verticalAlign: 'top',
            },
            show: true,
            padding: 5,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              },
            },
          },
          legend: {
            data: [self.$t('message.TxsPerDay')],
            type: 'plain',
            show: false,
          },
          toolbox: {
            feature: {
              saveAsImage : {show: false},
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: this.dates,
            },
          ],
          yAxis: [
            {
              type: 'value',
              minInterval : 1,
              boundaryGap : [ 0, 0.1 ],
            },
          ],
          animation: false,
          series: [
            {
              name: self.$t('message.TxsPerDay'),
              type: 'line',
              stack: 'Total',
              areaStyle: {normal: {}},
              data: self.datas,
            },
          ],
        };

        if (self.myChart !== null) {
          self.myChart.setOption(option, true);
        }

        // self.myChart.hideLoading();

      },
      getUserChartInit() {
        const self = this;
        self.myChart = echarts.init(document.getElementById('userChart'));

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
      self.dates = [];
      self.datas = [];
      const dates = [];
      for (let i = 0; i <= days; i++) {
        self.dates.push(dt.format('MMM/Do'));
        dates.push(dt.format('YYYY-MM-DD'));
        dt = dt.add(1, 'days');
      }

      self.$http.post('/aci_api/creditinquiry/tx_count_lst', dates).then((response) => {
          if (response.status === 200) {
            self.datas = response.data.data.txs_count;
            this.getUserChartInit();
          }
　　　　}, (error) => {
　　　　　　// console.log(error);
　　　　});

      bus.$on(ON_NATION_CHANGE, (data) => {
        self.InitChartOption();
      });
    },
  };
</script>
