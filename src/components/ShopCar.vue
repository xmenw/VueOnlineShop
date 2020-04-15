<template>
  <div id="shopCar">
    <div class="shopcar">
      <div class="shopcar-bot">
        <div class="shopcar-bot2">
          <div class="shopcar-bot2-right">
            <ul class="shop-left">
              <li>操作</li>
              <li>金额</li>
              <li>数量</li>
              <li>单价</li>
            </ul>
          </div>
        </div>
        <div class="shopcar-bot4"
             style="margin-bottom:20px;"
             @click="select">
          <shop-component :shops.sync="shops"
                          :path="path"></shop-component>
        </div>
        <a-pagination
          :total="total"
          :defaultPageSize="pageSize"
          :pageSizeOptions="pageSizeOptions"
          @change="changPage"
          showSizeChanger
          showQuickJumper />

        <div class="shopcar-bot5">
          <ul class="right">
            <li class="bill">
              <a-button @click="account" type="primary">结算</a-button>
            </li>
            <li>合计（不含运费）<input type="text"
                     class="nu"
                     v-model="selectPrice"></input></li>
            <li>已选商品<input type="text"
                     class="nu"
                     v-model="selectNum"></input> 件</li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <div class="recommend">推荐商品</div>
      <list-component v-if="typeShops.length" :shops="typeShops"></list-component>
      <div v-else>
        <a-empty description="暂无推荐" />
      </div>
    </div>
  </div>
</template>
<script>
import ShopComponent from "@/components/component/ShopComponent.vue";
import ListComponent from './component/ListComponent'
import { mapState } from 'vuex'
export default {
  name: 'shopCar',
  data () {
    return {
      shops: [],
      pageCount: 0,
      begin: 0,
      selectPrice: 0.0,
      path: 'deleteById',
      selectNum: 0,
      typeShops: [],
      pageSizeOptions: ['5', '10', '15'],
      total: 0,
      pageSize: 5
    }
  },
  components: {
    ShopComponent,
    ListComponent
  },
  created () {
    this.queryShopByPage(0);
    this.queryCount();
    // this.searchType();
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  beforeRouteEnter: (to, from, next) => {
    if (!localStorage.getItem("user")) {
      let login = confirm("登录后，才能进入购物车。");
      if (login) {
        next("/login");
      }
    } else {
      next();
    }
  },
  methods: {
    queryShopByPage (begin) {
      this.begin = begin < 0 ? 0 : begin
      if (begin > (this.shops.length / this.pageSize)) {
        this.begin = Math.floor(this.shops.length / this.pageSize)
      }
      this.$axios.get(`/api/queryPage/${this.begin * this.pageSize}/${this.user.name}`)
        .then((response) => {
          if (!Array.isArray(response.data)) {
            this.shops = []
            return
          }
          this.shops = response.data || [];
          let { shops } = this;
          for (var i = 0, len = shops.length; i < len; i++) {
            shops[i].totalPrice = shops[i].num * shops[i].price;
            shops[i].count = shops[i].num;
            shops[i].selected = false;
          }
        })
        .catch((error) => {
          alert('获取数据失败')
          this.shops = []
          console.log(error);
        });
    },
    queryCount () {
      this.$axios.get(`/api/queryCount?username=${this.user.name}`)
        .then((response) => {
          this.pageCount = +response.data || 0;
          this.total = this.pageCount
        })
        .catch((error) => {
          alert('获取数据失败')
          console.log(error);
        });
    },
    selectAll () {
      let { shops, select } = this;
      for (var i = 0, len = shops.length; i < len; i++) {
        shops[i].selected = !select;
      }
    },
    account () {
      let arrShops = [];
      arrShops = this.shops.filter(element => {
        return element.selected;
      });
      arrShops.forEach(({ id, username, count }) => {
        let param = new URLSearchParams();
        param.append("id", id);
        param.append("shop_id", id);
        param.append("username", username);
        param.append("buy_num", count);
        this.$axios.post(`../api/insertBuy`, param)
          .then((res) => {
            console.log(res);
            console.log('购买成功');
          }).catch((err) => {
            alert('获取数据失败');
            console.log(err);
          })
      })
      arrShops = JSON.stringify(arrShops);
      this.$store.dispatch("buyShops", arrShops);
      this.$router.push(`/account`);
    },
    select () {
      setTimeout(() => {
        let arrSelectShops = this.shops.filter((shop) => {
          return shop.selected;
        })
        console.log(arrSelectShops)
        this.selectNum = arrSelectShops.reduce((num, val) => {
          return num + val.num;
        }, 0);
        console.log(this.selectNum)
        this.selectPrice = arrSelectShops.reduce((price, val) => {
          return price + val.price * val.num;
        }, 0);
      }, 0);
    },
    async searchType (e) {
      try {
        let { data } = await this.$axios.get(`api/queryTypes`);
        let params = new URLSearchParams();
        params.append('types', JSON.stringify(data))
        let { data: shops } = await this.$axios.post(`api/queryShopsByTypes`, params);
        this.typeShops = shops || [];
        localStorage.setItem('arrLikeShops', JSON.stringify(shops));
      } catch (error) {
        this.typeShops = JSON.parse(localStorage.getItem('arrLikeShops'));
        console.log(error)
      }
    },
    changPage(num){
      this.queryShopByPage(num)
    },
  }
}
</script>
<style lang="scss" scoped>
#shopCar {
  display: flex;
  flex-direction: column;
  align-items: center;

  .shopcar {
    &::after {
      content: "";
      display: block;
      width: 100%;
      border: 1px solid #c5c5c5;
    }
  }

  .recommend {
    margin-top: 10px;
    font-size: 40px;
    text-align: center;
  }

  .pagination {
    text-align: right;
    margin-bottom: 30px;
  }

  .pagination > li {
    display: inline-block;
  }

  .pagination > li button.active {
    color: #fff;
    background: #66bb6a;
  }

  .pagination > li > button,
  .pagination > li > span {
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

  .pagination > li:first-child > a,
  .pagination > li:first-child > span {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .pagination > li > a:hover,
  .pagination > li > span:hover,
  .pagination > li > a:focus,
  .pagination > li > span:focus {
    color: #23527c;
    background-color: #eee;
    border-color: #ddd;
  }

  .pagination > .active > a,
  .pagination > .active > span,
  .pagination > .active > a:hover,
  .pagination > .active > span:hover,
  .pagination > .active > a:focus,
  .pagination > .active > span:focus {
    z-index: 2;
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }

  .pagination > .disabled > span,
  .pagination > .disabled > span:hover,
  .pagination > .disabled > span:focus,
  .pagination > .disabled > a,
  .pagination > .disabled > a:hover,
  .pagination > .disabled > a:focus {
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

  .shopcar-bot5 .right {
    width: 100%;
    &::after {
      content: "";
      display: block;
      clear: both;
      overflow: hidden;
    }
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

  .shopcar-bot2-left::after,
  .shopcar-bot2-right::after {
    content: "";
    display: block;
    clear: both;
    overflow: hidden;
  }

  .shop-left {
    float: left;
  }

  .shopcar-bot2-right ul {
    width: 100%;
  }

  .shopcar-bot2-right ul li {
    float: right;
    margin-right: 60px;
    line-height: 50px;
  }

  .shopcar-bot2-right ul li:nth-child(1) {
    margin-right: 20px;
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

  .shopcar-bot5 .right li button {
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

  .shopcar-bot1 .ul li .cur:hover {
    cursor: not-allowed;
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