<template>
  <div id="infoManage">
    <ul class="items"
        @click="select">
      <router-link v-for="(item, i) in routers"
                   :key="item.path"
                   tag='li'
                   :data-i="i"
                   :to="{name: item.path}"
                   :class="item.selected ? 'active' : ''">
        {{ item.name }}
      </router-link>
    </ul>
    <keep-alive>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "InfoManage",
  data () {
    return {
      routers: [{
        name: "个人信息",
        path: "UserInfo",
        selected: true
      }, {
        name: "购买的商品",
        path: "BoughtShop",
        selected: false
      }, {
        name: "收藏的商品",
        path: "CollectedShop",
        selected: false
      }]
    }
  },
  created () {
    let routePath = this.$route.name;
    this.routers.forEach((route) => {
      route.selected = false;
      if (route.path === routePath) {
        route.selected = true
      }
    })
  },
  methods: {
    select (e) {
      let index = e.target.getAttribute('data-i');
      for (let i = 0; i < this.routers.length; i++) {
        this.routers[i].selected = false;
      }
      this.routers[index].selected = true;
    }
  }
}
</script>
<style lang="scss" scoped>
$height: 30px;
$color: #64a1d6;
#infoManage {
  overflow-x: hidden;
  .items {
    float: left;
    margin-left: 30px;
    li {
      padding: 5px 10px;
      font-size: 14px;
      text-align: center;
      background-color: $color;
      border-bottom: 1px solid brown;
      color: #fff;
      cursor: pointer;
    }
    li.active {
      color: #000;
      background-color: #fff;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.6s;
  }
  .fade-enter {
    transform: translateX(-30px);
    opacity: 1;
  }
  .fade-leave-to {
    transform: translateX(60px);
    opacity: 0;
  }
}
</style>