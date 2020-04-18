<template>
  <div id="lineBar">
    <div class="lineCont">
      <div>
        请选择要查看的用户
        <a-select style="width: 120px"
                  @change="handleChange">
          <a-select-option v-for="name in names"
                           :value="name"
                           :key="name">{{name}}</a-select-option>
        </a-select>
      </div>
      <div id="barCharts"></div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive } from '@vue/composition-api'

function getNameNum (ctx, user) {
  return new Promise((resolve, reject) => {
    ctx.root.$axios.post(`/api/queryShopsNameNums?username=${user}`)
      .then((res) => {
        console.log(res)
        resolve(res.data)
      })
      .catch((err) => {
        reject([])
        console.log(err)
      })
  })
}
function getUsersName (ctx) {
  return new Promise((resolve, reject) => {
    ctx.root.$axios.post(`/api/selectUsersName`)
      .then((res) => {
        console.log(res)
        resolve(res.data)
      })
      .catch((err) => {
        reject([])
        console.log(err)
      })
  })
}
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
  setup (props, context) {
    const names = reactive([])
    // const name = reactive('')
    let dates = []
    let types = []
    let myChart = null
    async function handleChange (value) {
      types = []
      dates = []
      try {
        let data = await getNameNum(context, value)
        Object.values(data).forEach((data) => {
          types.push(data.id)
          dates.push(data.sales)
        })
      } catch (error) {
        dates = []
        console.log(error)
      }
      option.series[0].data = dates
      option.xAxis.data = types
      myChart.setOption(option)
      // this.name = value
    }
    onMounted(async () => {
      myChart = context.root.$echarts.init(
        document.getElementById('barCharts')
      )
      try {
        let data = await getUsersName(context)
        names.push(...data)
      } catch (error) {
        dates = []
        console.log(error)
      }
      try {
        let data = await getNameNum(context, name)
        Object.values(data).forEach((data) => {
          types.push(data.id)
          dates.push(data.sales)
        })
      } catch (error) {
        dates = []
        console.log(error)
      }
      option.series[0].data = dates
      option.xAxis.data = types
      myChart.setOption(option)
    })
    return {
      handleChange,
      names,
      // name
    }
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
    flex-direction: column;
    #barCharts {
      width: 500px;
      height: 500px;
    }
  }
}
</style>
