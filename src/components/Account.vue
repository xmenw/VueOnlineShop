<template>
    <div id="account">
      <shop-component :shops="shops" :path="path"></shop-component>
      <button @click="settle">结账</button>
    </div>
</template>
<script>
import ShopComponent from "./component/ShopComponent.vue";
import { Promise } from 'q';
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
    },
    methods: {
        async settle(){
          let deleteArr = []
          alert('购买成功!');
          this.shops.forEach((shop)=>{
            deleteArr.push(this.$axios.get(`/api/deleteById/${shop._id}`))
          })
          await Promise.all(deleteArr)
            .then((res)=>{
              console.log(res)
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
      background-color: cadetblue;
      border-radius: 20px;
    }
}
</style>