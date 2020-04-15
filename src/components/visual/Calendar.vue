<template>
  <div id="calendar">
    <div class="calendarCont">
      <div id="calendars"></div>
    </div>
  </div>
</template>
<script>
import { onMounted } from '@vue/composition-api'
const todayYear = new Date().getFullYear();
function getDates (ctx) {
  return new Promise((resolve, reject) => {
    ctx.root.$axios.post(`/api/queryVisitNums`)
      .then((res) => {
        console.log(res)
        resolve(res.data)
      })
      .catch((err) => {
        reject([])
      })
  })
}
const option = {
  title: {
    top: 30,
    left: 'center',
    text: `${todayYear}年商城每天访问次数`
  },
  tooltip: {
    trigger: 'item',
    formatter (params) {
      return `日期：${params.data[0].slice(5)}</br>人数：${params.data[1]}`
    }
  },
  visualMap: {
    min: 0,
    max: 10000,
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    top: 65,
    textStyle: {
      color: '#000'
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {
        show: true
      }
    }
  },
  calendar: {
    top: 120,
    left: 30,
    right: 30,
    cellSize: ['auto', 13],
    range: todayYear,
    itemStyle: {
      borderWidth: 0.5
    },
    yearLabel: { show: false }
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar'
  }
};
export default {
  name: 'calendar',
  setup (props, ctx) {
    onMounted(async () => {
      let myChart = ctx.root.$echarts.init(
        document.getElementById('calendars')
      )
      let dates = []
      try {
        let data = await getDates(ctx)
        console.log(data)
        Object.values(data).forEach((data) => {
          dates.push([data.date, data.nums])
        })
      } catch (error) {
        dates = []
      }
      console.log(dates)
      option.series.data = dates
      myChart.setOption(option)
    })
    return {}
  }
}
</script>
<style lang="scss" scoped>
#calendar {
  width: 100%;
  height: 100%;
  .calendarCont {
    display: flex;
    justify-content: center;
    #calendars {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
