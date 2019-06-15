<template>
    <div id="userInfo">
        <form ref="form">
            <div>
                <span class="name">头像：</span>
                <input type="file" accept="image/png,image/gif,image/jpeg" name="pic">
                <input type="text" name="image" hidden>
            </div>
            <div>
                <span class="name">昵称：</span>
                <input type="text" name="name" autocomplete="off" v-model="name">
            </div>
            <div>
                <span class="name">真实姓名：</span>
                <input type="text" name="realname" autocomplete="off" v-model="realname">
            </div>
            <div>
                <span class="name">性别：</span>
                <input type="radio" name="sex" value="0" v-model="sex">男
                <input type="radio" name="sex" value="1" v-model="sex">女
            </div>
            <div>
                <span class="name">生日：</span>
                <input type="date" name="birthday" autocomplete="off" v-model="birthday">
            </div>
            <div>
                <span class="name">居住地：</span>
                <input type="text" name="local" autocomplete="off" v-model="local">
            </div>
            <div>
                <span class="name">家乡：</span>
                <input type="text" name="home" autocomplete="off" v-model="home">
            </div>
            <div class="center">
                <button class="button" @click.prevent="submit">提交</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name: "UserInfo",
    data() {
        return {
            name: '',
            pic: '',
            realname: '',
            sex: '',
            birthday: '',
            local: '',
            home: ''
        }
    },
    methods: {
        submit() {
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            let param = new FormData(this.$refs.form);
            this.$axios.post(`api/insertUserInfo`, param, config)
                .then((response) => {
                    if(response.data > 0){
                    	alert("添加成功！");
                    	this.clearForm();
                    }else {
                    	alert("添加失败！");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    throw new Error("获取数据失败!");
                });
        },
        clearForm() {
            let { name, pic, realname, sex, birthday, local, home } = this;
            name = '',
            pic = '',
            realname = '',
            sex = '',
            birthday = '',
            local = '',
            home = '';
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
            text-indent: .8em;
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