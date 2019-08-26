<template>
    <div id="account">
      <shop-component :shops="shops"></shop-component>
    </div>
</template>
<script>
import ShopComponent from "./component/ShopComponent.vue";
export default {
    name: "Account",
    data() {
        return {
          shops: []
        }
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
          vm.queryAllAccount();
        });
    },
    methods: {
        queryAllAccount(){
          this.shops = [5];
        }
    },
    components: {
      ShopComponent
    }
}
</script>
<style lang="scss" scoped>
#account {
    
}
</style>