<template>
  <div id="regist">
    <div class="container">
      <div class="center">
        <img src="/image/x1.png" id="img" ref="img" />
        <form action="/api/insertUser" method="post" class="form" ref="form">
          <input
            type="text"
            autofocus="autofocus"
            name="username"
            autocomplete="off"
            placeholder="请输入用户名"
            class="username input"
            v-model="username"
          /><br />
          <input
            type="password"
            name="password"
            placeholder="请输入密码"
            class="password input"
            v-model="password"
          /><br />
          <input
            type="submit"
            name="regist"
            value="注册"
            class="btn"
            @click.prevent="submit"
          />
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Regist',
  data() {
    return {
      username: '',
      password: '',
      isRegist: false,
    }
  },
  methods: {
    submit() {
      let { username, password, regist } = this
      if (username && password) {
        if (username.length <= 10) {
          alert('用户名不能小于10位')
          return
        }
        if (password.length <= 16) {
          alert('密码不能小于16位')
          return
        }
        if (!/[0-9a-z]+/gi.test(password)) {
          alert('密码应包含字符和数字')
          return
        }
        regist()
      } else {
        alert('用户名或密码不能为空')
        return
      }
    },
    regist() {
      let param = new URLSearchParams()
      param.append('username', this.username)
      param.append('password', this.password)
      this.$axios
        .post(`api/insertUser`, param)
        .then((response) => {
          this.isRegist = response.data > 0 ? true : false
          if (this.isRegist) {
            this.$router.replace('/login')
          } else {
            alert('您输入的用户名或密码不合法。')
          }
        })
        .catch((error) => {
          alert('获取数据失败')
          console.log(error)
        })
    },
  },
}
</script>
<style lang="scss" scoped>
#regist {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

  .center {
    text-align: center;

    img {
      height: 200px;
    }

    .form {
      .input {
        width: 300px;
        height: 30px;
        margin: 5px 0;
        text-indent: 0.8em;
      }
      .input:focus {
        box-shadow: 0 0 5px #2196f3;
      }
      .btn {
        width: 80px;
        height: 30px;
        margin-top: 10px;
        line-height: 30px;
        border: none;
        outline: none;
        font-size: 100%;
        border-radius: 5px;
        background-color: #43a047;
        color: #fff;
        &:hover {
          box-shadow: 0 0 5px #8e24aa;
        }
      }
    }
  }
}
</style>
