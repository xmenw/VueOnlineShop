<template>
  <div id="boughtShop">
    <shop-component :shops="shops"
                    :path="path"></shop-component>
  </div>
</template>
<script>
import ShopComponent from '@/components/component/ShopComponent.vue'
import { mapState } from 'vuex'
export default {
  name: "BoughtShop",
  data () {
    return {
      shops: [],
      path: 'deleteBoughtById'
    }
  },
  components: {
    ShopComponent
  },
  created () {
    this.$axios.get(`../api/queryAllBuy?username=${this.user.name}`)
      .then((res) => {
        this.shops = res.data
        let { shops } = this;
        for (var i = 0, len = shops.length; i < len; i++) {
          console.log(shops[i])
          shops[i].totalPrice = shops[i].buy_num * shops[i].price;
          shops[i].count = shops[i].buy_num;
          shops[i].selected = false;
        }
      }).catch((err) => {
        alert('获取数据失败');
        console.log(err)
      })
  },
  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>
<style lang="scss" scoped>
#boughtShop {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
</style>