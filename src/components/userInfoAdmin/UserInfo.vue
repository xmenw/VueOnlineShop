<template>
  <div id="userInfo">
    <form ref="form">
      <div>
        <span class="name">昵称：</span>
        <input type="text"
               disabled="disabled"
               name="name"
               autocomplete="off"
               v-model="name">
      </div>
      <div>
        <span class="name">真实姓名：</span>
        <input type="text"
               name="realname"
               autocomplete="off"
               v-model="realname">
      </div>
      <div>
        <span class="name">性别：</span>
        <input type="radio"
               name="sex"
               value="0"
               v-model="sex">男
        <input type="radio"
               name="sex"
               value="1"
               v-model="sex">女
      </div>
      <div>
        <span class="name">生日：</span>
        <input type="date"
               name="birthday"
               autocomplete="off"
               v-model="birthday">
      </div>
      <div>
        <span class="name">居住地：</span>
        <input type="text"
               name="local"
               autocomplete="off"
               v-model="local">
      </div>
      <div>
        <span class="name">家乡：</span>
        <input type="text"
               name="home"
               autocomplete="off"
               v-model="home">
      </div>
      <div class="center">
        <button class="button"
                @click.prevent="submit">{{ hasData ? '修改' : '提交'}}</button>
      </div>
    </form>
  </div>
</template>
<script>
import { message } from 'ant-design-vue';

export default {
  name: "UserInfo",
  data () {
    return {
      id: 0,
      name: '',
      realname: '',
      sex: '',
      birthday: '',
      local: '',
      home: '',
      hasData: false
    }
  },
  beforeRouteEnter (to, from, next) {
    let name = localStorage.getItem('user');
    if (!name) {
      message.warn('请先登录');
      next('/login')
    } else {
      next((vm) => {
        if (name) {
          vm.name = name
          vm.$axios.get(`api/queryUserInfo/${name}`)
            .then(({ data }) => {
              if (data.birthday) {
                vm.hasData = true
                vm.id = data.id;
                vm.realname = data.realname;
                vm.sex = data.sex;
                vm.birthday = data.birthday;
                vm.local = data.local;
                vm.home = data.home;
              }
            })
            .catch((err) => {
              message.error("获取数据失败！");
              console.log(err)
            })
        }
      })
    }
  },
  methods: {
    submit () {
      let param = new FormData(this.$refs.form);
      param.append('name', this.name);
      if (this.hasData) {
        this.update(param);
      } else {
        this.insert(param);
      }
    },
    clearForm () {
      let { name, realname, sex, birthday, local, home } = this;
      name = '',
        realname = '',
        sex = '',
        birthday = '',
        local = '',
        home = '';
    },
    update (param) {
      this.$axios.post(`api/updateUserInfo`, param)
        .then((response) => {
          if (response.data > 0) {
            message.success("更新成功！");
            this.clearForm();
          } else {
            message.error("更新失败！");
          }
        })
        .catch((error) => {
          message.error("获取数据失败");
          console.log(error);
          throw new Error("获取数据失败!");
        });
    },
    insert (param) {
      console.log(param)
      this.$axios.post(`api/insertUserInfo`, param)
        .then((response) => {
          if (response.data > 0) {
            message.success("添加成功！");
            this.clearForm();
          } else {
            message.error("添加失败！");
          }
        })
        .catch((error) => {
          message.error("获取数据失败");
          console.log(error);
          throw new Error("获取数据失败!");
        });
    }
  }
}
</script>
<style lang="scss" scoped>
#userInfo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

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