<template>
    <div class="shopDeatil">
        <div class="datail">
            <div class="cente">
                <div class="pic">
                    <img :src="baseUrl + shop.pic" alt="商品图片" id="imgs">
                    <div class="fdj"></div>
                </div>
                <div class="xinxi">
                    <div class="name">
                        <span id="desc">{{ shop.desc }}</span>
                    </div>
                    <div class="list">
                        <ul class="jg">
                            <li>
                                <span>价格</span>
                                <span class="price">¥162.00</span>
                            </li>
                            <li>
                                <span>小店价</span>
                                <span id="price">￥{{ shop.price }}</span>
                            </li>
                        </ul>
                        <ul class="list-ul">
                            <li>
                                <span>配送</span>
                                <span>浙江宁波 至 河北廊坊三河市 快递 免运费 30天内发货</span>
                            </li>
                            <li id="size">
                                <span>尺码</span>
                                <span class="size">{{ shop.size }}</span>
                            </li>
                            <li id="color">
                                <span>主要颜色</span>
                                <em>{{ shop.color }}</em>
                            </li>
                        </ul>
                        <div class="cnt">
                            <span>数量</span>
                            <span class="dis" @click="disNum">-</span>
                            <input type="text" value="1" class="count" v-model="num">
                            <span class="add" @click="addNum">+</span>
                            <span id="kucun" ref="kucun"> 库存{{ shop.num }}件</span>
                        </div>
                        <div class="button">
                            <form action="/api/inserShopCar" method="post">
                                <input type="text" name="id" v-model="shop.id" hidden="hidden" />
                                <input type="text" name="username" v-model="shop.username" hidden="hidden" />
                                <input type="text" name="desc" v-model="shop.desc" hidden="hidden">
                                <input type="text" name="pic" v-model="shop.pic" hidden="hidden">
                                <input type="text" name="price" v-model="shop.price" hidden="hidden">
                                <input type="text" name="size" v-model="shop.size" hidden="hidden">
                                <input type="text" name="color" v-model="shop.color" hidden="hidden">
                                <input type="text" name="num" v-model="num" hidden="hidden">
                                <button class="shopcar" @click.prevent="insertShop">加入购物车</button>
                                <button class="shopcar" @click.prevent="collectShop">收藏</button>
                                <button class="shopcar" @click.prevent="buyShop">购买</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="introduce">
                <ul class="ul">
                    <router-link tag="li" active-class="active" :to="{name: 'Comment', params: {id: shop.id}}">商品评论</router-link>
                    <router-link tag="li" active-class="active" :to="{name: 'Detail', params: {id: shop.id}}">宝贝详情</router-link>
                </ul>
            </div>
        </div>
        <keep-alive>
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </keep-alive>
    </div>
</template>
<script>
export default {
    name: "ShopDetail",
    data() {
        return {
            num: 1, // 发送给后台的数量
            kucun: '', //库存
            shop: {},
            baseUrl: process.env.BASE_URL
        }
    },
    created() {
        let { id } = this.$route.params;
        this.queryShop(id);
    },
    mounted() {
        let { kucun } = this.$refs;
        this.kucun = kucun;
    },
    methods: {
        insertShop() {
            let { shop, num } = this;
            let { id } = this.$route.params;
            let param = new URLSearchParams();
            param.append("id", shop.id);
            param.append("username", shop.username);
            param.append("desc", shop.desc);
            param.append("pic", shop.pic);
            param.append("price", shop.price);
            param.append("num", num);
            param.append("size", shop.size);
            param.append("color", shop.color);
            this.$axios.post(`../api/insertShopCar`, param)
                .then((response) => {
                    if (response.data > 0) {
                        this.queryShop(id);
                        alert("添加成功！");
                    } else {
                        alert("添加失败!");
                    }
                })
                .catch((error) => {
                    alert("获取数据失败！");
                    console.log(error);
                    throw new Error("获取数据失败！");
                });
        },
        queryShop(id) {
            this.$axios.get(`/api/detail/${id}`)
                .then((response) => {
                    this.shop = response.data;
                })
                .catch((error) => {
                    alert("获取数据失败！");
                    console.log(error);
                });
        },
        disNum() {
            if (this.num <= 1) {
                return;
            }
            this.num--;
        },
        addNum() {
            if (this.num >= this.shop.num) {
                return;
            }
            this.num++;
        },
        collectShop(){
            let { shop, num } = this;
            let { id } = this.$route.params;
            let param = new URLSearchParams();
            param.append("id", shop.id);
            param.append("shop_id", shop.id);
            param.append("username", shop.username);
            this.$axios.post(`../api/insertCollect`, param)
                .then((response) => {
                    if (response.data > 0) {
                        alert("收藏成功！");
                    } else {
                        alert("收藏失败!");
                    }
                })
                .catch((error) => {
                    alert("获取数据失败！");
                    console.log(error);
                    throw new Error("获取数据失败！");
                });
        },
        buyShop(){
            this.shop.selected = true;
            this.shop.count = this.num;
            this.shop.totalPrice = this.shop.num * this.shop.price;
            this.$store.dispatch("buyShops", JSON.stringify([this.shop]));
            console.log(this.shop)
            this.$router.push(`/account`);      
        }
    }
}
</script>
<style lang="scss" scoped>
.shopDeatil {
    margin-top: 30px;
    .nz-top {
        width: 1000px;
        height: 65px;
        margin: 10px auto;
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .6s;
    }
    .fade-enter {
        opacity: 1;
    }

    .fade-leave-to {
        opacity: 0;
    }

    .nz-top .nz-top-left {
        display: inline-block;
    }

    .nz-top .nz-top-left img {
        width: 150px;
        height: 60px;
        vertical-align: -15px;
    }

    .nz-top .nz-top-right {
        display: inline-block;
        position: relative;
        float: right;
        height: 30px;
        margin-top: 10px;
        line-height: 30px;
    }

    .nz-top .nz-top-right .input input {
        display: inline-block;
        width: 400px;
        height: 30px;
        text-indent: 0.3em;
        outline: none;
        margin-right: 80px;
        border: 2px solid #6ac1d4;
    }

    .nz-top .nz-top-right .button button {
        position: absolute;
        top: 0px;
        right: 20px;
        width: 60px;
        height: 34px;
        border: none;
        outline: none;
        background-color: #6ac1d4;
    }

    .cente {
        width: 1020px;
        height: 360px;
        margin: 0 auto;
        border: 1px solid #6ac1d4;
    }

    .cente .pic {
        float: left;
        position: relative;
        overflow: hidden;
        width: 500px;
        height: 360px;
    }

    .cente .fdj {
        position: absolute;
        top: 0px;
        left: -200px;
        cursor: move;
        width: 200px;
        height: 144px;
        background-color: rgba(255, 0, 0, 0.5);
    }

    .cente .bpic {
        display: none;
        position: absolute;
        z-index: 10;
        top: 85px;
        left: 670px;
        width: 500px;
        height: 360px;
        border: 1px solid blue;
        overflow: hidden;
        background-size: 1250px 900px;
        background-repeat: no-repeat;
        background-position: 0 0;
    }

    .cente .pic img {
        width: 500px;
        height: 360px;
    }

    .cente .xinxi {
        float: right;
        width: 500px;
        height: 360px;
    }

    .cente .xinxi .name {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-weight: 700;
        margin-top: 10px;
    }

    .cente .xinxi .list {
        width: 100%;
        height: 310px;
    }

    .cente .xinxi .list li {
        height: 40px;
        font-size: 14px;
        line-height: 40px;
    }

    .cente .xinxi .list .jg {
        width: 100%;
        background-image: linear-gradient(to bottom, rgba(100, 161, 214, 0.5) 0, rgba(100, 161, 214, 0.1) 100%);
    }

    .cente .xinxi .list li span:nth-child(1) {
        display: inline-block;
        margin-left: 5px;
        width: 65px;
    }

    .cente .xinxi .list .jg li span:nth-child(2) {
        text-align: center;
    }

    .cente .xinxi .list .jg li:nth-child(3) a {
        display: inline-block;
        text-align: center;
        color: #f40;
        text-decoration: underline dashed;
        margin-left: 10px;
    }

    .cente .xinxi .list .jg .price {
        text-decoration: line-through;
    }

    .cente .xinxi .list .list-ul .size {
        box-sizing: border-box;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        line-height: 30px;
        border: 1px solid #c0c0c0;
        width: 40px;
        height: 30px;
    }

    #size .checked {
        border: 2px solid #64a1d6;
    }

    .cente .xinxi .list .list-ul .size:hover {
        border: 2px solid #64a1d6;
    }

    #color em.checked {
        border: 2px solid #64a1d6;
    }

    .cente .xinxi .list .list-ul li em {
        display: inline-block;
        font-style: normal;
        box-sizing: border-box;
        border: 1px solid #c0c0c0;
        margin-left: 5px;
        width: 50px;
        height: 25px;
        text-align: center;
        line-height: 22px;
        cursor: pointer;
    }

    .cente .xinxi .list .list-ul li em:hover {
        border: 2px solid #64a1f6;
    }

    .cente .xinxi .list .cnt {
        width: 100%;
        height: 30px;
        font-size: 14px;
        user-select: none;
    }

    .cente .xinxi .list .cnt span:nth-child(1) {
        display: inline-block;
        margin-left: 5px;
        width: 65px;
    }

    .cente .xinxi .list .cnt span:nth-child(2n) {
        display: inline-block;
        height: 23px;
        width: 20px;
        vertical-align: middle;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
        font-size: 25px;
        border: 1px solid #c3c3c3;
        background-color: #e3e3e3;
    }

    .cente .xinxi .list .cnt input {
        height: 22px;
        text-align: center;
        line-height: 30px;
        width: 32px;
    }

    .cente .xinxi .list .button {
        position: relative;
        top: 10px;
    }

    .cente .xinxi .list .button button {
        width: 130px;
        height: 30px;
        cursor: pointer;
        margin-left: 10px;
        border: none;
        outline: none;
        color: #fff;
        background-color: #64a1f6;
        &:nth-of-type(2) {
            background-color: #00f;
        }
        &:nth-of-type(3) {
            background-color: #43a047;
        }
    }

    .introduce {
        width: 1020px;
        position: relative;
        top: 10px;
        margin: 0 auto;
        border-top: 1px solid #c0c0c0;
    }

    .introduce .ul {
        width: 100%;
        height: 30px;
        margin: 0 auto;
    }

    .introduce .ul li {
        box-sizing: border-box;
        float: left;
        cursor: pointer;
        width: 90px;
        text-align: center;
        line-height: 30px;
        height: 30px;
        border-right: 1px solid #00f;
        background-color: #64a1d6;
        &.active {
            background-color: #fff;
            border-top: 2px solid #34a1d6;
        }
    }
}
</style>