<template>
    <div id="header">
        <div class="cover">
            <ul class="cover-left">
                <li>中国大陆</li>
                <li>手机</li>
            </ul>
            <ul class="right">
                <li v-for="nav in navs" :key="nav.path">
                    <router-link :to="{name: nav.path}">{{ nav.name }}</router-link>
                </li>
                <li v-for="router in $route.meta" :key="router.path">
                    <router-link v-show="isLogin" :to="{name: router.path}">{{ router.name }}</router-link>
                </li>
            </ul>
        </div>
        <!-- 搜索区 -->
        <div class="head">
            <div class="wrape">
                <div class="logo">
                    <router-link :to="{name: 'show'}">
                        <img src="image/logo.jpg">
                    </router-link>
                </div>
                <!-- 搜索框 -->
                <div class="search">
                    <div class="search-input">
                        <form method="get">
                            <div class="input">
                                <input type="text" name="search" 
                                    id="search" autocomplete="off" placeholder="请输入要搜索的宝贝"
                                    @input="search"    
                                >
                            </div>
                            <div class="button">
                                <button @click.prevent="" type="submit">搜索</button>
                            </div>
                        </form>
                        <ul class="result"
                         v-show="isSearch"
                         @click="ShopDetail"
                         @mouseleave="isSearch = false"
                        >
                            <li class="list" v-for="list in searchShops" :key="list.id" :data-id="list.id">
                                {{ list.desc }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 中间导航栏 -->
        <div class="nav-center">
            <div class="center">
                <ul class="nav">
                    <li class="mall">主题市场</li>
                </ul>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: "Index",
    data() {
        return {
            navs: [{
                path: "Login",
                name: "登录"
            }, {
                path: "Regist",
                name: "注册"
            }, {
                path: "ShopCar",
                name: "购物车"
            }, {
                path: "UserInfo",
                name: "个人资料"
            }],
            shops: [],
            searchShops: [],
            isSearch: false
        };
    },
    computed: {
      isLogin(){
        return localStorage.getItem("user") === "aaa";
      }
    },
    async created(){
        try {
            let {data} = await this.queryShops();
            this.shops = data;
        } catch (error) {
            this.shops = [];
            console.log(error);
        }
    },
    methods: {
        queryShops(){
            return this.$axios.get(`api/queryAllShops`)
        },
        search(e){
            let val = e.target.value.trim()
            if(val){
                let shops = this.shops.filter((shop)=>{
                    return shop.desc.indexOf(val) > -1;
                })
                this.$store.dispatch('arrSearch', JSON.stringify(shops))
                this.searchShops = shops
                this.isSearch = true
            }else {
                this.isSearch = false
            }
        },
        ShopDetail(e){
            this.isSearch = false
            let id = e.target.getAttribute('data-id');
            if(id){
                this.$router.push('shopdetail/' + id)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#header {
    .cover {
        width: 1190px;
        height: 35px;
        margin: 0 auto;
        padding-left: 10px;
        line-height: 35px;
        font-size: 12px;
        color: #ffffff;
        background: #6ac1d4;
    }

    .right li {
        float: right;
        margin-right: 20px;
        a {
            color: #ffffff;
            &:hover {
                color: #000000;
            }
        }
    }

    .cover .cover-left li {
        float: left;
        margin-right: 7px;
    }

    .cover .cover-left .land {
        margin-left: 7px;
    }

    .cover .cover-left .login a {
        color: #6ac1d4;
    }

    .cover .cover-right li {
        float: right;
        width: 70px;
        height: 35px;
        text-align: center;
        line-height: 35px;
    }

    .cover .cover-right .my {
        display: none;
    }

    .cover .cover-right li:nth-child(2):hover {
        background-color: #fff;
        border: 1px solid #6ac1d4;
        border-top: none;
        border-bottom: none;
    }

    .cover .cover-right li:hover .my {
        border: 1px solid #6ac1d4;
        border-top: none;
        width: 70px;
        border-top: 1px dashed #6ac1d4;
        position: relative;
        z-index: 10;
        left: -1px;
        background-color: #fff;
        display: inline-block;
    }

    .cover .cover-right li .my ul li {
        float: none;
    }

    .cover li a:hover {
        color: #000000;
    }

    .head {
        height: 121px;
        margin: 0 auto;
    }

    .head .wrape {
        height: 97px;
        padding-top: 24px;
    }

    .wrape .logo {
        height: 87px;
        width: 142px;
        margin-left: 22px;
        background-color: #fff;
        float: left;
    }

    .wrape .logo img {
        height: 100%;
        width: 100%;
    }

    .head {
        width: 1190px;
    }

    .head .wrape .search {
        position: relative;
        height: 87px;
        width: 627px;
        margin-left: 250px;
        margin-top: 10px;
    }

    .search .showresult {
        display: none;
        position: absolute;
        width: 552px;
        padding: 10px 0;
        z-index: 1000;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        background-color: #fff;
    }

    .search .showresult .results {
        width: 100%;
    }

    .search .showresult .results>li {
        width: 100%;
        height: 30px;
        padding: 0 5px;
        cursor: pointer;
        line-height: 30px;
    }

    .search .showresult .results>li:hover {
        background-color: #6ac1d4;
    }

    .head .wrape .search .search-top {
        height: 22px;
    }

    .head .wrape .search .search-top .top li {
        float: left;
        font-size: 12px;
        text-align: center;
        width: 36px;
        height: 22px;
        line-height: 22px;
        margin-right: 4px;
    }

    .head .wrape .search .search-top .top .top-left a {
        display: inline-block;
        width: 36px;
        height: 22px;
        margin-left: 20px;
        background-color: #6ac1d4;
        color: #fff;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        font-weight: 700;
    }

    .head .wrape .search .search-top .top .top-right {
        margin-left: 30px;
    }

    .head .wrape .search .search-top .top .top-right:hover {
        background-color: #6ac1d4;
        color: #f40;
    }

    .head .wrape .search .search-input {
        position: relative;
    }

    .search .search-input input {
        text-indent: 1em;
    }

    .search-input .result {
        position: relative;
        width: 461px;
        z-index: 10;
        background-color: #fff;
        user-select: none;
        .list {
            height: 30px;
            width: 100%;
            margin: 3px 0;
            line-height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:hover {
                cursor: pointer;
                background-color: #64a1d6;
            }
        }
    }

    .head .wrape .search .search-input input {
        outline: none;
        border: none;
    }

    .head .wrape .search .search-input .input {
        width: 551px;
        height: 36px;
        border: 2px solid #6ac1d4;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        border-right: none;
        overflow: hidden;
    }

    .head .wrape .search .search-input .input input {
        width: 100%;
        height: 100%;
    }

    .head .wrape .search .search-input form .button {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 100;
        width: 74px;
        height: 40px;
        overflow: hidden;
        text-align: center;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .head .wrape .search .search-input form .button button {
        font-size: 18px;
        font-weight: 700;
        color: #FFF;
        background-color: #6ac1d4;
        cursor: pointer;
        height: 100%;
        border: none;
        width: 100%;
    }

    .head .wrape .search .search-bot .b li {
        float: left;
        font-size: 12px;
        margin-left: 7px;
    }

    .head .wrape .search .search-bot .b .t a {
        color: #6ac1d4;
    }

    .head .wrape .search .search-bot .b li a:hover {
        color: #6ac1d4;
    }

    .head .wrape .search .search-bot .b .more {
        float: right;
        margin-right: 15px;
    }

    .time {
        position: absolute;
        top: 50px;
        right: 80px;
        width: 220px;
        height: 40px;
        color: #f50;
        text-align: center;
    }

    .time input {
        outline: none;
        border: none;
        text-align: center;
        width: 20px;
    }

    .nav-center {
        width: 100%;
        height: 30px;
        background-image: linear-gradient(to right, #6ac1d4 0, #1e889f 100%);
    }

    .nav-center .center {
        width: 1186px;
        height: 100%;
        margin: 0 auto;
    }

    .nav-center .nav {
        height: 100%;
    }

    #username {
        font-style: normal;
        margin-left: 0;
        color: #f40;
        font-size: 16px;
    }

    .nav-center .nav li {
        float: left;
        height: 100%;
        margin-right: 10px;
        text-align: center;
        line-height: 30px;
        color: #fff;
        font-weight: 700;
    }

    .nav-center .nav li>a {
        height: 100%;
    }

    .nav-center .nav .fgf {
        margin: 0 20px;
    }

    .nav-center .nav li a {
        display: inline-block;
        width: 100px;
        color: #fff;
    }

    .nav-center .nav li a:hover {
        background-color: #2195af;
        border-radius: 30px;
        color: #561561;
    }

    .nav-center .nav .mall {
        width: 192px;
        background-color: #6aced4;
    }
}
</style>