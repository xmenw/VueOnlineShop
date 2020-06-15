<template>
  <div id="account">
    <shop-component :shops="parseBuyShops"
                    :path="path"></shop-component>
    <a-button @click="settle"
              v-show="parseBuyShops.length"
              type="primary"
              :loading="isClicked"
              :disabled="isClicked">结账</a-button>
  </div>
</template>
<script>
import ShopComponent from "./component/ShopComponent.vue";
import { message } from 'ant-design-vue';
import { mapGetters } from 'vuex'

export default {
  name: "Account",
  data () {
    return {
      path: 'deleteVuexShops',
      isClicked: false
    }
  },
  methods: {
    async settle () {
      let deleteArr = []
      this.isClicked = true
      this.parseBuyShops.forEach((shop) => {
        deleteArr.push(this.$axios.get(`/api/deleteById/${shop._id}`))
      })
      if (!deleteArr.length) {
        return
      }
      await Promise.all(deleteArr)
        .then((res) => {
          this.parseBuyShops.forEach((shop) => {
            this.$axios(`/api/addShopsSales?id=${shop.id}&&num=${shop.count}`)
              .then((res) => {
                console.log(res)
              })
              .catch((err) => {
                console.log(err)
              })
          })
          this.parseBuyShops.forEach((shop) => {
            this.$axios(`/api/updateNum?id=${shop.id}&&num=${shop.count}`)
              .then((res) => {
                console.log(res)
              })
              .catch((err) => {
                console.log(err)
              })
          })
        })
        .catch((err) => {
          message.error('获取数据失败');
          console.log(err)
        })
      let shops = localStorage.getItem('buy_shops');
      shops = JSON.parse(shops);
      if (!shops) {
        shops = []
      }
      shops.push(...this.parseBuyShops);
      let axiosArr = []
      shops.forEach(({ id, username, count }) => {
        let param = new URLSearchParams();
        param.append("id", id);
        param.append("shop_id", id);
        param.append("username", username);
        param.append("buy_num", count);
        axiosArr.push(this.$axios.post(`../api/insertBuy`, param))
      })
      Promise.all(axiosArr)
        .then((res) => {
          console.log(res);
          console.log('购买成功');
          localStorage.setItem('buy_shops', JSON.stringify(shops));
          message.success('购买成功!');
          this.shops = []
          this.$router.replace('/infomanage/boughtShop')
        }).catch((err) => {
          message.error('获取数据失败');
          console.log(err);
        }).finally(() => {
          this.isClicked = false
        })
    }
  },
  computed: {
    ...mapGetters(['getBuyShops']),
    parseBuyShops () {
      try {
        return JSON.parse(this.getBuyShops)
      } catch (error) {
        return []
      }
    }
  },
  components: {
    ShopComponent
  }
}
</script>
<style lang="scss" scoped>
#account {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  button {
    width: 300px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    outline: none;
    border: none;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    border-radius: 20px;
  }
  button[disabled="disabled"] {
    cursor: not-allowed;
    color: #e3e3e3;
  }
}
</style>