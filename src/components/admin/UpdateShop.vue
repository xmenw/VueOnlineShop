<template>
  <div id="updateShop">
    <form ref="form">
      <div>
        <span class="name">原图片：</span>
        <img :src="shop.pic"
             alt="商品图片" />
        <input type="text"
               name="id"
               v-model="shop.id"
               hidden>
      </div>
      <div>
        <span class="name">商品照片：</span>
        <input type="file"
               accept="image/png,image/gif,image/jpeg"
               name="image"
               :value="image">
        <input type="text"
               name="pic"
               hidden>
      </div>
      <div>
        <input type="text"
               name="username"
               autocomplete="off"
               value="aaa"
               hidden>
        <span class="name">商品描述：</span>
        <input type="text"
               name="desc"
               autocomplete="off"
               v-model="shop.desc">
      </div>
      <div>
        <span class="name">商品颜色：</span>
        <input type="text"
               name="color"
               v-model="shop.color">
      </div>
      <div>
        <span class="name">商品尺寸：</span>
        <input type="text"
               name="size"
               autocomplete="off"
               v-model="shop.size">
      </div>
      <div>
        <span class="name">商品价格：</span>
        <input type="text"
               name="price"
               autocomplete="off"
               v-model="shop.price">
      </div>
      <div>
        <span class="name">商品数量：</span>
        <input type="text"
               name="num"
               autocomplete="off"
               v-model="shop.num">
      </div>
      <div class="center">
        <button class="button"
                @click.prevent="submit">提交</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "UpdateShop",
  data () {
    return {
      shop: {}
    }
  },
  created () {
    let { id } = this.$route.params;
    this.queryShop(id);
  },
  methods: {
    submit () {
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };
      let param = new FormData(this.$refs.form);
      this.$axios.post(`api/updateShop`, param, config)
        .then((response) => {
          if (response.data > 0) {
            alert("修改成功！");
          } else {
            alert("修改失败！");
          }
        })
        .catch((error) => {
          console.log(error);
          throw new Error("获取数据失败!");
        });
    },
    queryShop (id) {
      this.$axios.get(`/api/detail/${id}`)
        .then((response) => {
          this.shop = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>
<style lang="scss" scoped>
#updateShop {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

  div {
    margin: 30px 0;

    .name {
      display: inline-block;
      width: 80px;
      text-align: right;
      margin-right: 10px;
    }

    img {
      width: 100px;
      height: 100px;
      vertical-align: middle;
    }

    input[type="text"] {
      width: 300px;
      height: 26px;
      text-indent: 0.8em;
    }

    input:focus {
      box-shadow: 0 0 10px #29b6f6;
    }

    button {
      border: none;
      outline: none;
      border-radius: 10px;
    }

    .button {
      width: 70px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      background-color: #66bb6a;
    }
  }

  .center {
    text-align: center;
  }
}
</style>