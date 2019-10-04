<template>
    <div id="collectedShop">
        <shop-component :shops="shops" :path="path"></shop-component>
    </div>
</template>
<script>
import ShopComponent from '@/components/component/ShopComponent.vue'

export default {
    name: "CollectedShop",
    data() {
        return {
           shops: [],
           begin: 0,
           path: 'deleteCollectById'
        }
    },
    components: {   
        ShopComponent
    },
    created(){
        this.queryCollect()
        },
    methods: {
        queryCollect() {
            this.$axios.get(`/api/queryAllCollect`)
                .then((response) => {
                    console.log(response)
                    this.shops = response.data;
                    let { shops } = this;
                    for (var i = 0, len = shops.length; i < len; i++) {
                        shops[i].totalPrice = shops[i].num * shops[i].price;
                        shops[i].count = 1;
                        shops[i].selected = false;
                    }
                })
                .catch((error) => {
                    alert("获取数据失败！");
                    console.log(error);
                });
        }
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