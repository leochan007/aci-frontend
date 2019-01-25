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
  import {
    generateColor
  } from '@/utils/color_tools';
  import echarts from 'echarts';
  
  export default {
    data() {
      return {
        categories: [],
        datas: [],
        myChart: null,
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
            data: [self.$t('message.ClassifiedChartNumber')],
            show: false,
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
            boundaryGap: [0, 0.01],
            minInterval: 1,
          }],
          yAxis: [{
            type: 'category',
            data: self.categories,
          }],
          series: [{
            name: self.$t('message.ClassifiedChartNumber'),
            type: 'bar',
            data: self.datas,
            itemStyle: {
                //通常情况下：
                normal:{
                    color: function (params) {
                        var colorList = generateColor('#fe0101','#dafa04', self.datas.length);
                        return colorList[params.dataIndex];
                    }
                },
                //鼠标悬停时：
                emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
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
  
      self.$http.get('/aci_api/creditinquiry/classification').then(
        (response) => {
          if (response.status === 200) {
            self.datas = [];
            self.categories = [];
            const txs_count = response.data.data.txs_count;
            for (let i = 0; i < txs_count.length; i++) {
              self.categories.push(txs_count[i]['_id']);
              self.datas.push(txs_count[i]['count']);
            }
            self.getUserChartInit();
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
