<template>
  <div id="lineFold">
    <div class="lineCont">
      <div id="lineCharts"></div>
    </div>
  </div>
</template>
<script>
import { onMounted } from '@vue/composition-api'

var option = {
  //标题
  title: {
    text: '服装销量统计'
  },
  //工具箱
  //保存图片
  toolbox: {
    show: true,
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
  //图例-每一条数据的名字叫销量
  legend: {
    data: ['销量']
  },
  //x轴
  xAxis: {
    data: ['苹果', '橘子', '橙子', '香蕉', '菠萝', '榴莲']
  },
  //y轴没有显式设置，根据值自动生成y轴
  yAxis: {},
  //数据-data是最终要显示的数据
  series: [
    {
      name: '销量',
      type: 'line',
      data: [40, 20, 35, 60, 55, 10]
    }
  ]
}
export default {
  name: 'lineFold',
  setup(props, context) {
    onMounted(() => {
      let myChart = context.root.$echarts.init(
        document.getElementById('lineCharts')
      )
      myChart.setOption(option)
    })
    return {}
  }
}
</script>
<style lang="scss" scoped>
#lineFold {
  width: 100%;
  height: 100%;
  .lineCont {
    display: flex;
    justify-content: center;
    #lineCharts {
      width: 500px;
      height: 500px;
    }
  }
}
</style>
