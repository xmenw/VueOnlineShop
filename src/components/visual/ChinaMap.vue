<template>
  <div id="chinaMap">
    <div class="mapCont">
      <div id="echarts"></div>
    </div>
  </div>
</template>
<script>
import { onMounted } from '@vue/composition-api'
import '../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据

function getDates (ctx) {
  return new Promise((resolve, reject) => {
    ctx.root.$axios.post(`/api/queryUsersInfo`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        reject([])
      })
  })
}
var option = {
  title: {
    text: '本网站注册用护地区分布图',
    x: 'center'
  },
  tooltip: {
    show: true,
    formatter: function (params) {
      return params.name + '：' + params.value
    },
  },
  visualMap: {
    min: 0,
    max: 50,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'],
    inRange: {
      color: ['#fff', '#f00']
    },
    show: true
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {
        show: true
      }
    }
  },
  geo: {
    map: 'china',
    roam: false,
    zoom: 1.23,
    label: {
      normal: {
        show: true,
        fontSize: '10',
        color: 'rgba(0,0,0,0.7)'
      }
    },
    itemStyle: {
      normal: {
        borderColor: 'rgba(0, 0, 0, 0.2)'
      },
      emphasis: {
        areaColor: '#F3B329',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 2,
        borderWidth: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  },
  series: [
    {
      name: '用户数量',
      type: 'map',
      geoIndex: 0
    }
  ]
}
let userInfos = []
export default {
  name: 'ChinaMap',
  setup (props, ctx) {
    onMounted(async () => {
      let myChart = ctx.root.$echarts.init(
        document.getElementById('echarts')
      )
      let datas = {}
      try {
        const reg = /.+?(省|自治区)|北京|天津|上海|重庆/g;
        let data = await getDates(ctx)
        data.forEach(user => {
          let prvinces = user.local.match(reg);
          if (!prvinces) {
            return
          }
          prvinces = prvinces[0].replace(/(省|自治区|壮族|维吾尔)/g, '')
          if (datas[prvinces]) {
            datas[prvinces]++
          } else {
            datas[prvinces] = 1
          }
        });
        Object.entries(datas).forEach((data) => {
          userInfos.push({ name: data[0], value: data[1] })
        })
      } catch (error) {
        console.log(error)
        userInfos = []
      }
      option.series[0].data = userInfos
      myChart.setOption(option)
    })
    return {}
  }
}
</script>
<style lang="scss" scoped>
#chinaMap {
  width: 100%;
  height: 100%;
  .mapCont {
    display: flex;
    justify-content: center;
    #echarts {
      width: 500px;
      height: 500px;
    }
  }
}
</style>
