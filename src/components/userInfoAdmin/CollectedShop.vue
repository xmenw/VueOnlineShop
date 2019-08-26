<template>
    <div id="collectedShop">
        <shop-component :shops="shops"></shop-component>
    </div>
</template>
<script>
import ShopComponent from '@/components/component/ShopComponent.vue'

export default {
    name: "CollectedShop",
    data() {
        return {
           shops: [1]
        }
    },
    components: {
        ShopComponent
    }
}
</script>
<style lang="scss" scoped>
#collectedShop {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    
}
</style>