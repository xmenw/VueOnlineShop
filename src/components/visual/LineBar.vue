<template>
  <div id="lineBar">
    <div class="lineCont">
      <div id="barCharts"></div>
    </div>
  </div>
</template>
<script>
import { onMounted } from '@vue/composition-api'

var option = {
  // 标题
  title: {
    text: '服装销量统计',
    subtext: '柱状图',
    left: 'left'
  },
  // 工具箱
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {
        show: true
      },
      restore: {
        show: true
      },
      dataView: {
        show: true
      },
      dataZoom: {
        show: true
      },
      magicType: {
        type: ['line', 'bar']
      }
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  // 图例
  legend: {
    data: ['销量']
  },
  // x轴
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  // 数据
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20],
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值', symbol: 'arrow' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }]
      }
    }
  ]
}
export default {
  name: 'lineBar',
  setup(props, context) {
    onMounted(() => {
      let myChart = context.root.$echarts.init(
        document.getElementById('barCharts')
      )
      myChart.setOption(option)
    })
    return {}
  }
}
</script>
<style lang="scss" scoped>
#lineBar {
  width: 100%;
  height: 100%;
  .lineCont {
    display: flex;
    justify-content: center;
    #barCharts {
      width: 500px;
      height: 500px;
    }
  }
}
</style>
