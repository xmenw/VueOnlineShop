<template>
    <div id="account">
      <shop-component :shops="shops" :path="path"></shop-component>
      <button @click="settle" v-show="shops.length">结账</button>
    </div>
</template>
<script>
import ShopComponent from "./component/ShopComponent.vue";
export default {
    name: "Account",
    data() {
        return {
          shops: [],
          path: ''
        }
    },
    created(){
      this.shops = JSON.parse( this.$store.state.buyShops );
      console.log(this.shops)
    },
    methods: {
        async settle(){
          let deleteArr = []
          this.shops.forEach((shop)=>{
            deleteArr.push(this.$axios.get(`/api/deleteById/${shop._id}`))
          })
          if(!deleteArr.length){
            return
          }
          await Promise.all(deleteArr)
            .then((res)=>{
              this.shops.forEach((shop)=>{
                this.$axios(`/api/addShopsSales?id=${shop.id}&&num=${shop.count}`)
                .then((res)=>{
                  console.log(res)
                })
                .catch((err)=>{
                  console.log(err)
                })
              })
              this.shops.forEach((shop)=>{
                this.$axios(`/api/updateNum?id=${shop.id}&&num=${shop.count}`)
                .then((res)=>{
                  console.log(res)
                })
                .catch((err)=>{
                  console.log(err)
                })
              })
            })
            .catch((err)=>{
              alert('获取数据失败');
              console.log(err)
            })
          let shops = localStorage.getItem('buy_shops');
          shops = JSON.parse(shops);
          if(!shops){
            shops = []
          }
          shops.push(...this.shops);
          localStorage.setItem('buy_shops', JSON.stringify(shops));
          alert('购买成功!');
          this.shops = []
          this.$router.replace('/infomanage/boughtShop')
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
      background-color: cadetblue;
      border-radius: 20px;
    }
}
</style>