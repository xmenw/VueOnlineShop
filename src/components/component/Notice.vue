<template>
  <div class="notice">
    <h2 class="notice-header">最新信息公告</h2>
    <a-list itemLayout="horizontal"
            class="notice-content"
            :loading="loading"
            :locale="empty"
            :pagination="pagination"
            :dataSource="data">
      <a-list-item slot="renderItem"
                   @click="clickNotice(item, index)"
                   slot-scope="item, index">
        <div class="notice-title">{{ item.title }}</div>
      </a-list-item>
    </a-list>
    <a-modal v-if="selectNotice"
             :title="selectNotice.title"
             v-model="visible"
             @ok="()=> this.visible = false">
      <p class="notice-con">{{ selectNotice.content }}</p>
      <p class="notice-time">{{ selectNotice.time }}</p>
    </a-modal>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'

export default {
  name: 'Notice',
  async created () {
    let { data } = await this.queryAllNotices()
    console.log(data)
    this.data = data
  },
  data () {
    return {
      data: [],
      loading: false,
      visible: false,
      selectNotice: null,
      empty: {
        emptyText: '暂无公告'
      },
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 5,
      }
    }
  },
  methods: {
    clickNotice (item) {
      this.visible = true
      this.selectNotice = item
    },
    queryAllNotices () {
      this.loading = true
      return new Promise((resolve, reject) => {
        this.$axios.get('/api/queryAllNotice')
          .then((res) => {
            console.log(res)
            resolve(res)
            this.loading = false
          })
          .catch((err) => {
            console.log(err)
            this.loading = false
            reject(err)
            message.error('获取公告失败')
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.notice {
  .notice-content {
    margin-top: 20px;
  }
  .ant-list-item {
    cursor: pointer;
  }
  .notice-header {
    padding-bottom: 5px;
    text-align: center;
    font-size: 20px;
    border-bottom: 1px solid #000;
  }
  .notice-title {
    width: 100%;
    padding: 0 5px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
<style>
.notice-con {
  text-indent: 2em;
}
.notice-time {
  text-align: right;
  color: #c3c3c3;
}
</style>
