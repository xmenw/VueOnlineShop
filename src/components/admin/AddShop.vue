<template>
  <div id="addShop">
    <form ref="form"
          id="form">
      <div>
        <span class="name">商品照片：</span>
        <input type="file"
               accept="image/png,image/gif,image/jpeg"
               name="image">
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
               v-model="desc">
      </div>
      <div>
        <span class="name">商品颜色：</span>
        <input type="text"
               name="color"
               v-model="color">
      </div>
      <div>
        <span class="name">商品尺寸：</span>
        <input type="text"
               name="size"
               autocomplete="off"
               v-model="size">
      </div>
      <div>
        <span class="name">商品价格：</span>
        <input type="text"
               name="price"
               autocomplete="off"
               v-model="price">
      </div>
      <div>
        <span class="name">商品类型：</span>
        <select name="type"
                v-model="type">
          <option value="短袖"
                  selected="selected">短袖</option>
          <option value="外套">外套</option>
          <option value="毛衣">毛衣</option>
          <option value="羽绒服">羽绒服</option>
          <option value="裤子">裤子</option>
        </select>
      </div>
      <div>
        <span class="name">商品数量：</span>
        <input type="text"
               name="num"
               autocomplete="off"
               v-model="num">
      </div>
      <div class="center">
        <button class="button"
                @click.prevent="submit">提交</button>
      </div>
    </form>
  </div>
</template>
<script>
import { message } from 'ant-design-vue';

export default {
  name: "AddShop",
  data () {
    return {
      pic: '',
      desc: '',
      color: '',
      size: '',
      price: '',
      num: '',
      type: ''
    }
  },
  methods: {
    submit () {
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };
      let param = new FormData(this.$refs.form || document.getElementById('form'));
      this.$axios.post(`api/addShop`, param, config)
        .then((response) => {
          if (response.data > 0) {
            message.success("添加成功！");
            this.clearForm();
          } else {
            message.error("添加失败！");
          }
        })
        .catch((error) => {
          console.log(error);
          throw new Error("获取数据失败!");
        });
    },
    clearForm () {
      this.pic = '',
        this.desc = '',
        this.color = '',
        this.size = '',
        this.price = '',
        this.num = '';
    }
  }
}
</script>
<style lang="scss" scoped>
#addShop {
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