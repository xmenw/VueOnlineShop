<template>
  <div class="vuecarousel"
       v-cloak>
    <div class="contain"
         @mouseenter="stop"
         @mouseleave="start"
         :style="{width: imgWidth + 'px', height: imgHeight + 'px'}">
      <ul class="ul">
        <transition-group name="slide-fade">
          <li class="items"
              v-for="(img, index) in imgs"
              :key="img.src"
              v-show="index == showIndex">
            <img :src="img.src"
                 alt="轮播图">
          </li>
        </transition-group>
      </ul>
      <ul class="dots"
          :style="{width: imgs.length * (dotWidth + 10) + 'px',  height: dotWidth + 'px'}">
        <li v-for="(img, index) in imgs"
            :key="index"
            :class="index == showIndex ? 'active' : ''"
            @click="showIndex = index"
            :style="{width: dotWidth + 'px', height: dotWidth + 'px'}">
        </li>
      </ul>
      <div class="control"
           v-show="show">
        <span class="left"
              @click="previous"></span>
        <span class="right"
              @click="next"></span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'WebCarousel',
  created () {
    this.timer = setInterval(() => {
      this.next();
    }, this.delay)
  },
  beforeDestroy () {
    clearInterval(this.timer);
  },
  data () {
    return {
      showIndex: 0, //显示第几个图片
      timer: null,  // 定时器
      show: false,   // 前后按钮显示
      imgs: [
        { src: '/image/show1.jpg' },
        { src: '/image/show2.jpg' },
        { src: '/image/show3.jpg' },
        { src: '/image/cloth4.jpg' },
        { src: '/image/cloth6.jpg' }
      ],
      delay: 2000,
      imgWidth: 690,
      imgHeight: 260,
      dotWidth: 10
    }
  },
  methods: {
    previous () {
      if (this.showIndex <= 0) {
        this.showIndex = this.imgs.length - 1;
      } else {
        this.showIndex--;
      }
    },
    next () {
      if (this.showIndex >= this.imgs.length - 1) {
        this.showIndex = 0;
      } else {
        this.showIndex++;
      }
    },
    start () {
      this.show = false;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.next();
      }, this.delay)
    },
    stop () {
      this.show = true;
      clearInterval(this.timer);
    }
  }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.contain {
  position: relative;
  transition: all 0.8s;
  color: #fff;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  height: 100%;
  .ul {
    height: 100%;
    .items {
      position: absolute;
      top: 0px;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .slide-fade-enter-active {
    transition: all 0.5s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(30px);
    opacity: 0;
  }
  .dots {
    position: absolute;
    left: 50%;
    bottom: 30px;
    height: 10px;
    transform: translateX(-50%);
    li {
      float: left;
      margin: 0px 5px;
      border-radius: 50%;
      transition: all 0.3s;
      background-color: antiquewhite;
      list-style: none;
    }
    .active {
      background-color: blue;
    }
  }
  .control {
    span {
      position: absolute;
      top: 50%;
      width: 36px;
      height: 36px;
      padding: 5px;
      cursor: pointer;
      transform: translateY(-50%);
      background-size: 100% 100%;
    }
    .left {
      left: 10px;
      background: url("/image/left.png") no-repeat center;
    }
    .right {
      right: 10px;
      background: url("/image/right.png") no-repeat center;
    }
  }
}
</style>
