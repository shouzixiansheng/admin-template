<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    xData: {
      type: Array,
      default: () => []
    },
    yData: {
      type: Object,
      default: () => { return { success: [], failure: [], total: [] } }
    },
    successTotal: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    xData() {
      this.initChart()
    },
    yData() {
      this.initChart()
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        backgroundColor: '#fff',
        title: {
          text: `调用次数：${this.total.toLocaleString()}，调用成功次数：${this.successTotal.toLocaleString()}，调用成功率：${Math.round(this.successTotal / (this.total + 0.000000001) * 10000) / 100}%`,
          subtext: ``,
          x: '20',
          top: '20',
          textStyle: {
            color: '#0A0F1D',
            fontSize: '18'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '14'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params, ticket, callback) => {
            var relVal = params[0].name
            let l = params.length
            for (var i = 0; i < l; i++) {
              if (params[i].seriesName === '成功') {
                relVal += '<br/><span style="display:inline-block;background:#FFCF98;border-radius:50%;width:10px;height:10px;line-height:20px; margin-right:5px"></span>' + params[i].seriesName + ' : ' + params[i].value
              } else if (params[i].seriesName === '失败') {
                relVal += '<br/><span style="display:inline-block;background:#f56c6c;border-radius:50%;width:10px;height:10px;line-height:20px; margin-right:5px"></span>' + params[i].seriesName + ' : ' + params[i].value
              } else if (params[i].seriesName === '日调用次数') {
                relVal += '<br/><span style="display:inline-block;background:#FFCF98;border-radius:50%;width:10px;height:10px;line-height:20px; margin-right:5px"></span>' + params[i].seriesName + ' : ' + params[i].value
              }
            }
            if (i === 3) {
              relVal += '<br/>' + '<span style="display:inline-block;background:#E6A23C;border-radius:50%;width:10px;height:10px;line-height:20px; margin-right:5px"></span>成功率:' + Math.round((params[0].value / params[l - 1].value).toFixed(4) * 10000) / 100 + '%'
            }
            return relVal
          },
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 120,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '13%',
          textStyle: {
            color: '#90979c'
          },
          data: ['成功', '失败', '日调用次数']
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 'auto'

          },
          data: this.xData
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: false,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 0,
          end: 100,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff'
          },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: '成功',
          type: 'bar',
          stack: 'total',
          barMaxWidth: 25,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: '#FFCF98',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: this.yData.success
        },

        {
          name: '失败',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              color: '#f56c6c',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: this.yData.failure
        }, {
          name: '日调用次数',
          type: 'line',
          stack: 'total',
          symbolSize: 7,
          // symbol: 'circle',
          itemStyle: {
            normal: {
              color: '#FFCF98',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: this.yData.total
        }
        ]
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
