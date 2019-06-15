<template>
    <div id="boughtShop">
        <ShopComponent></ShopComponent>
    </div>
</template>
<script>
import ShopComponent from '../ShopComponent.vue'

export default {
    name: "BoughtShop",
    data() {
        return {
           
        }
    },
    components: {
        ShopComponent
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