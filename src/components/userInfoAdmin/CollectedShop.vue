<template>
    <div id="collectedShop">
        <ShopComponent></ShopComponent>
    </div>
</template>
<script>
import ShopComponent from '../ShopComponent.vue'

export default {
    name: "CollectedShop",
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
#collectedShop {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    
}
</style>