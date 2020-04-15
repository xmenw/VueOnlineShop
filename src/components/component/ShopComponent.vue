<template>
  <div id="shopComponent">
    <div
      class="shopcar-bot4"
      style="margin-bottom:20px;"
      v-for="(shop, i) in shops"
      :key="i"
    >
      <ul class="left">
        <li>
          <div class="shop1">
            <input
              class="input"
              type="checkbox"
              name="checkbox"
              v-model="shop.selected"
            />
          </div>
        </li>
        <li>
          <router-link :to="'shopdetail/' + shop.id">
            <div class="shop2">
              <img :src="shop.pic" style="margin-right:10px;" />
              <span class="shopDesc">{{ shop.desc }}</span>
            </div>
          </router-link>
        </li>
        <li>
          <div class="shop3">
            <p>颜色：{{ shop.color }}</p>
            <p>尺码：{{ shop.size }}</p>
          </div>
        </li>
      </ul>
      <ul class="right">
        <li>
          <div class="shop7">
            <ul class="ul">
              <li>
                <a-button
                  type="danger"
                  @click="deleteById(shop._id || shop.id)"
                >
                  删除
                </a-button>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div class="shop6">
            <p>
              金额：
              <span class="allPrice"> ￥{{ shop.totalPrice }} </span>
            </p>
          </div>
        </li>
        <li>
          <div class="shop5">
            <span class="dis" @click="shop.count <= 1 ? 1 : shop.num--">-</span>
            <input
              type="text"
              name="num"
              style="text-align: center;"
              v-model="shop.count"
            />
            <span
              class="add"
              @click="shop.count >= shop.num ? shop.num : shop.count++"
              >+</span
            >
          </div>
        </li>
        <li>
          <div class="shop4">
            <p>￥{{ shop.price }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ShopComponent',
  props: {
    shops: {
      type: Array,
      required: true,
      dafault() {
        return []
      },
    },
    path: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    deleteById(id) {
      // shopcar deleteById
      // collecte deleteCollectById
      // buy deleteBoughtById
      this.$axios
        .get(`/api/${this.path}/${id}`)
        .then(({ data }) => {
          console.log(data)
          if (data === 1) {
            alert('删除成功')
            this.queryShop(this.path)
          } else {
            alert('删除失败')
          }
        })
        .catch((error) => {
          alert('发送数据失败')
          console.log(error)
        })
    },
    queryShop(path) {
      switch (path) {
        case 'deleteById':
          this.queryShopCar()
          break
        case 'deleteCollectById':
          this.queryCollect(1)
          break
        case 'deleteBoughtById':
          this.queryCollect(0)
          break
        default:
          break
      }
    },
    queryShopCar() {
      this.$axios
        .get(`/api/queryPage/0/${this.user.name}`)
        .then((response) => {
          this.shops = response.data
          let { shops } = this
          for (var i = 0, len = shops.length; i < len; i++) {
            shops[i].totalPrice = shops[i].num * shops[i].price
            shops[i].count = shops[i].num
            shops[i].selected = false
          }
        })
        .catch((error) => {
          alert('获取数据失败')
          console.log(error)
        })
    },
    queryCollect(type) {
      let path = type ? 'queryAllCollect' : 'queryAllBuy'
      const name = JSON.parse(localStorage.getItem('userInfo')).name || ''
      this.$axios
        .get(`/api/${path}?username=${name}`)
        .then((response) => {
          console.log(response)
          this.shops = response.data
          let { shops } = this
          for (var i = 0, len = shops.length; i < len; i++) {
            shops[i].totalPrice = shops[i].num * shops[i].price
            shops[i].count = 1
            shops[i].selected = false
          }
        })
        .catch((error) => {
          alert('获取数据失败！')
          console.log(error)
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.shopcar-bot4 {
  width: 960px;
  height: 100px;
  padding: 15px;
  background-color: #f3f3f3;
  border: 1px solid #6ac1d4;
  clear: both;
}
.shopcar-bot4 .shop2 {
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

.shopcar-bot4 ul li {
  float: left;
  line-height: 30px;
}

.shopcar-bot4 .shop2 img {
  width: 80px;
  height: 80px;
  float: left;
}

.shopcar-bot4 .shop2 span {
  display: inline-block;
  width: 186px;
  height: 36px;
}

.shopcar-bot4 .shop2 span a {
  color: #000;
  font-size: 14px;
}

.shopcar-bot4 .shop2 span a:hover {
  color: #6ac1d4;
  text-decoration: underline;
}

span {
  color: #f00;
}

.shopcar-bot4 .shop3 p {
  font-size: 14px;
  color: #9c9c9c;
}

.shopcar-bot4 .shop4 p {
  font-size: 14px;
}

.shopcar-bot4 .shop4 .unde {
  color: #9c9c9c;
  text-decoration: line-through;
}

.shopcar-bot4 .shop5 a {
  background-color: #f3f3f3;
}

.shopcar-bot4 .shop5 input {
  width: 25px;
}
.shop5 .dis,
.shop5 .add {
  user-select: none;
  cursor: pointer;
}

a {
  color: #000;
}

a:hover {
  color: #6ac1d4;
  text-decoration: underline;
}

.shop7 {
  font-size: 14px;
}

.shopcar-bot4 .left li {
  float: left;
  margin-right: 10px;
}

.shopcar-bot4 .right li {
  float: right;
  margin-right: 30px;
}

.shopcar-bot4 .right li:nth-child(1) {
  margin-right: 0px;
}

.shopcar-bot4 .shop7 .hid {
  display: none;
}

.shopcar-bot4 .shop7 .ul li {
  margin-right: 0px;
}

.shopcar-bot4 .shop7 .ul li a {
  display: inline-block;
  width: 70px;
  margin-right: 0px;
  text-align: left;
}

.shopcar-bot4 .shop7:hover .hid {
  display: block;
}

.left li {
  float: left;
  margin-right: 20px;
}

.right li {
  float: right;
  margin-right: 20px;
}

.right li a {
  display: inline-block;
  text-align: center;
  background-color: #9c9c9c;
  width: 100px;
  height: 50px;
}

.ul .xian {
  font-size: 12px;
}

.ul li .cur:hover {
  cursor: not-allowed;
}

.ul li:nth-child(2n-1) a {
  color: #000;
  font-weight: 600;
  text-decoration: none;
}

.right .bill {
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
</style>
