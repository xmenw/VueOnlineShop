<template>
    <div id="shopCar">
        <div class="shopcar">
            <div class="shopcar-bot">
                <div class="shopcar-bot1">
                    <ul class="ul">
                        <li><a href="#">全部商品</a><span id="quanbu"></span></li>
                        <li class="xian">|</li>
                        <li><a href="#" class="cur">降价商品</a><span>0</span></li>
                        <li class="xian">|</li>
                        <li><a href="#" class="cur">库存紧张</a><span>0</span></li>
                    </ul>
                    <ul class="right">
                        <li><a href="#">结算</a></li>
                        <li>所有商品（不含运费）
                            <span id="money"></span></li>
                    </ul>
                </div>
                <div class="shopcar-bot2">
                    <div class="shopcar-bot2-left">
                        <ul>
                            <li>
                                <input type="checkbox" name="check" class="all" v-model="select" @click="selectAll"> 全选
                            </li>
                            <li>商品信息</li>
                        </ul>
                    </div>
                    <div class="shopcar-bot2-right">
                        <ul>
                            <li>操作</li>
                            <li>金额</li>
                            <li>数量</li>
                            <li>单价</li>
                        </ul>
                    </div>
                </div>
                <div class="shopcar-bot3">
                    <div class="shop">
                        <ul>
                            <li>
                                <input class="input" type="checkbox" name="check" value="all"> 店铺：<a href="#">粉色少女风
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="shopcar-bot4" style="margin-bottom:20px;" v-for="(shop, i) in shops" :key="i">
                    <ul class="left">
                        <li>
                            <div class="shop1">
                                <input class="input" type="checkbox" name="checkbox" v-model="shop.selected">
                            </div>
                        </li>
                        <li>
                            <router-link :to="'shopdetail/' + shop.id">
                                <div class="shop2">
                                    <img :src="shop.pic" style="margin-right:10px;">
                                    <span class="shopDesc">{{shop.desc}}</span>
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <div class="shop3">
                                <p>颜色：{{shop.color}}</p>
                                <p>尺码：{{shop.size}}</p>
                            </div>
                        </li>
                    </ul>
                    <ul class="right">
                        <li>
                            <div class="shop7">
                                <ul class="ul">
                                    <li><a href="#">移入收藏夹</a></li>
                                    <br>
                                    <li>
                                        <button @click="deleteById(shop._id)">
                                            删除
                                        </button>
                                    </li>
                                    <ul class="hid">
                                        <li><a href="#">相似宝贝</a></li>
                                    </ul>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <div class="shop6">
                                <p>金额：
                                    <span class="allPrice">
                                        ￥{{shop.totalPrice}}
                                    </span>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div class="shop5">
                                <span class="dis" @click="shop.count <= 1 ? 1 : shop.count --">-</span>
                                <input type="text" name="num" style="text-align: center;" v-model="shop.count">
                                <span class="add" @click="shop.count >= shop.num ? shop.num : shop.count ++">+</span>
                            </div>
                        </li>
                        <li>
                            <div class="shop4">
                                <p>￥{{shop.price}}</p>
                            </div>
                        </li>
                    </ul>
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
                    <ul class="left" style="margin-left:30px;">
                        <li>
                            <input class="all" type="checkbox" name="check" v-model="select" @click="selectAll"> 全选
                        </li>
                        <li><a>删除</a></li>
                        <li><a href="#">移入收藏夹</a></li>
                        <li><a href="#">分享</a></li>
                    </ul>
                    <ul class="right">
                        <li class="bill"><a href="#" class="bc">结算</a></li>
                        <li>合计（不含运费）<input type="text" class="nu" v-model="selectPrice"></input></li>
                        <li>已选商品<input type="text" class="nu" v-model="selectNum"></input> 件</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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
    created() {
        this.queryShopByPage(0);
        this.queryCount();
    },
    beforeRouteEnter: (to,from,next)=>{
        if(!sessionStorage.getItem("user")){
            let login = confirm("登录后，才能进入购物车。");
            if(login){
                next("/login");
            }
        }else {
            next();
        }
    },
    computed: {
        selectShop(){
            this.shops.filter((item)=>{
                return item.selected;
            });
            return this.shops;  
        }
    },
    watch: {
        shops: {
            handler(val){
                console.log(val[0], val[0].selected);
            },
            deep: true
        }
    },
    methods: {
        queryShopByPage(begin) {
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
    .shopcar {
        width: 990px;
        height: 953px;
        margin: 0 auto;
    }

    .shopcar .shopcar-top {
        width: 990px;
        height: 95px;
    }

    .shopcar .shopcar-top .shopcar-top-left {
        display: inline-block;
    }

    .shopcar .shopcar-top .shopcar-top-left img {
        width: 150px;
        height: 60px;
        vertical-align: -15px;
    }

    .shopcar .shopcar-top .shopcar-top-left span {
        font-size: 20px;
        font-weight: 600;
    }

    .shopcar .shopcar-top .shopcar-top-right {
        display: inline-block;
        position: relative;
        float: right;
        height: 30px;
        margin-top: 10px;
        line-height: 30px;
    }

    .shopcar .shopcar-top .shopcar-top-right .inputh input {
        display: inline-block;
        width: 400px;
        height: 30px;
        text-indent: 0.5em;
        outline: none;
        margin-right: 80px;
        border: 2px solid #6ac1d4;
    }

    .shopcar .shopcar-top .shopcar-top-right .button button {
        position: absolute;
        top: 0px;
        right: 20px;
        width: 60px;
        height: 34px;
        border: none;
        outline: none;
        background-color: #6ac1d4;
    }

    .shopcar .shopcar-bot {
        width: 990px;
        height: 400px;
    }

    .shopcar .shopcar-bot .shopcar-bot1 {
        width: 990px;
        height: 33px;
        padding-bottom: 5px;
        border-bottom: 2px solid #f3f3f3;
    }

    .dis, .add {
        font-size: 18px;
        cursor: pointer;
        margin: 0 5px;
        color: #165;
    }

    .shopcar .shopcar-bot .shopcar-bot2 {
        width: 990px;
        height: 50px;
        font-size: 14px;
    }

    .shopcar .shopcar-bot .shopcar-bot3 {
        width: 990px;
        height: 38px;
    }

    .shopcar .shopcar-bot .shopcar-bot4 {
        width: 960px;
        height: 100px;
        padding: 15px;
        background-color: #f3f3f3;
        border: 1px solid #6ac1d4;
    }

    .shopcar .shopcar-bot .shopcar-bot5 {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50px;
        font-size: 14px;
        line-height: 50px;
        border: 1px solid #6ac1d4;
        background-color: #f3f3f3;
    }

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

    .shopcar .shopcar-bot .shopcar-bot2 .shopcar-bot2-left ul li {
        float: left;
        margin-right: 80px;
        line-height: 50px;
    }

    .shopcar .shopcar-bot .shopcar-bot2 .shopcar-bot2-right ul li {
        float: right;
        margin-right: 70px;
        line-height: 50px;
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

    .shopcar .shopcar-bot .shopcar-bot4 .shop2 {
        width: 302px;
        height: 130px;
    }

    .shop2 .shopDesc {
        color: #333;
        font-size: 14px;
        &:hover {
            text-decoration: underline;
        }
    }
    
    .shopcar .shopcar-bot .shopcar-bot4 ul li {
        float: left;
        line-height: s30px;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .shop2 img {
        width: 80px;
        height: 80px;
        float: left;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .shop2 span {
        display: inline-block;
        width: 186px;
        height: 36px;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .shop2 span a {
        color: #000;
        font-size: 14px;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .shop2 span a:hover {
        color: #6ac1d4;
        text-decoration: underline;
    }

    span {
        color: #f00;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .shop3 p {
        font-size: 14px;
        color: #9c9c9c;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .shop4 p {
        font-size: 14px;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .shop4 .unde {
        color: #9c9c9c;
        text-decoration: line-through;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .shop5 a {
        background-color: #f3f3f3;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .shop5 input {
        width: 25px;
    }

    a {
        color: #000;
    }

    a:hover {
        color: #6ac1d4;
        text-decoration: underline;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .shop7 {
        font-size: 14px;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .left li {
        float: left;
        margin-right: 10px;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .right li {
        float: right;
        margin-right: 25px;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .shop7 .hid {
        display: none;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .shop7 .ul li {
        margin-right: 0px;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .shop7 .ul li a {
        display: inline-block;
        width: 70px;
        margin-right: 0px;
        text-align: left;
    }

    .shopcar .shopcar-bot .shopcar-bot4 .shop7:hover .hid {
        display: block;
    }

    .shopcar .shopcar-bot .shopcar-bot5 .left li {
        float: left;
        margin-right: 20px;
    }

    .shopcar .shopcar-bot .shopcar-bot5 .right li {
        float: right;
        margin-right: 20px;
    }

    .shopcar .shopcar-bot .shopcar-bot5 .right li a {
        display: inline-block;
        text-align: center;
        background-color: #9c9c9c;
        width: 100px;
        height: 50px;
    }

    .shopcar-bot .shopcar-bot1 .ul .xian {
        font-size: 12px;
    }

    .shopcar-bot .shopcar-bot1 .ul li:nth-child(2n-1):hover {
        border-bottom: 2px solid #6ac1d4;
    }

    .shopcar-bot .shopcar-bot1 .ul li .cur:hover {
        cursor: not-allowed;
    }

    .shopcar-bot .shopcar-bot1 .ul li:nth-child(1) {
        border-bottom: 2px solid #6ac1d4;
    }

    .shopcar-bot .shopcar-bot1 .ul li:nth-child(2n-1) a {
        color: #000;
        font-weight: 600;
        text-decoration: none;
    }

    .shopcar .shopcar-bot .shopcar-bot5 .right .bill {
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