<template>
    <div id="boughtShop">
        <shop-component :shops="shops"></shop-component>
    </div>
</template>
<script>
import ShopComponent from '@/components/component/ShopComponent.vue'

export default {
    name: "BoughtShop",
    data() {
        return {
           shops: [1]
        }
    },
    components: {
        ShopComponent
    },
    created(){
        console.log(this.$store);
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