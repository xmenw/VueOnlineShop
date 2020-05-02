<template>
  <div id="index">
    <!-- 中间展示区域 -->
    <div class="show">
      <!-- 左部展示区 -->
      <div class="show-left">
        <ul class="item">
          <li>
            <a href="##"
               target="_blank">女装</a> /
            <router-link :to="{ name: 'ShopList' }">男装</router-link>
          </li>
          <li v-for="(type, index) in shopTypes"
              :key="index"
              style="cursor: pointer"
              @click="searchByTypes(index)">
            {{ type }}
          </li>
        </ul>
      </div>
      <!-- 中部展示区 -->
      <div class="show-center">
        <!-- 中上 -->
        <div class="center-top">
          <web-carousel class="carousel"></web-carousel>
        </div>
        <!-- 中下 -->
        <div class="center-bot">
          <router-link :to="'shopdetail/' + shop.id"
                       v-for="shop in searchShops"
                       :key="shop.id"
                       class="router">
            <img :src="shop.pic"
                 class="search-img" />
          </router-link>
        </div>
      </div>
      <!-- 右边展示区 -->
      <div class="show-right">
        <!-- 登录 -->
        <div class="login">
          <div class="top">
            <div class="tx">
              <a href="##"><img src="/image/tx.jpg" /> </a>
              <div class="code">
                <img src="/image/ewm.jpg" />
                <span>我的小店</span>
              </div>
            </div>
            <span id="hello">Hi! <em id="username">{{ user.name }}</em></span>
          </div>
          <div class="bot">
            <div class="bot-div">
              <a href="#"
                 v-if="user.name"
                 @click="logout(user.name)">注销</a>
              <router-link v-else
                           :to="{ name: 'Login' }">登录</router-link>
              <router-link :to="{ name: 'Regist' }">注册</router-link>
            </div>
          </div>
        </div>
        <div class="notice">
          <Notice></Notice>
        </div>
        <div class="bot"></div>
      </div>
    </div>
    <!-- 搜索商品展示区 -->
    <div class="searchShop"
         ref="shopShow">
      <list-component v-if="arrSearchShops.length"
                      :shops="arrSearchShops"></list-component>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <!-- end -->
      <div class="end">
        <span>END</span>
      </div>
      <div class="bot">
        <ul class="title">
          <li class="li">
            消费者保障
            <ul>
              <li><a href="##">保障范围</a></li>
              <li><a href="##">退货退款流程</a></li>
              <li><a href="##">服务中心</a></li>
              <li><a href="##">更多特色服务</a></li>
            </ul>
          </li>
          <li class="li">
            新手上路
            <ul>
              <li><a href="##">新手专区</a></li>
              <li><a href="##">消费警示</a></li>
              <li><a href="##">交易安全</a></li>
              <li><a href="##">24小时在线帮助</a></li>
              <li><a href="##">免费开店</a></li>
            </ul>
          </li>
          <li class="li">
            付款方式
            <ul>
              <li><a href="##">快捷支付</a></li>
              <li><a href="##">信用卡</a></li>
              <li><a href="##">余额宝</a></li>
              <li><a href="##">蚂蚁花呗</a></li>
              <li><a href="##">货到付款</a></li>
            </ul>
          </li>
          <li class="li">
            本店特色
            <ul>
              <li><a href="##">手机小店</a></li>
              <li><a href="##">旺旺/旺信</a></li>
              <li><a href="##">大众点评</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <hr />
    <!-- 关于 -->
    <div class="about">
      <p class="about-p-top">
        <span><a href="##">关于本店</a></span>
        <span><a href="##">合作伙伴</a></span>
        <span><a href="##">营销中心</a></span>
        <span><a href="##">廉政举报</a></span>
        <span><a href="##">联系客服</a></span>
        <span><a href="##">开放平台</a></span>
        <span><a href="##">诚征英才</a></span>
        <span><a href="##">联系我们</a></span>
        <span><a href="##">网站地图</a></span>
        <span><a href="##">法律声明及隐私权政策</a></span>
        <span><a href="##">知识产权</a></span>
        <span><b>|</b></span>
        <span>
          <em>© 2003-现在 Taobao.com 版权所有</em>
        </span>
      </p>
      <p class="about-p-center">
        <span><a href="##">网络文化经营许可证：浙网文[2016]0268-027号</a></span>
        <span><b>|</b></span>
        <span><a href="##">增值电信业务经营许可证：浙B2-20080224</a></span>
        <span><b>|</b></span>
        <span>
          <em>互联网违法和不良信息举报电话：0571-81683755
            blxxjb@alibaba-inc.com</em>
        </span>
      </p>
      <p class="about-p-bot">
        <span class="pic"></span>
        <span><a href="##">浙公网安备 33010002000078号</a></span>
        <span><b>|</b></span>
        <span>
          <em>（浙）网械平台备字[2018]第00004号</em>
        </span>
        <span><b>|</b></span>
        <span><a href="##">出版物网络交易平台服务经营备案证：新出发浙备字第002号</a></span>
        <span><b>|</b></span>
      </p>
      <div class="about-bot">
        <span><a href="##"
             class="pic1"></a></span>
        <span><a href="##"
             class="pic2"></a></span>
        <span><a href="##"
             class="pic3"></a></span>
        <span><a href="##"
             class="pic4"></a></span>
        <span><a href="##"
             class="pic5"></a></span>
        <span><a href="##"
             class="pic6"></a></span>
        <span><a href="##"
             class="pic7"></a></span>
        <span><a href="##"
             class="pic8"></a></span>
        <span><a href="##"
             class="pic9"></a></span>
        <span><a href="##"
             class="pic10"></a></span>
        <span><a href="##"
             class="pic11"></a></span>
      </div>
    </div>
  </div>
</template>
<script>
import WebCarousel from './component/WebCarousel'
import ListComponent from './component/ListComponent'
import Notice from './component/Notice'

import { mapState } from 'vuex'

export default {
  name: 'Show',
  data () {
    return {
      searchShops: [],
      len: 0,
      shopTypes: [],
      shopShow: null,
    }
  },
  async created () {
    let user
    try {
      user = localStorage.getItem('user')
    } catch (error) {
      console.log(error)
      user = ''
    }
    if (user) {
      this.$store.dispatch('setUser', { name: user })
    }
    let num
    try {
      let { data } = await this.queryShopsNum()
      num = data
    } catch (err) {
      console.log(err)
      num = 5
    }
    this.$axios
      .get(
        `/api/query5ShopsBySales?begin=${Math.floor(Math.random() * (num - 5))}`
      )
      .then(({ data }) => {
        this.searchShops = data
      })
      .catch((err) => {
        console.log(err)
      })
    try {
      let data = await this.queryTypes()
      this.shopTypes = data
    } catch (err) {
      console.log(err)
    }
  },
  components: {
    WebCarousel,
    ListComponent,
    Notice
  },
  computed: {
    ...mapState(['arrSearchShops', 'user']),
  },
  methods: {
    queryShopsNum () {
      return this.$axios.get(`api/queryShopsNum`)
    },
    logout (user) {
      localStorage.removeItem('user')
      this.$store.dispatch('setUser', {})
    },
    queryTypes () {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(`/api/queryAllTypes`)
          .then(({ data }) => {
            return resolve(data)
          })
          .catch((err) => {
            return reject(err)
          })
      })
    },
    async searchByTypes (i) {
      let params = new URLSearchParams()
      params.append('types', JSON.stringify(this.shopTypes[i]))
      try {
        let { data } = await this.$axios.post(`api/queryShopsByTypes`, params)
        if (typeof data !== 'object') {
          this.$store.dispatch('arrSearchShops', [])
          return
        }
        this.$store.dispatch('arrSearchShops', data)
        this.$refs.shopShow.scrollIntoView()
      } catch (error) {
        console.log(error)
        this.$store.dispatch('arrSearchShops', [])
      }
    },
  },
}
</script>
<style lang="scss" scoped>
#index {
  #myshop {
    width: 720px;
    height: 370px;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 3;
    margin-left: -300px;
    margin-top: -150px;
  }

  #myshop #a {
    position: absolute;
    right: 10px;
    top: -40px;
    font-size: 30px;
    text-align: center;
    color: #f00;
  }

  #myshop #a:hover {
    background-color: rgba(0, 0, 0, 0.2);
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .show {
    width: 1186px;
    height: 521px;
    border: 1px solid #6ac1d4;
    margin: 0 auto;
    background-color: #f5f5f5;
  }

  .show .show-left {
    width: 191px;
    height: 520px;
    background-color: #fff;
    border: 1px solid #6ac1d4;
    border-top: transparent;
    border-left: transparent;
    float: left;
  }

  .show .show-left .item {
    height: 30px;
    line-height: 31px;
    text-indent: 1em;
  }

  .show .show-left .item li {
    height: 32.5px;
  }

  .show .show-left .item li a {
    font-size: 14px;
    font-weight: 400px;
  }

  .show .show-left .item li:hover {
    background-color: #6ac1d4;
    transition: 2s ease-out;
  }

  .show .show-left .item > li::after {
    content: ">";
    float: right;
    color: #b3b3b3;
    font-weight: 600;
  }

  .show .show-left .item li a:hover {
    color: #f40;
    text-decoration: underline;
  }

  .show .show-left .item .none ul li {
    float: none;
    display: inline-block;
  }

  .show .show-left .item .none ul h5 {
    text-align: left;
  }

  .show .show-left .item .none ul li a:hover {
    text-decoration: none;
    color: #666;
  }

  .show .show-left .item .none ul li:hover {
    background: none;
  }

  .show .show-left .item .none ul {
    color: #f00;
    float: right;
    position: absolute;
    width: 300px;
    text-align: center;
    left: 273px;
    top: 186px;
    background-color: #fff;
    border: 1px solid #6ac1d4;
  }

  .show .show-left .item li .none {
    display: none;
  }

  .show .show-left .item li:hover .none {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 3;
    display: inline-block;
  }

  .show .show-center {
    width: 690px;
    height: 511px;
    float: left;
    padding: 5px;
    position: relative;
  }

  .show .show-center > .center-top {
    position: relative;
    width: 690px;
    height: 260px;
    overflow: hidden;
    margin-bottom: 2px;
    margin-left: 5px;
  }

  .center-top .carousel {
    width: 100%;
    height: 100%;
  }

  .show .show-center > .center-top .lbt {
    position: absolute;
    width: 3450px;
    height: 260px;
    padding: 5px;
    transition: all 1s;
  }

  .show .show-center .center-top img {
    float: left;
    width: 690px;
    height: 100%;
  }

  .show .show-center > .center-top .button {
    position: absolute;
    top: 230px;
    right: 50px;
  }

  .show .show-center > .center-top .button strong {
    display: inline-block;
    background-color: #64a1d6;
    cursor: pointer;
    border-radius: 50%;
    width: 20px;
    text-align: center;
    margin-left: 10px;
  }

  .show .show-center > .center-top .button .on {
    background-color: #fff;
  }

  .show .show-center > .center-top .button strong:hover {
    background-color: #fff;
  }

  .show .show-center > .center-top .left {
    display: none;
    position: absolute;
    left: 20px;
    top: 115px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 25px;
  }

  .show .show-center > .center-top .right {
    display: none;
    position: absolute;
    right: 20px;
    top: 115px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 25px;
  }

  .show .show-center > .center-top:hover .left,
  .show .show-center > .center-top:hover .right {
    display: inline-block;
    background-color: rgba(100, 161, 214, 0.3);
  }

  .show .show-center .center-bot img:hover {
    transform: scale(1.05, 1.05);
    box-shadow: 0 5px 2px rgba(0, 0, 0, 0.3);
    border: 1px solid #6ac1d4;
    transition: transform 0.5s ease-out;
  }

  .center-bot .router {
    float: left;
    display: inline-block;
    width: 205px;
    height: 115px;
    margin: 5px;
    & img {
      width: 100%;
      height: 100%;
    }
    &:nth-of-type(1) {
      width: 240px;
      height: 235px;
    }
    &::after {
      content: "";
      display: block;
      clear: both;
      overflow: hidden;
    }
  }

  .show .show-center .center-top:hover .showa {
    display: inline-block;
  }

  .show .show-center .center-top .showa {
    display: none;
    position: absolute;
    top: 130px;
    left: 300px;
    text-align: center;
    line-height: 270px;
    width: 690px;
    height: 260px;
    font-size: 25px;
    color: #fff;
    font-weight: 700;
    margin-left: -290px;
    margin-top: -120px;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .show .show-center > .center-bot {
    width: 690px;
    height: 239px;
    padding: 5px 5px 0 5px;
  }

  .show .show-center .center-bot .left {
    width: 234px;
    height: 240px;
    float: left;
    border-right: 1px solid #f3f3f3;
  }

  .show .show-center .center-bot .left a img {
    width: 100%;
    height: 100%;
  }

  .show .show-center .center-bot .center {
    width: 234px;
    height: 239px;
    float: left;
    border-right: 1px solid #f3f3f3;
  }

  .show .show-center .center-bot .center .center-top {
    width: 234px;
    height: 119px;
    border-bottom: 1px solid #f3f3f3;
  }

  .show .show-center .center-bot .center .center-top a img {
    width: 100%;
    height: 100%;
  }

  .show .show-center .center-bot .center .center-bot {
    width: 234px;
    height: 119px;
  }

  .show .show-center .center-bot .center .center-bot a img {
    width: 100%;
    height: 100%;
  }

  .show .show-center .center-bot .right {
    width: 219px;
    height: 240px;
    float: left;
  }

  .show .show-center .center-bot .right .right-top {
    width: 219px;
    height: 119px;
    border-bottom: 1px solid #f3f3f3;
  }

  .show .show-center .center-bot .right .right-top a img {
    width: 100%;
    height: 100%;
  }

  .show .show-center .center-bot .right .right-bot {
    width: 219px;
    height: 119px;
  }

  .show .show-center .center-bot .right .right-bot a img {
    width: 100%;
    height: 100%;
  }

  .show .show-right {
    width: 280px;
    height: 100%;
    float: right;
    background-color: #fff;
  }

  .show .show-right .login {
    width: 280px;
    height: 145px;
  }

  .show .show-right .login .top {
    width: 100%;
    height: 91px;
    padding-top: 10px;
  }

  .show .show-right .login .top .tx {
    width: 74px;
    height: 56px;
    text-align: center;
    margin: 0 auto;
  }

  .show .show-right .login .top .tx .code {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 100px;
    right: 190px;
    display: none;
  }

  .show .show-right .login .top .tx .code img {
    width: 60px;
    height: 60px;
  }

  .show .show-right .login .top .tx .code span {
    font-size: 12px;
  }

  .show .show-right .login .top .tx:hover .code {
    display: inline-block;
  }

  .show .show-right .login .top .tx a {
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
  }

  .show .show-right .login .top #hello {
    display: block;
    height: 17px;
    width: 100%;
    font-size: 12px;
    line-height: 17px;
    text-align: center;
  }

  .show .show-right .login .top .p {
    height: 17px;
    font-size: 12px;
    color: #6ac1d4;
    text-align: center;
  }

  .show .show-right .login .top .p a {
    display: inline-block;
    width: 85px;
    height: 17px;
    line-height: 17px;
    text-align: center;
    border-radius: 9px;
    margin-right: 5px;
    background-color: #6ac1d4;
  }

  .show .show-right .login .top .p .p-left::before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url("/image/pic.png");
    background-position: 0 -572.5px;
  }

  .show .show-right .login .top .p .p-right::before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    background: url("/image/pic.png");
    background-position: 0 -573px;
  }

  .show .show-right .login .top .tx a img {
    width: 100%;
    height: 100%;
  }

  .show .show-right .login .bot {
    width: 100%;
    height: 40px;
  }

  .show .show-right .login .bot .bot-div {
    height: 40px;
    width: 100%;
    margin-top: 8px;
    text-align: center;
  }

  .show .show-right .login .bot .bot-div a {
    display: inline-block;
    width: 60px;
    height: 25px;
    border-radius: 8px;
    margin-right: 10px;
    line-height: 25px;
    background-color: #6ac1d4;
  }

  .show .show-right .jubao {
    width: 280px;
    height: 26px;
  }

  .show .show-right .jubao a #jb {
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 26px;
    font-size: 14px;
    color: #000;
    background-color: #6ac1d4;
    text-align: center;
  }

  .show .show-right .notice {
    width: 280px;
    height: 108px;
  }

  .show .show-right .notice .not {
    padding-top: 10px;
    width: 100%;
    height: 24px;
  }

  .show .show-right .notice .not li {
    cursor: pointer;
    line-height: 20px;
    text-align: center;
    margin: 0 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid #6ac1d4;
  }

  .show .show-right .notice .not li a:hover {
    color: #6ac1d4;
  }

  .show .show-right .notice .nr {
    display: none;
    width: 100%;
    height: 70px;
    font-size: 14px;
    text-align: center;
    line-height: 70px;
  }

  .show .show-right .notice .nei-rong li {
    text-align: center;
    height: 25px;
    width: 100%;
    line-height: 25px;
    margin-top: 10px;
  }

  .show .show-right .notice .nei-rong li a {
    color: #3c3c3c;
  }

  .show .show-right .notice .nei-rong li a:hover {
    color: #6ac1d4;
  }

  .show .show-right .xiaoge {
    width: 279px;
    height: 240px;
    border: 1px solid #f3f3f3;
    border-right-color: #6ac1d4;
  }

  .show .show-right .xiaoge .xg {
    width: 280px;
    height: 241px;
  }

  .show .show-right .xiaoge .xg li {
    float: left;
    border-right: 1px solid #f3f3f3;
    border-bottom: 1px solid #f3f3f3;
    width: 68.5px;
    height: 79px;
  }

  .show .show-right .xiaoge .xg li:nth-child(4n) {
    border-right: none;
  }

  .show .show-right .xiaoge .xg li {
    text-align: center;
  }

  .show .show-right .xiaoge .xg li a [class^="span"] {
    display: inline-block;
    line-height: 24px;
    margin-top: 11px;
    text-align: center;
    width: 24px;
    height: 24px;
  }

  .show .show-right .xiaoge .xg li a p {
    font-size: 12px;
    margin-top: 6px;
  }

  .show .show-right .xiaoge .xg li a:hover {
    color: #6ac1d4;
  }

  .show .show-right .xiaoge .xg li a .span1 {
    background: url("/image/pic.png");
  }

  .show .show-right .xiaoge .xg li a .span2 {
    background: url("/image/pic.png");
    background-position: 0 -87px;
  }

  .show .show-right .xiaoge .xg li a .span3 {
    background: url("/image/pic.png");
    background-position: 0 -44px;
  }

  .show .show-right .xiaoge .xg li a .span4 {
    background: url("/image/pic.png");
    background-position: 0 -132px;
  }

  .show .show-right .xiaoge .xg li a .span5 {
    background: url("/image/pic.png");
    background-position: 0 -176px;
  }

  .show .show-right .xiaoge .xg li a .span6 {
    background: url("/image/pic.png");
    background-position: 0 -220px;
  }

  .show .show-right .xiaoge .xg li a .span7 {
    background: url("/image/pic.png");
    background-position: 0 -264px;
  }

  .show .show-right .xiaoge .xg li a .span8 {
    background: url("/image/pic.png");
    background-position: 0 -308px;
  }

  .show .show-right .xiaoge .xg li a .span9 {
    background: url("/image/pic.png");
    background-position: 0 -352px;
  }

  .show .show-right .xiaoge .xg li a .span10 {
    background: url("/image/pic.png");
    background-position: 0 -396px;
  }

  .show .show-right .xiaoge .xg li a .span11 {
    background: url("/image/pic.png");
    background-position: 0 -440px;
  }

  .show .show-right .xiaoge .xg li a .span12 {
    background: url("/image/pic.png");
    background-position: 0 -484px;
  }

  .bottom {
    width: 1190px;
    height: 300px;
    background-color: #f3f3f3;
    margin: 0 auto;
    margin-top: 80px;
  }

  .bottom .end {
    width: 1190px;
    height: 50px;
    margin: 0 auto;
    text-align: center;
    color: #acb;
  }

  .bottom .end span {
    line-height: 50px;
    position: relative;
  }

  .bottom .end span::before {
    content: "";
    position: absolute;
    border-top: 1px solid #acb;
    display: inline-block;
    top: 50%;
    left: -380px;
    line-height: 0px;
    width: 300px;
    height: 0px;
  }

  .bottom .end span::after {
    content: "";
    position: absolute;
    border-top: 1px solid #acb;
    display: inline-block;
    top: 50%;
    right: -380px;
    line-height: 0px;
    width: 300px;
    height: 0px;
  }

  .bottom .bot {
    width: 100%;
    height: 180px;
    margin-top: 70px;
  }

  .bottom .bot .title .li {
    float: left;
    font-size: 16px;
    font-weight: 600;
    color: #c3c3c3;
    width: 296px;
    height: 180px;
    text-align: center;
  }

  .bottom .bot .title .li ul {
    width: 198px;
    height: 42px;
    margin: 30px auto 0;
  }

  .bottom .bot .title .li ul li {
    display: inline-block;
    float: none;
    margin-right: 10px;
  }

  .bottom .bot .title .li ul li a {
    font-size: 12px;
    color: #999;
  }

  .bottom .bot .title .li ul li a:hover {
    color: #6ac1d4;
  }

  hr {
    width: 1190px;
    margin: 30px auto;
    border-color: #f3f3f3;
  }

  .about {
    width: 1190px;
    height: 81px;
    margin: 0 auto;
  }

  .about .about-p-top span {
    float: left;
    font-size: 12px;
    margin-right: 10px;
  }

  .about .about-p-top span a {
    color: #333;
  }

  .about .about-p-top span a:hover {
    color: #6ac1d4;
  }

  .about .about-p-top {
    padding-bottom: 8px;
  }

  b {
    font-size: 12px;
    margin: 0 3px;
    color: #eee;
  }

  em {
    font-size: 16px;
    color: #f00;
  }

  .about [class^="about-p"] {
    height: 20px;
    line-height: 20px;
  }

  .about .about-p-center span {
    float: left;
    font-size: 12px;
    margin-right: 10px;
  }

  .about .about-p-center span a {
    color: #333;
  }

  .about .about-p-center span a:hover {
    color: #6ac1d4;
  }

  .about .about-p-center {
    padding-bottom: 8px;
  }

  .about .about-p-bot {
    border-bottom: 8px;
  }

  .about .about-p-bot span {
    float: left;
    font-size: 12px;
    margin-right: 10px;
  }

  .about .about-p-bot span a {
    color: #333;
  }

  .about .about-p-bot span a:hover {
    color: #6ac1d4;
  }

  .about .about-p-bot .pic {
    width: 20px;
    height: 20px;
    background-position: -861px 0px;
    background-image: url("/image/pic.jpg");
  }

  .about .about-bot {
    height: 80px;
    padding-top: 15px;
  }

  .about .about-bot span a {
    display: inline-block;
    background-repeat: no-repeat;
    width: 36px;
    height: 40px;
    margin-right: 15px;
    vertical-align: middle;
  }

  .about .about-bot span .pic1 {
    background-image: url("/image/pic3.gif");
    background-position: 0 0;
  }

  .about .about-bot span .pic2 {
    background-image: url("/image/pic.jpg");
    background-position: 0px 0px;
    width: 30px;
  }

  .about .about-bot span .pic3 {
    background-image: url("/image/pic.jpg");
    background-position: -40px 0;
    width: 33px;
  }

  .about .about-bot span .pic4 {
    background-image: url("/image/pic.jpg");
    background-position: -80px 0;
    width: 50px;
  }

  .about .about-bot span .pic5 {
    background-image: url("/image/pic.jpg");
    background-position: -140px 0;
    width: 83px;
  }

  .about .about-bot span .pic6 {
    background-image: url("/image/pic.jpg");
    background-position: -240px 0;
    width: 94px;
  }

  .about .about-bot span .pic7 {
    background-image: url("/image/pic2.png");
    background-position: 0 -18px;
    width: 250px;
  }

  .about .about-bot span .pic8 {
    background-image: url("/image/pic.jpg");
    background-position: -650px 0;
    width: 105px;
  }

  .about .about-bot span .pic9 {
    background-image: url("/image/pic.jpg");
    background-position: -345px 0;
    width: 82px;
  }

  .about .about-bot span .pic10 {
    background-image: url("/image/pic.jpg");
    background-position: -761px 0;
    width: 97px;
  }

  .about .about-bot span .pic11 {
    background-image: url("/image/pic.jpg");
    background-position: -884px 0;
    width: 249px;
  }
}
</style>
