<template>
    <div id="login">
        <div class="container">
            <div class="center">
                <img src="/image/x1.png" id="img" ref="img" />
                <form action="/api/selectUser" method="post" class="form">
                    <input type="text" autocomplete="off" placeholder="请输入用户名" name="username" class="input" 
                      v-model="username"
                      @blur="changeImg1()" 
                      @focus="changeImg2()" 
                      @change="userChange()"><br>
                    <input type="password" placeholder="请输入密码" name="password" class="input" 
                      v-model="password"
                      @blur="changeImg1()" 
                      @focus="changeImg3()"><br>
                    <div class="button">
	                    <input type="submit" name="login" value="登录" class="btn" 
                        @click.prevent="submit()">
                      <router-link tag="a" class="btn" :to="{name: 'Regist'}">注册</router-link>
                		</div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Login",
    data() {
        return {
            img: null,
            isLogin: false,
            username: '',
            password: '',
            to: '',
            baseUrl: process.env.BASE_URL
        }
    },
    mounted() {
        this.img = this.$refs.img;
    },
    methods: {
        changeImg1() {
            this.img.src = this.baseUrl + "/image/x1.png";
        },
        changeImg2() {
            this.img.src = this.baseUrl + "/image/x2.png";
        },
        changeImg3() {
            this.img.src = this.baseUrl + "/image/x3.png";
        },
        submit() {
          let param = new URLSearchParams();
          param.append("username", this.username);
          param.append("password", this.password);
          this.$axios.post(`api/selectUser`,param)
            .then((response) => {
                this.isLogin = response.data > 0 ? true : false;
                if(this.isLogin){
                  location.href="/";
                }else {
                  alert("账号密码错误。");
                  
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        userChange() {
            sessionStorage.setItem("user", this.username);
        }
    }
}
</script>
<style lang="scss" scoped>
#login {
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
        text-indent: .8em;
      }
      .input:focus {
      	box-shadow: 0 0 5px #2196f3;
      }
      .button {
      	display: flex;
      	justify-content: space-around;
      	margin-top: 10px;
		    .btn {
		      width: 80px;
		      height: 30px;
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
		    a.btn {
		      display: inline-block;
		    	line-height: 30px;
		    	text-align: center;
		    	background-color: #2196f3;
		    }
      }
    }
  }
}
</style>