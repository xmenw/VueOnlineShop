<template>
    <div id="shopCar">
        <div class="shopcar">
            <div class="shopcar-bot">
                <div class="shopcar-bot2">
                    <div class="shopcar-bot2-right">
                        <ul class="shop-left">
                            <li>商品信息</li>
                        </ul>
                        <ul>
                            <li>操作</li>
                            <li>金额</li>
                            <li>数量</li>
                            <li>单价</li>
                        </ul>
                    </div>
                </div>
                <div class="shopcar-bot4" style="margin-bottom:20px;">
                    <shop-component :shops="shops"></shop-component>
                </div>
                <ul class="pagination">
                    <li>
                        <button @click="queryShopByPage(j - 2)" id="prev">&laquo;</button>
                    </li>
                    <li v-for="j in pageCount" :key="j">
                        <button :class="(j - 1)==begin?'active' : ''" @click="queryShopByPage(j - 1)">
                            {{j}}
                        </button>
                    </li>
                    <li>
                        <button @click="queryShopByPage(j)" id="next">&raquo;</button>
                    </li>
                </ul>
                <div class="shopcar-bot5">
                    <ul class="right">
                        <li class="bill">
                            <router-link :to="{name: 'Account'}">结算</router-link>
                        </li>
                        <li>合计（不含运费）<input type="text" class="nu" v-model="selectPrice"></input></li>
                        <li>已选商品<input type="text" class="nu" v-model="selectNum"></input> 件</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ShopComponent from "@/components/component/ShopComponent.vue";
export default {
    name: 'shopCar',
    data() {
        return {
            shops: [],
            pageCount: 0,
            index: 0,
            begin: 0,
            select: false, //全选
            selectPrice: 0.0,
            selectNum: 0
        }
    },
    components: {
      ShopComponent
    },
    created() {
        this.queryShopByPage(0);
        this.queryCount();
    },
    beforeRouteEnter: (to, from, next) => {
        if (!sessionStorage.getItem("user")) {
            let login = confirm("登录后，才能进入购物车。");
            if (login) {
                next("/login");
            }
        } else {
            next();
        }
    },
    computed: {
        selectShop() {
            this.shops.filter((item) => {
                return item.selected;
            });
            return this.shops;
        }
    },
    methods: {
        queryShopByPage(begin) {
            begin = begin >= 2 ? begin - 2 : begin;
            this.begin = begin;
            this.$axios.get(`/api/queryPage/${begin}`)
                .then((response) => {
                    this.shops = response.data;
                    let { shops } = this;
                    for (var i = 0, len = shops.length; i < len; i++) {
                        shops[i].totalPrice = shops[i].num * shops[i].price;
                        shops[i].count = shops[i].num;
                        shops[i].selected = false;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        queryCount() {
            this.$axios.get(`/api/queryCount`)
                .then((response) => {
                    this.pageCount = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteById(id) {
            this.$axios.get(`/api/deleteById/${id}`)
                .then(({ data }) => {
                    console.log(data);
                    if (data === 1) {
                        this.queryShopByPage(this.begin);
                        this.queryCount();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        selectAll() {
            let { shops, select } = this;
            for (var i = 0, len = shops.length; i < len; i++) {
                shops[i].selected = !select;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#shopCar {
    display: flex;
    justify-content: center;
    .pagination {
        text-align: right;
        margin-bottom: 30px;
    }

    .pagination>li {
        display: inline-block;
    }

    .pagination>li button.active {
        color: #fff;
        background: #66bb6a;
    }

    .pagination>li>button,
    .pagination>li>span {
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #337ab7;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
    }

    .pagination>li:first-child>a,
    .pagination>li:first-child>span {
        margin-left: 0;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .pagination>li:last-child>a,
    .pagination>li:last-child>span {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .pagination>li>a:hover,
    .pagination>li>span:hover,
    .pagination>li>a:focus,
    .pagination>li>span:focus {
        color: #23527c;
        background-color: #eee;
        border-color: #ddd;
    }

    .pagination>.active>a,
    .pagination>.active>span,
    .pagination>.active>a:hover,
    .pagination>.active>span:hover,
    .pagination>.active>a:focus,
    .pagination>.active>span:focus {
        z-index: 2;
        color: #fff;
        cursor: default;
        background-color: #337ab7;
        border-color: #337ab7;
    }

    .pagination>.disabled>span,
    .pagination>.disabled>span:hover,
    .pagination>.disabled>span:focus,
    .pagination>.disabled>a,
    .pagination>.disabled>a:hover,
    .pagination>.disabled>a:focus {
        color: #777;
        cursor: not-allowed;
        background-color: #fff;
        border-color: #ddd;
    }

    .shopcar .shopcar-bot .shopcar-bot1 .ul li {
        float: left;
        margin-right: 30px;
        line-height: 33px;
    }

    .shopcar .shopcar-bot .shopcar-bot1 .ul li span {
        color: red;
    }

    .shopcar .shopcar-bot .shopcar-bot1 .ul li:nth-child(2n) {
        color: #3c3c3c;
    }

    .shopcar .shopcar-bot .shopcar-bot1 .right li {
        float: right;
        font-size: 14px;
        line-height: 33px;
    }

    .shopcar .shopcar-bot .shopcar-bot1 .right li a {
        margin-left: 10px;
        background-color: #6ac1d4;
        padding: 3px 15px;
        margin-right: 10px;
        color: #000;
    }

    .shopcar .shopcar-bot .shopcar-bot1 .right li span {
        color: red;
    }

    .shopcar-bot2-left ul li {
        float: left;
        margin-right: 80px;
        line-height: 50px;
    }

    .shopcar-bot2-left::after, .shopcar-bot2-right::after{
        content: '';
        display: block;
        clear: both;
        overflow: hidden;
    }

    .shop-left {
        float: left;
    }

    .shopcar-bot2-right ul li {
        float: right;
        margin-right: 70px;
        line-height: 50px;
    }

    .shopcar-bot2-right ul li:nth-child(1) {
        margin-right: 0px;
    }

    .shopcar .shopcar-bot .shopcar-bot3 .shop ul li {
        line-height: 38px;
        height: 38px;
    }

    .shopcar .shopcar-bot .shopcar-bot3 .shop ul li a {
        font-size: 14px;
        color: #000;
    }

    .shopcar .shopcar-bot .shopcar-bot3 .shop ul li a:hover {
        color: #6ac1d4;
    }

    a {
        color: #000;
    }

    a:hover {
        color: #6ac1d4;
        text-decoration: underline;
    }

    .shopcar-bot5 {
        line-height: 50px;
        margin-bottom: 30px;
    }

    .shopcar-bot5 .right li {
        float: right;
        margin-right: 20px;
    }

    .shopcar-bot5 .right li a {
        display: inline-block;
        text-align: center;
        background-color: #64a1d6;
        width: 100px;
        height: 50px;
        line-height: 50px;
        &:hover {
            color: #ffffff;
        }
    }

    .shopcar-bot1 .ul .xian {
        font-size: 12px;
    }

    .shopcar-bot1 .ul li:nth-child(2n-1):hover {
        border-bottom: 2px solid #6ac1d4;
    }

    .shopcar-bot1 .ul li .cur:hover {
        cursor: not-allowed;
    }

    .shopcar-bot1 .ul li:nth-child(1) {
        border-bottom: 2px solid #6ac1d4;
    }

    .shopcar-bot1 .ul li:nth-child(2n-1) a {
        color: #000;
        font-weight: 600;
        text-decoration: none;
    }

    .shopcar-bot5 .right .bill {
        margin-right: 0px;
    }


    .nu {
        width: 50px;
        height: 20px;
        line-height: 20px;
        color: #f45;
        text-align: center;
        border: none;
        outline: none;
    }
}
</style>