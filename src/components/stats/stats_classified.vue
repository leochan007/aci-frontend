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
  border-right: #f2f2f2 10px solid;
}
</style>

<script>
import bus from "@/utils/event";
import { ON_NATION_CHANGE } from "@/config/constants";
import { daysBefore } from "@/utils/dt_tools";
import { generateColor } from "@/utils/color_tools";
import echarts from "echarts";

import voca from "voca";

export default {
  data() {
    return {
      categories: [],
      datas: [],
      myChart: null,
      colorList: null
    };
  },
  methods: {
    InitChartOption() {
      const self = this;

      // self.myChart.showLoading();

      const option = {
        title: {
          text: self.$t("message.ClassifiedChartTitle"),
          subtext: self.$t("message.ClassifiedChartSubtitle"),
          textStyle: {
            verticalAlign: "top"
          },
          show: true,
          padding: 5
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [self.$t("message.ClassifiedChartNumber")],
          show: false
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: false
            },
            dataView: {
              show: false,
              readOnly: false
            },
            magicType: {
              show: false,
              type: ["line", "bar"]
            },
            restore: {
              show: false
            },
            saveAsImage: {
              show: false
            }
          }
        },
        calculable: true,
        grid: {
          containLabel: true,
        },
        xAxis: [
          {
            type: "value",
            boundaryGap: [0, 0.01],
            minInterval: 1
          }
        ],
        yAxis: [
          {
            type: "category",
            data: self.categories
          }
        ],
        series: [
          {
            name: self.$t("message.ClassifiedChartNumber"),
            type: "bar",
            data: self.datas,
            itemStyle: {
              normal: {
                color: function(params) {
                  if (!voca.isBlank(self.colorList)) {
                    return self.colorList[params.dataIndex];
                  }
                  return "black";
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      if (self.myChart !== null) {
        self.myChart.setOption(option, true);
      }

      // self.myChart.hideLoading();
    },
    getUserChartInit() {
      const self = this;

      self.InitChartOption();

      window.onresize = function() {
        self.myChart.resize();
      };
    }
  },
  mounted() {
    const self = this;
    self.myChart = echarts.init(document.getElementById("classifiedChart"));

    self.$http.get("/aci_api/creditinquiry/classification").then(
      response => {
        if (response.status === 200) {
          self.datas = [];
          self.categories = [];
          const txs_count = response.data.data.txs_count;
          for (let i = 0; i < txs_count.length; i++) {
            self.categories.push(txs_count[i]["_id"]);
            self.datas.push(txs_count[i]["count"]);
          }

          self.colorList = generateColor(
            "#fe0101",
            "#dafa04",
            self.datas.length
          );

          console.log("self.datas.length=", self.datas.length);
          console.log(self.colorList);

          self.getUserChartInit();
        }
      },
      error => {
        console.log(error);
      }
    );

    bus.$on(ON_NATION_CHANGE, data => {
      console.log("InitChartOption");
      self.InitChartOption();
    });
  }
};
</script>
