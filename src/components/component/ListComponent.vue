<template>
  <div id="listComponent"
       v-if="len > 0">
    <div class="nz">
      <div class="nav-center">
        <div class="center-top">
          <ul @click="select"
              ref="names">
            <li class="active"><a @click.prevent=""
                 class="pr">综合排序</a></li>
            <li><a class="pr"
                 @click="bySales">销量排序</a></li>
            <li><a class="pr"
                 @click="byPrice(1)">价格升序</a></li>
            <li><a class="pr"
                 @click="byPrice(2)">价格降序</a></li>
          </ul>
          <span class="num">共:<em>{{ len }}</em>件商品</span>
        </div>
        <div class="show"
             ref="shopList">
          <ul>
            <li v-for="shop in shopsArr"
                :key="shop.id">
              <div class="item">
                <router-link :to="'shopdetail/' + shop.id"
                             target="_blank">
                  <div class="item-top">
                    <img class="img"
                         alt="商品图片"
                         :src="baseUrl + shop.pic" />
                  </div>
                </router-link>
                <div class="item-bot">
                  <div class="bot1">
                    <span class="span1">￥{{ shop.price }}</span>
                  </div>
                  <div class="bot2">
                    <span>
                      <em>包邮</em>
                      {{ shop.desc }}
                      <span class="id">{{ shop.id }}</span>
                    </span>
                  </div>
                  <div class="bot3">
                    <span>QQ6358455</span>
                    <span class="w">福建泉州</span>
                  </div>
                  <div class="bot4">
                    <span class="s1"></span>
                    <span class="span2">{{ shop.sales }}人付款</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'listComponent',
  data () {
    return {
      baseUrl: process.env.BASE_URL,
      shopsArr: [],
      showNum: 5,
      begin: 1,
    }
  },
  props: {
    shops: {
      type: Array,
    },
  },
  created () {
    this.shopsArr = JSON.parse(JSON.stringify(this.shops)).slice(0, 5)
    console.log('created', this.shopsArr)
  },
  mounted () {
    this.$nextTick(() => {
      let shopDomArr = document.querySelector('.searchShop .show ul')
      console.log(23423, shopDomArr)
      if (!shopDomArr) {
        return
      }
      let lastShop = shopDomArr.lastChild.childNodes[0]
      let interse = new IntersectionObserver((entries) => {
        entries.forEach(async (item) => {
          if (item.isIntersecting) {
            if (this.begin >= this.len / this.showNum) {
              return
            }
            console.log(23423, this.shopsArr)
            this.shopsArr = this.shopsArr.concat(
              this.shops.slice(this.showNum * this.begin, this.showNum * (this.begin + 1))
            )
            this.shopsArr.forEach(function (shop) {
              shop.select = false
            })
            this.begin = this.begin + 1
          }
        })
      })
      interse.observe(lastShop)
    })
  },
  computed: {
    ...mapState(['user', 'arrSearchShops']),
    len () {
      return this.shops && this.shops.length
    },
  },
  watch: {
    len (val, oVal) {
      if (oVal) {
        this.$refs.shopList && this.$refs.shopList.scrollIntoView()
      }
    },
    shops: {
      handler (val) {
        this.shopsArr = JSON.parse(JSON.stringify(val)).slice(0, 5)
      },
      deep: true
    }
  },
  methods: {
    select (e) {
      Array.from(this.$refs.names.children).forEach((li) => {
        li.classList.remove('active')
      })
      if (e.target.tagName === 'LI') {
        e.target.classList.add('active')
      } else if (e.target.parentNode.tagName === 'LI') {
        e.target.parentNode.classList.add('active')
      }
    },
    bySales () {
      Object.assign(
        this.shopsArr,
        this.shopsArr.sort((a, b) => {
          return b.sales - a.sales
        })
      )
    },
    byPrice (tw) {
      // 1：升序， 2：降序
      switch (tw) {
        case 1:
          Object.assign(
            this.shopsArr,
            this.shopsArr.sort((a, b) => {
              return a.price - b.price
            })
          )
          break
        case 2:
          Object.assign(
            this.shopsArr,
            this.shopsArr.sort((a, b) => {
              return b.price - a.price
            })
          )
          break
        default:
          break
      }
    },
  },
}
</script>
<style lang="scss" scoped>
#listComponent {
  margin-top: 20px;
  width: 100%;
  &::after {
    content: "";
    display: block;
    clear: both;
    overflow: hidden;
  }
  .show {
    &::after {
      content: "";
      display: block;
      width: 100%;
      margin-top: 30px;
      border-top: 1px solid #0003;
    }
  }

  .show .item .item-bot .bot2 .id {
    display: none;
  }

  .show ul {
    &::after {
      content: "";
      display: block;
      clear: both;
      overflow: hidden;
    }
  }

  .nz-top-right {
    float: right;
    display: inline-block;
    position: relative;
    height: 30px;
    line-height: 30px;

    .input input {
      display: inline-block;
      width: 400px;
      height: 30px;
      text-indent: 0.3em;
      outline: none;
      vertical-align: 1px;
      border: 1px solid #6ac1d4;
    }

    .input button {
      width: 60px;
      height: 34px;
      border: none;
      outline: none;
      background-color: #6ac1d4;
    }
  }

  .navg {
    width: 920px;
    height: 37px;
    margin: 0 auto;
    padding: 5px 0;
    .nav {
      height: 37px;
      .navlist {
        float: left;
        line-height: 37px;
        margin-right: 30px;
        a {
          color: #000;
          font-size: 15px;
          font-weight: bold;
          &:hover {
            color: #64a1d6;
          }
        }
      }
    }
  }

  .result {
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

  .bar {
    width: 100%;
    margin: 0 auto;
    border: 2px solid #64a1d6;
  }

  .nav-center {
    width: 1186px;
    margin: 0 auto;

    .center-top {
      width: 100%;
      height: 41px;
      clear: both;
      background-color: #f6f6f6;
      border: 1px solid #f6f6f6;

      ul {
        float: left;
        margin-bottom: 0;
        li {
          float: left;
          width: 80px;
          height: 40px;
          text-align: center;
          line-height: 40px;

          &:hover {
            background-color: #fff;
          }
          &.active {
            background-color: #ffffff;
          }

          a {
            color: #000;
            font-size: 14px;
            &:hover {
              color: #64a1d6;
            }
          }

          a.pr {
            cursor: pointer;
          }
        }
      }
      &::after {
        content: "";
        display: block;
        clear: both;
        overflow: hidden;
      }
      .jiage {
        ul {
          height: 40px;
          width: 185px;
          padding: 0 5px;
          float: left;
          &::after {
            content: "";
            display: block;
            clear: both;
            overflow: hidden;
          }
          &:hover {
            background-color: #fff;
          }

          &:hover .but button {
            display: inline-block;
            cursor: pointer;
          }

          li {
            width: 50px;
            height: 40px;
            line-height: 40px;
            float: left;

            input {
              width: 50px;
              height: 20px;
              font-size: 12px;
              color: #6c6c6c;
            }
          }

          .but {
            button {
              display: none;
              width: 50px;
              height: 30px;
              margin-left: 10px;
              border-radius: 10px;
              background-color: #64a1d6;
              border: none;
              outline: none;
            }
          }

          .line {
            width: 5px;
            margin: 0 10px;
          }
        }
      }

      .num {
        display: inline-block;
        float: right;
        font-size: 14px;
        margin-right: 30px;
        line-height: 40px;
        em {
          color: #f00;
          font-style: normal;
        }
      }
    }

    .center-bot {
      width: 100%;
      height: 39px;
      border: 1px solid #f3f3f3;

      .bot {
        width: 800px;
        height: 100%;
        margin: 0 auto;

        ul {
          width: 550px;
          height: 39px;

          li {
            width: 50px;
            height: 39px;
            margin-left: 15px;
            font-size: 12px;
            float: left;
            line-height: 39px;
          }
          &::after {
            content: "";
            display: block;
            clear: both;
            overflow: hidden;
          }
          &:hover {
            position: absolute;
            border: 1px solid #64a1d6;
            height: 80px;
            background-color: #fff;

            .hid {
              display: inline-block;
            }
          }

          .hid {
            display: none;

            ul {
              li {
                width: 70px;
                height: 39px;
                margin-left: 15px;
                font-size: 12px;
                float: left;
                line-height: 39px;
              }
              &::after {
                content: "";
                display: block;
                clear: both;
                overflow: hidden;
              }
            }
          }

          .yf {
            width: 90px;
            margin-left: -10px;
          }

          .tuih {
            width: 100px;
          }

          .more {
            margin-left: 30px;
          }
        }
      }
    }
  }

  .show {
    width: 100%;
    border: 1px solid #f6f6f6;
    .item {
      width: 210px;
      height: 310px;
      border: 1px solid #fff;

      .item-top {
        width: 210px;
        height: 180px;

        &:hover {
          .h {
            display: inline-block;
            background-color: #6ad451;
          }
        }

        img {
          width: 208px;
          height: 180px;
        }
      }

      .item-bot {
        width: 210px;
        height: 130px;
        border: 1px solid #f3f3f3;

        .bot1 {
          height: 22px;
          line-height: 22px;
          text-align: center;
          font-size: 14px;

          .span1 {
            display: inline-block;
            text-align: left;
            color: #f40;
            font-size: 16px;
          }

          .span2 {
            display: inline-block;
            text-align: right;
            color: #c3c3c3;
            font-size: 12px;
          }
        }

        .bot2 {
          width: 164px;
          padding-left: 8px;
          padding-right: 8px;
          height: 40px;
          margin-top: 5px;
          font-size: 12px;
          span {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          &:hover {
            a {
              color: #f40;
              text-decoration: underline;
            }
          }

          a {
            em {
              display: inline-block;
              width: 26px;
              height: 16px;
              text-align: center;
              color: #fff;
              font-weight: bold;
              font-style: normal;
              background-color: #f40;
            }
          }
        }

        .bot3 {
          height: 22px;
          padding: 0 5px;
          line-height: 22px;
          font-size: 14px;

          span {
            a {
              font-size: 13px;
              color: #c3c3c3;
            }
          }

          .w {
            margin-left: 60px;
          }
        }

        .bot4 {
          margin-top: 10px;
          height: 20px;
          font-size: 14px;

          .s1 {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-left: 10px;
            background: url("/image/pic5.png");
            background-position: -269px -213px;
            cursor: pointer;
          }

          .span2 {
            float: right;
            display: inline-block;
            margin-right: 10px;
            cursor: pointer;
            &::after {
              content: "";
              display: block;
              clear: both;
              overflow: hidden;
            }
            &.select {
              background: url("/image/select.png");
              background-size: 100% 100%;
            }

            &.selected {
              background: url("/image/selected.png");
              background-size: 100% 100%;
            }
          }
        }
      }
    }

    ul {
      li {
        .item {
          float: left;
          margin-left: 22px;
          margin-top: 20px;
          transition: all 0.3s;

          &:hover {
            border-color: #64a1d6;
            box-shadow: 0 5px 10px #c3c3c3;
            transform: translateY(-5px);
          }
        }
      }
    }
  }

  .h {
    position: relative;
    text-align: center;
    top: -33px;
    display: none;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: rgba(10, 244, 174, 0.8);

    span {
      display: inline-block;
      width: 80px;
      color: #2b35d3;

      a {
        &:hover {
          color: #f56;
        }
      }
    }
  }
}
</style>
