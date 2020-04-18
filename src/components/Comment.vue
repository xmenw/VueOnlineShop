<template>
  <div id="comment">
    <form ref="form"
          method="POST"
          class="form"
          v-if="userBought">
      <input type="text"
             name="id"
             id="text"
             hidden
             v-model="shopId">
      <textarea name="comment"
                class="comInput"
                maxlength="100"
                v-model="comment"
                placeholder="在这里输入您的评价（不能超过100字" /></textarea>
      <button class="btn"
              @click.prevent="commit">发送</button>
    </form>
    <ul class="commentList">
      <li class="commentText"
          v-for="comment in comments"
          :key="comment.text">
        <div class="commentLeft">
          <img src="/image/tx.jpg"
               alt="用户头像"><br />
          <span class="username">aaa</span>
        </div>
        <div class="commentRight">
          <div class="comText">{{ comment.comment }} </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: "Comment",
  data () {
    return {
      comments: [],
      shopId: 0, // 商品id
      comment: '', // 评论
      fontNum: 0, //字数
      userBought: false
    }
  },
  created () {
    let { id } = this.$route.params;
    this.shopId = id;
    this.queryById(id);
    this.queryIsUserBought(id);
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    async commit () {
      this.comment = this.comment.trim().replace(/</gi, "&lt;");
      this.comment = this.comment.trim().replace(/>/gi, "&gt;");
      if (!this.comment) {
        alert("提交不能为空");
        return;
      }
      try {
        await this.insertComment();
        await this.queryById(this.shopId);
      } catch (error) {
        console.log(error)
      }
    },
    queryById (id) {
      this.$axios.get(`/api/queryComment/${id}`)
        .then((response) => {
          this.comments = response.data;
          this.comment = "";
          this.fontNum = 0;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    insertComment () {
      let param = new URLSearchParams();
      param.append("id", this.shopId);
      param.append("comment", this.comment);
      this.$axios.post(`/api/insertComment`, param)
        .then((response) => {
          if (response.data === 1) {
            this.comment = "";
            this.fontNum = 0;
          } else {
            alert('提交失败');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    queryIsUserBought (id) {
      this.$axios.get(`/api/queryHasBuyId?id=${id}&username=${this.user.name}`)
        .then(({ data }) => {
          this.userBought = data ? true : false
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>
<style lang="scss" scoped>
#comment {
  .form {
    width: 80%;
    min-width: 900px;
    margin: 30px auto 0;
    text-align: right;
    padding-bottom: 10px;
    border-bottom: 1px solid #000;
    textarea {
      width: 100%;
      height: 80px;
      padding: 5px;
      resize: none;
      &:focus {
        box-shadow: 0 0 5px #42a5f5;
      }
    }
    .btn {
      width: 80px;
      height: 30px;
      margin-top: 10px;
      line-height: 30px;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: #43a047;
      color: #fff;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 5px #43a047;
      }
    }
  }
  .commentList {
    width: 80%;
    min-width: 900px;
    margin: 0 auto;
    .commentText {
      display: flex;
      justify-content: center;
      margin: 10px;
      padding: 5px;
      border: 1px solid #000;
      .commentLeft {
        width: 10%;
        height: 100%;
        text-align: center;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .commentRight {
        width: 90%;
        height: 50px;
        .comText {
        }
      }
    }
  }
}
</style>