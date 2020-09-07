<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
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
    },
    title: {
      type: String,
      default: '调用次数'
    },
    modelDes: {
      type: String,
      default: ''
    },
    pieData: {
      type: Object,
      default: () => { }
    },
    nonce: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    'nonce'() {
      this.initChart()
    }
  },
  computed: {
    id() {
      return `echarts` + Math.random() * 9999
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
      let des = ''
      if (this.modelDes) {
        des = this.modelDes.slice(0, this.modelDes.length - 2)
      } else {
        des = this.pieData.passScore
      }
      this.chart = echarts.init(this.$el)
      this.chart.setOption({
        backgroundColor: '#fff',
        title: {
          text: `模型分通过率 ${Math.round(this.pieData.passCount / (this.pieData.total + 0.0000000001) * 10000) / 100}%`,
          subtext: `通过分：${des}`,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#FFCF98', '#f56c6c'],
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['通过', '不通过']
        },
        series: [
          {
            name: '通过率',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: this.pieData.passCount, name: '通过' },
              { value: this.pieData.total - this.pieData.passCount, name: '不通过' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
<style lang="less" scoped>
.border {
  display: inline-block;
  background: #FFCF98;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  line-height: 20px;
  margin-right: 5px;
}
</style>
