<template>
  <div id="shopsData">
    <Calendar></Calendar>
    <div class="content">
      <china-map></china-map>
      <line-fold></line-fold>
      <line-bar></line-bar>
      <pie-chart></pie-chart>
    </div>
  </div>
</template>
<script>
import ChinaMap from '../visual/ChinaMap'
import LineFold from '../visual/LineFold'
import LineBar from '../visual/LineBar'
import PieChart from '../visual/PieChart'
import Calendar from '../visual/Calendar'
// import { onMounted, ref } from "@vue/composition-api";

export default {
  name: 'ShopsData',
  components: {
    ChinaMap,
    LineFold,
    LineBar,
    PieChart,
    Calendar
  },
  setup (props, context) {
    return {}
  }
}
</script>
<style lang="scss" scoped>
#shopsData {
  .content {
    display: grid;
    margin: 0 auto;
    grid-row-gap: 100px;
    grid-column-gap: 20px;
    grid-template-columns: 1fr 1fr;
    width: 1200px;
    height: 100%;
    margin-top: 30px;
    overflow: hidden;
  }
}
</style>
